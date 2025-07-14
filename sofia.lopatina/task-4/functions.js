"use strict";

let id = 1;
let programmers = [
    new Programmer(id, "Ivan", ["Python", "Java", "SQL"]),
    new Programmer(++id, "Petr", ["C++", "C#"]),
    new Programmer(++id, "Elena", ["JavaScript", "Go", "C++"]),
    new Programmer(++id, "Olga", ["C++", "Python",]),
    new Programmer(++id, "Igor", ["Pascal"]),
    new Programmer(++id, "Empty")
];
console.log(programmers);
console.log(findUniqueLanguages(programmers));
console.log(groupByLanguages(programmers));
console.log(findLanguageOwners(programmers, "C++"));
console.log(groupByAmountLanguages(programmers));
console.log(findMaxLanguagesOwners(programmers));


function groupByLanguages(programmers) {
    let unique_languages = Array.from(findUniqueLanguages(programmers));
    let map_languages = new Map(unique_languages.map(function(language) {
        let language_owners = [];
        for (let programmer of programmers) {
            if (programmer.languages.includes(language)) {
                language_owners.push(programmer);
            }
        }
        return [language, language_owners];
    }));
    return map_languages;
}

function findUniqueLanguages(programmers) {
    let all_languages = programmers.map(function(programmer) {
        let languages = programmer.languages;
        return languages;
    });
    return new Set([].concat(...all_languages));
}

function findLanguageOwners(programmers, language) {
    return programmers.filter(programmer => programmer.languages.includes(language));
}

function groupByAmountLanguages(programmers) {
    return Map.groupBy(programmers, programmer => programmer.languageCount);
}

function findMaxLanguagesOwners(programmers) {
    let map_amount = groupByAmountLanguages(programmers);
    let keys = map_amount.keys();
    let max_amount = Math.max(...keys);
    return map_amount.get(max_amount);
}
