import React, { useState, useEffect, useCallback } from 'react';
import './App.css';

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const generateFood = (snake) => {
  let availableCells = [];
  
  for (let x = 0; x < GRID_SIZE; x++)
  {
    for (let y = 0; y < GRID_SIZE; y++)
    {
      availableCells.push({ x, y });
    }
  }
  
  let snakeCells = new Set(snake.map(segment => `${segment.x},${segment.y}`));
  let freeCells = availableCells.filter(cell => !snakeCells.has(`${cell.x},${cell.y}`));
  
  if (freeCells.length > 0)
  {
    return freeCells[Math.floor(Math.random() * freeCells.length)];
  }
  
  return null;
};

const App = () => {
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 5, y: 5 });
  const [direction, setDirection] = useState(DIRECTIONS.RIGHT);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initGame = useCallback(() => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection(DIRECTIONS.RIGHT);
    setFood(generateFood([{ x: 10, y: 10 }]));
    setGameOver(false);
    setScore(0);
    setGameStarted(true);
    setIsPaused(false);
  }, []);

  const checkCollision = useCallback((head) => {
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE)
    {
      return true;
    }
    
    for (let i = 1; i < snake.length; i++)
    {
      if (snake[i].x === head.x && snake[i].y === head.y)
      {
        return true;
      }
    }
    
    return false;
  }, [snake]);

  const moveSnake = useCallback(() => {
    if (gameOver || isPaused || !gameStarted) return;

    const newHead = {
      x: snake[0].x + direction.x,
      y: snake[0].y + direction.y,
    };

    if (checkCollision(newHead))
    {
      setGameOver(true);
      return;
    }

    const ateFood = newHead.x === food.x && newHead.y === food.y;

    let newSnake = [newHead, ...snake];
    if (!ateFood)
    {
      newSnake.pop();
    }

    setSnake(newSnake);

    if (ateFood)
    {
      setScore(prev => prev + 10);
      const newFood = generateFood(newSnake);
      if (newFood)
      {
        setFood(newFood);
      }
      else
      {
        setGameOver(true);
      }
    }
  }, [snake, direction, food, gameOver, isPaused, gameStarted, checkCollision]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted && (e.key === 'w' || e.key === 'a' || e.key === 's' || e.key === 'd'))
      {
        initGame();
        return;
      }

      if (e.key === ' ')
      {
        setIsPaused(prev => !prev);
        return;
      }

      if (gameOver) return;

      switch (e.key)
      {
        case 'w':
          if (direction !== DIRECTIONS.DOWN) setDirection(DIRECTIONS.UP);
          break;
        case 's':
          if (direction !== DIRECTIONS.UP) setDirection(DIRECTIONS.DOWN);
          break;
        case 'a':
          if (direction !== DIRECTIONS.RIGHT) setDirection(DIRECTIONS.LEFT);
          break;
        case 'd':
          if (direction !== DIRECTIONS.LEFT) setDirection(DIRECTIONS.RIGHT);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, gameOver, gameStarted, initGame]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    let gameInterval = setInterval(moveSnake, INITIAL_SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake, gameOver, gameStarted]);

  return (
    <div className="game-container">
      <h1>Змейка</h1>
      <div className="game-info">
        <div>Счет: {score}</div>
        {gameOver && <div className="game-over">Игра окончена!</div>}
        {isPaused && <div className="paused">Пауза</div>}
      </div>
      
      <div 
        className="game-board"
        style={{
          width: GRID_SIZE * CELL_SIZE,
          height: GRID_SIZE * CELL_SIZE,
        }}
      >
        {!gameStarted ? (
          <div className="start-screen">
            <p>Нажмите любую клавишу направления (WASD или стрелки) чтобы начать</p>
          </div>
        ) : (
          <>
            <div 
              className="food"
              style={{
                left: food.x * CELL_SIZE,
                top: food.y * CELL_SIZE,
                width: CELL_SIZE,
                height: CELL_SIZE,
              }}
            />
            
            {snake.map((segment, index) => (
              <div
                key={index}
                className={`snake-segment ${index === 0 ? 'snake-head' : ''}`}
                style={{
                  left: segment.x * CELL_SIZE,
                  top: segment.y * CELL_SIZE,
                  width: CELL_SIZE,
                  height: CELL_SIZE,
                }}
              />
            ))}
          </>
        )}
      </div>
      
      <div className="controls">
        <button onClick={initGame}>Новая игра</button>
        <button onClick={() => setIsPaused(prev => !prev)}>
          {isPaused ? 'Продолжить' : 'Пауза'}
        </button>
      </div>
      
      <div className="instructions">
        <p>Управление: WASD или стрелки</p>
        <p>Пробел: пауза</p>
      </div>
    </div>
  );
};

export default App;