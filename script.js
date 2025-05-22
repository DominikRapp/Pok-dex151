function renderPokemon(pokeData) {
    const pokedexContainer = document.getElementById('pokedex_container');
    const pokemonCardContent = generatePokemonCard(pokeData);
    pokedexContainer.innerHTML += pokemonCardContent;
}

function generatePokemonCard(pokeData) {
    const mainType = pokeData.types[0].type.name;
    const backgroundColor = getTypeColor(mainType);
    let typesContent = '';
    for (let typeIndex = 0; typeIndex < pokeData.types.length; typeIndex++) {
        const typeName = capitalizeFirstLetter(pokeData.types[typeIndex].type.name);
        typesContent += `<li>${typeName}</li>`;
    }
    return getPokemonCardTemplate(pokeData, backgroundColor, typesContent);
}

function createTypesList(types, typesContainer) {
    let typesList = '';
    for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
        const typeName = capitalizeFirstLetter(types[typeIndex].type.name);
        typesList += `<li>${typeName}</li>`;
    }
    typesContainer.innerHTML = typesList;
}

function capitalizeFirstLetter(text) {
    const firstLetter = text.charAt(0).toUpperCase();
    const rest = text.slice(1);
    return firstLetter + rest;
}

function getTypeColor(type) {
    const typeColors = {
        fire: "#F08030",
        grass: "#78C850",
        electric: "#F8D030",
        water: "#6890F0",
        ground: "#E0C068",
        rock: "#B8A038",
        fairy: "#EE99AC",
        poison: "#A040A0",
        bug: "#A8B820",
        dragon: "#7038F8",
        psychic: "#FF4FA1",
        flying: "#A890F0",
        fighting: "#C03028",
        normal: "#A8A878",
        ice: "#98D8D8",
        ghost: "#705898",
        dark: "#705848",
        steel: "#B8B8D0"
    };

    return typeColors[type];
}