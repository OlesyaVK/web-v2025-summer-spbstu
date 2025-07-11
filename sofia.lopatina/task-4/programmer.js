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
let button_add_programmer = document.querySelector('#add_programmer');
//button.addEventListener('click', createProgrammer();

//function createProgrammer(name, languages) {
//    let programmer = new Programmer()
//}
let language_list = [];

let button_add_language = document.querySelector('#add_language');
button_add_language.addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращает отправку формы
    addLanguageToList();
});

function addLanguageToList() {
    let input_language = document.querySelector('#input_language').value.trim();
    if (input_language != "" && language_list.indexOf(input_language) == -1) {
        language_list.push(input_language);
        let li = document.createElement('li');
        li.innerHTML = input_language;
        let ol = document.querySelector('#language_list');
        ol.append(li);
        console.log(language_list);
    }
}

