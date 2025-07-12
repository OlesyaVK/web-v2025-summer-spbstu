"use strict";

class Programmer {
    constructor(id, name, languages = []) {
        this.id = id;
        this.name = name;
        this.languages = languages;
    }

    addLanguage(language) {
        if (!this.languages.includes(language)) {
            this.languages.push(language);
        }
    }

    removeLanguage(language) {
        let indx = this.languages.indexOf(language);
        if (indx != -1) {
            this.languages.splice(indx, 1);
        }
    }

    get languageCount() {
        return this.languages.length;
    }
}


//work with interface
//localStorage.clear();
renderCards();

//Временные значения формы создания программиста
let language_list = [];

let button_add_programmer = document.querySelector('#add_programmer');
//let button_remove_programmer = document.querySelector('.remove_programmer');
//console.log(button_remove_programmer);
let button_add_language = document.querySelector('#add_language');
let button_remove_language = document.querySelector('#remove_language');

button_add_programmer.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращает отправку формы
    createProgrammer();
});
/*
if (button_)
button_remove_proggramer.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращает отправку формы
    console.log("REMOVE");
});
*/
button_add_language.addEventListener('click', function(event) {
    event.preventDefault();
    addLanguageToList();
});
button_remove_language.addEventListener('click', function(event) {
    event.preventDefault();
    removeLanguageFromList();
});

function addLanguageToList() {
    let input_language = document.querySelector('#input_language').value.trim();
    if (input_language != "" && language_list.indexOf(input_language) == -1) {
        language_list.push(input_language);
        let ol = document.querySelector('#language_list');
        ol.textContent = '';
        for (let language of language_list) {
            let li = document.createElement('li');
            li.innerHTML = language;
            ol.append(li);
        }
        let language_counter = document.querySelector('#language_counter');
        language_counter.value = language_list.length;
        //console.log(language_list);
    }
}
function removeLanguageFromList() {
    let input_language = document.querySelector('#input_language').value.trim();
    if (input_language != "" && language_list.indexOf(input_language) != -1) {
        language_list.splice(language_list.indexOf(input_language), 1);
        let ol = document.querySelector('#language_list');
        ol.textContent = '';
        for (let language of language_list) {
            let li = document.createElement('li');
            li.innerHTML = language;
            ol.append(li);
        }
        let language_counter = document.querySelector('#language_counter');
        language_counter.value = language_list.length;
    }
}
function createProgrammer() {
    let input_name = document.querySelector('#input_name');
    let name = input_name.value.trim();
    if (name == "") {
        console.log("The programmer's name was not entered.");
    } else if (language_list.length == 0) {
        console.log("The programmer has no languages specified.");
    } else {
        console.log("Ok");
        let new_id = 0;
        if (localStorage.key('programmers') == null) {
            let new_programmer = new Programmer(new_id, name, language_list);
            localStorage.setItem('programmers', JSON.stringify([new_programmer]));
        } else {
            let programmers = JSON.parse(localStorage.getItem('programmers'));
            for (let programmer of programmers) {
                let pr_id = programmer.id;
                if (pr_id >= new_id) {
                    new_id = pr_id + 1;
                }
            }
            let new_programmer = new Programmer(new_id, name, language_list);
            programmers.push(new_programmer);
            localStorage.setItem('programmers', JSON.stringify(programmers));
        }
        alert(localStorage.getItem('programmers'));

        //Отчищение формы
        input_name.value = '';
        let input_language = document.querySelector('#input_language');
        input_language.value = '';
        let ol = document.querySelector('#language_list');
        ol.textContent = '';
        let language_counter = document.querySelector('#language_counter');
        language_counter.value = 0;
        language_list = [];
        renderCards();
    }
}

//Отрисовка карточек программистов
function renderCards() {
    let cards_area = document.querySelector('.cards');
    cards_area.innerHTML = '';
    if (localStorage.getItem('programmers') != null) {
        let programmers = JSON.parse(localStorage.getItem('programmers'));
        for (let programmer of programmers) {
            let template_content = document.getElementById('temp_cards').content.cloneNode(true); //Клонирование содержимого шаблона
            template_content.querySelector('.card').setAttribute('data-programmer-id', programmer.id);
            template_content.querySelector('h1').textContent = "Программист: " + programmer.name;
            let card_language_list = template_content.querySelector('.list');
            for (let language of programmer.languages) {
                let li = document.createElement('li');
                li.innerHTML = language;
                card_language_list.append(li);
            }
            template_content.querySelector('.amount').textContent = "Количество языков: " + programmer.languages.length;

            let button_remove_programmer = template_content.querySelector('.remove_programmer');
            button_remove_programmer.addEventListener('click', function(event) {
                event.preventDefault();
                removeProgrammer(programmer.id);
            });

            cards_area.appendChild(template_content);
        }
    }
}

function removeProgrammer(id) {
    if (localStorage.key('programmers') != null) {
        let programmers = JSON.parse(localStorage.getItem('programmers'));
        for (let i = 0; i < programmers.length; i++) {
            if (programmers[i].id == id) {
                programmers.splice(i, 1);
                break;
            }
        }
        localStorage.setItem('programmers', JSON.stringify(programmers));
        renderCards();
    }
}
