# Задание 4, Вариант 38

## 4.1. Создать класс game с полями:
- title — название игры (строка)
- platforms — массив платформ, на которых доступна игра (строки, например: "PC", "Xbox", "PS5")
- releaseYear — год выпуска (число)

#### Реализовать методы:
- addPlatform(platform) — добавить платформу
- removePlatform(platform) — удалить платформу
- геттер platformCount — количество платформ

## 4.2. Дан массив игр:
- Реализовать функцию, который возвращает игры, сгруппированные по году выпуска
- Реализовать функцию, возвращающий список всех уникальных платформ
- Реализовать функцию возвращающий список игр, доступных на заданной платформе
- Реализовать функцию, группирующих игры по количеству платформ
- Реализовать функцию возвращающий список игр, выпущенных после заданного года

## 4.3. Реализовать пользовательский интерфейс:
- Карточки игр: название, год выпуска, список платформ
- Кнопки: "Добавить платформу", “Удалить платформу”, “Добавить игру”, "Удалить игру" Форма создания игры (название, год выпуска) 
- При любых изменениях автоматически обновлять пользовательский интерфейс
- Все операции добавления/удаления выполнять асинхронно через Promise + setTimeout()
- Использовать local storage для сохранения текущего списка студентов при закрытии вкладки.
