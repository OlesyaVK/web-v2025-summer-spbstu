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

let programmers = [];

let test = new Programmer(1, 'Test', ['f', 'f']);
test.addLanguage('rr');
test.addLanguage('aa');
test.addLanguage('tt');
test.addLanguage('rr');
console.log(test.languages);
test.removeLanguage('rr');
test.removeLanguage('ff');
test.languages = ['n', 'm'];
console.log(test.languages);
console.log(test.languageCount);

//work with interface
//Временные значения формы создания программиста
let language_list = [];

let button_add_programmer = document.querySelector('#add_programmer');
let button_add_language = document.querySelector('#add_language');
let button_remove_language = document.querySelector('#remove_language');

button_add_programmer.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    createProgrammer();
});
button_add_language.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
    addLanguageToList();
});
button_remove_language.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем отправку формы
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
        console.log(language_list);
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
        console.log(language_list);
    }
}
function createProgrammer() {
    let input_name = document.querySelector('#input_name').value.trim();
    if (input_name == "") {
        console.log("The programmer's name was not entered.");
    } else if (language_list.length == 0) {
        console.log("The programmer has no languages specified.");
    } else {
        console.log("Ok");
    }
}
