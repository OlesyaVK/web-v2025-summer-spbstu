function groupByVisitedCount(travels) {
    return Map.groupBy(travels, t => t.visitedCount);
}

function uniqueVisitedCountries(travels) {
    return Array.from(new Set(travels.flatMap(t => t.visitedCountries)));
}

function travelsIncludingCountry(travels, country) {
    return travels.filter(t => t.visitedCountries.includes(country));
}

function groupTravelersByCountry(travels) {
    const map = new Map();
    for (const travel of travels) {
        for (const country of travel.visitedCountries) {
            if (!map.has(country)) map.set(country, []);
            map.get(country).push(travel.travelerName);
        }
    }
    return map;
}

function travelersVisitedMoreThan(travels, n) {
    return travels.filter(t => t.visitedCount > n);
}


let testTravels = [
    new Travel(1, "Аня", ["Италия", "Франция"]),
    new Travel(2, "Олег", ["Франция", "Германия", "Польша"]),
    new Travel(3, "Алексей", ["Япония"]),
];

// Тесты
console.log("Группировка по количеству стран:");
console.log(groupByVisitedCount(testTravels));

console.log("Уникальные страны:");
console.log(uniqueVisitedCountries(testTravels));

console.log("Путешествия с Францией:");
console.log(travelsIncludingCountry(testTravels, "Франция"));

console.log("Путешественники по странам:");
console.log(groupTravelersByCountry(testTravels));

console.log("Больше 2 стран:");
console.log(travelersVisitedMoreThan(testTravels, 2));
