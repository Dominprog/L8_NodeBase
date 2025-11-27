function sortStringsIgnoreSpaces(strings) {
    return strings.map(str => str.replace(/\s/g, '')).sort((a, b) => a.localeCompare(b));
}

module.exports = { sortStringsIgnoreSpaces };