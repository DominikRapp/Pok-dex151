const typeIcons = {
    bug: "assets/img/element-icons/bug.svg",
    dark: "assets/img/element-icons/dark.svg",
    dragon: "assets/img/element-icons/dragon.svg",
    electric: "assets/img/element-icons/electric.svg",
    fairy: "assets/img/element-icons/fairy.svg",
    fighting: "assets/img/element-icons/fighting.svg",
    fire: "assets/img/element-icons/fire.svg",
    flying: "assets/img/element-icons/flying.svg",
    ghost: "assets/img/element-icons/ghost.svg",
    grass: "assets/img/element-icons/grass.svg",
    ground: "assets/img/element-icons/ground.svg",
    ice: "assets/img/element-icons/ice.svg",
    normal: "assets/img/element-icons/normal.svg",
    poison: "assets/img/element-icons/poison.svg",
    psychic: "assets/img/element-icons/psychic.svg",
    rock: "assets/img/element-icons/rock.svg",
    steel: "assets/img/element-icons/steel.svg",
    water: "assets/img/element-icons/water.svg"
};

function renderPokemon(pokeData) {
    const pokedexContainer = document.getElementById('pokedex_container');
    const pokemonCardContent = generatePokemonCard(pokeData);
    pokedexContainer.innerHTML += pokemonCardContent;
}

function generatePokemonCard(pokeData) {
    const mainType = pokeData.types[0].type.name;
    const backgroundColor = getTypeColor(mainType);
    const typeIconsHTML = getTypeIconsHTML(pokeData.types);
return getPokemonCardTemplate(pokeData, backgroundColor, typeIconsHTML);
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
        bug: "#92BC2C",
        dark: "#595761",
        dragon: "#0C69C8",
        electric: "#F2D94E",
        fire: "#FBA54C",
        fairy: "#EE90E6",
        fighting: "#D3425F",
        flying: "#A1BBEC",
        ghost: "#5F6DBC",
        grass: "#5FBD58",
        ground: "#DA7C4D",
        ice: "#75D0C1",
        normal: "#A0A29F",
        poison: "#B763CF",
        psychic: "#FA8581",
        rock: "#C9BB8A",
        steel: "#5695A3",
        water: "#539DDF"
    };
    return typeColors[type];
}

function getTypeIconsHTML(types) {
    return types.map(typeInfo => {
        const type = typeInfo.type.name.toLowerCase();
        const iconSrc = typeIcons[type] || "assets/img/element-icons/default.svg"; // Fallback
        return `
            <div class="icon ${type}">
                <img src="${iconSrc}" alt="${type}" title="${capitalizeFirstLetter(type)}" />
            </div>
        `;
    }).join('');
}