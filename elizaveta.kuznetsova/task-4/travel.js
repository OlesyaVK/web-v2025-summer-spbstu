class Travel {
    constructor(id, travelerName, visitedCountries = []) {
        this.id = id;
        this.travelerName = travelerName;
        this.visitedCountries = visitedCountries;
    }

    addCountry(country) {
        if (!this.visitedCountries.includes(country)) {
            this.visitedCountries.push(country);
        }
    }

    removeCountry(country) {
        const index = this.visitedCountries.indexOf(country);
        if (index !== -1) {
            this.visitedCountries.splice(index, 1);
        }
    }

    get visitedCount() {
        return this.visitedCountries.length;
    }
}
