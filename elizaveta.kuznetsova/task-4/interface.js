let inputName = document.getElementById("name");
let addTravelBtn = document.getElementById("addTravel");
let travelCards = document.getElementById("travels");
let travels = [];

loadTravels().then((loaded) => {
    travels = loaded;
    travelCards.append(...travels.map(createTravelCard));
});

addTravelBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const id = getNextId();
    const name = inputName.value.trim();
    if (!name) return;

    const newTravel = new Travel(id, name, []);
    travels.push(newTravel);
    storeTravels(travels);
    travelCards.appendChild(createTravelCard(newTravel));
    inputName.value = "";
});

function getNextId() {
    return travels.length > 0 ? Math.max(...travels.map(t => t.id)) + 1 : 1;
}

function pluralizeCountry(count) {
    const mod10 = count % 10;
    const mod100 = count % 100;
    if (mod10 === 1 && mod100 !== 11) return "страна";
    if (mod10 >= 2 && mod10 <= 4 && !(mod100 >= 12 && mod100 <= 14)) return "страны";
    return "стран";
}

function createTravelCard(travel) {
    const card = document.getElementById("travelCard").content.cloneNode(true).firstElementChild;
    const title = card.querySelector("h1");
    const countryList = card.querySelector("ol");
    const [addButton, removeButton] = card.querySelectorAll("button");
    const input = card.querySelector("input");

    function updateTitle() {
    title.textContent = `#${travel.id} — ${travel.travelerName} (${travel.visitedCount} ${pluralizeCountry(travel.visitedCount)})`;
    }

    function refreshList() {
        countryList.innerHTML = "";
        travel.visitedCountries.forEach(country => {
            countryList.appendChild(createCountryItem(country, () => {
                travel.removeCountry(country);
                storeTravels(travels);
                refreshList();
                updateTitle();
            }));
        });
    }

    addButton.addEventListener("click", () => {
        const country = input.value.trim();
        if (country && !travel.visitedCountries.includes(country)) {
            travel.addCountry(country);
            input.value = "";
            storeTravels(travels);
            refreshList();
            updateTitle();
        }
    });

    removeButton.addEventListener("click", () => {
        const index = travels.indexOf(travel);
        if (index !== -1) {
            travels.splice(index, 1);
            card.remove();
            storeTravels(travels);
        }
    });

    refreshList();
    updateTitle();
    return card;
}

function createCountryItem(country, onRemove) {
    const li = document.getElementById("travelCardItem").content.cloneNode(true).firstElementChild;
    const button = li.querySelector("button");
    button.before(country);
    button.addEventListener("click", () => {
        li.remove();
        onRemove();
    });
    return li;
}

function loadTravels() {
    return new Promise(resolve => {
        setTimeout(() => {
            const raw = JSON.parse(localStorage.getItem("travels") || "[]");
            resolve(raw.map(obj => Object.assign(new Travel(), obj)));
        }, 500);
    });
}

function storeTravels(travels) {
    return new Promise(resolve => {
        setTimeout(() => {
            localStorage.setItem("travels", JSON.stringify(travels));
            resolve();
        }, 500);
    });
}
