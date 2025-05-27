let allPokemonData = [];

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

function renderPokemon(pokemonData) {
  const pokedexContainer = document.getElementById('pokedex_container');
  const loadMoreWrapper = document.getElementById('load_more_wrapper');
  const primaryType = pokemonData.types[0].type.name;
  const backgroundColor = getTypeColor(primaryType);
  const typeIconsContent = getTypeIcons(pokemonData.types);
  const pokemonCardContent = getPokemonCardTemplate(pokemonData, backgroundColor, typeIconsContent);
  const currentContent = pokedexContainer.innerHTML;
  const loadMoreContent = loadMoreWrapper.outerHTML;
  const newContent = currentContent.replace(loadMoreContent, pokemonCardContent + loadMoreContent);
  pokedexContainer.innerHTML = newContent;
}

function updatePokemonCountDisplay() {
    const countDisplay = document.getElementById('pokemon_count_display');
    const cards = document.getElementsByClassName('pokemon-card');
    countDisplay.innerText = `${cards.length} of ${maxPokemon} loaded`;
}

function generatePokemonCard(pokeData) {
    const mainType = pokeData.types[0].type.name;
    const backgroundColor = getTypeColor(mainType);
    const typeIcons = getTypeIcons(pokeData.types);
    return getPokemonCardTemplate(pokeData, backgroundColor, typeIcons);
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

function getIconPath(typeName) {
    if (typeIcons[typeName]) {
        return typeIcons[typeName];
    }
    return "assets/img/element-icons/default.svg";
}

function getTypeIcons(types) {
    let iconsHtml = '';
    for (let typeIndex = 0; typeIndex < types.length; typeIndex++) {
        const typeInfo = types[typeIndex];
        const typeName = typeInfo.type.name.toLowerCase();
        const iconPath = getIconPath(typeName);
        iconsHtml += createTypeIconTemplate(typeName, iconPath);
    }
    return iconsHtml;
}

function handleSearchInput() {
    const input = document.getElementById("search_input").value.trim();
    const info = document.getElementById("search_info");
    if (input.length < 3) {
        info.classList.add("visible");
        filterPokemon(input);
    } else {
        info.classList.remove("visible");
        filterPokemon(input);
    }
}

function filterPokemon() {
    const input = getSearchInput();
    const info = getSearchInfoElement();
    const pokemonCards = getAllPokemonCards();
    if (shouldShowAllCards(input)) {
        handleShowAllCards(info, pokemonCards);
        return;
    }
    hideSearchWarning(info);
    filterCardsByName(pokemonCards, input);
}

function shouldShowAllCards(inputText) {
    return inputText.length === 0 || inputText.length < 3;
}

function handleShowAllCards(searchInfoBox, cards) {
    if (searchInfoBox && cards) {
        if (getSearchInput().length < 3 && getSearchInput().length > 0) {
            showSearchWarning(searchInfoBox);
        } else {
            hideSearchWarning(searchInfoBox);
        }
        showAllCards(cards);
    }
}

function getSearchInput() {
    return document.getElementById('search_input').value.toLowerCase();
}

function getSearchInfoElement() {
    return document.getElementById('search_info');
}

function getAllPokemonCards() {
    return document.getElementsByClassName('pokemon-card');
}

function showAllCards(cards) {
    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        cards[cardIndex].style.display = 'flex';
    }
}

function showSearchWarning(infoElement) {
    infoElement.classList.add('visible');
}

function hideSearchWarning(infoElement) {
    infoElement.classList.remove('visible');
}

function filterCardsByName(cards, searchTerm) {
    for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
        const name = cards[cardIndex].getAttribute('data-name').toLowerCase();
        if (containsSubstring(name, searchTerm)) {
            cards[cardIndex].style.display = 'flex';
        } else {
            cards[cardIndex].style.display = 'none';
        }
    }
}

function containsSubstring(text, search) {
    for (let startPosition = 0; startPosition <= text.length - search.length; startPosition++) {
        let match = true;
        for (let charIndex = 0; charIndex < search.length; charIndex++) {
            if (text[startPosition + charIndex] !== search[charIndex]) {
                match = false;
                break;
            }
        }
        if (match) {
            return true;
        }
    }
    return false;
}

function renderFilteredPokemon(filteredList) {
    const container = document.getElementById('pokedex_container');
    const loadMoreWrapper = document.getElementById('load_more_wrapper');
    const countDisplay = document.getElementById('pokemon_count_display');
    container.innerHTML = '';
    container.innerHTML = `<div id="pokemon_count_display">${countDisplay.innerText}</div>${loadMoreWrapper.outerHTML}`;
    for (let pokemonIndex = 0; pokemonIndex < filteredList.length; pokemonIndex++) {
        renderPokemon(filteredList[pokemonIndex]);
    }
    updatePokemonCountDisplay();
}

function addElementToContainer(containerElement, elementToInsert) {
    const noSpecificPosition = null;
    containerElement.insertBefore(elementToInsert, noSpecificPosition);
}

function checkInputLength() {
    const input = document.getElementById('search_input').value.trim();
    if (input.length < 3) {
        showAllPokemon();
    }
}

function showAllPokemon() {
    const cards = document.getElementsByClassName('pokemon-card');
    for (let card of cards) {
        card.style.display = 'flex';
    }
}

function suppressEnter(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
    }
}