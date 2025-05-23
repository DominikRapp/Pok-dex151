function getPokemonCardTemplate(pokemonData, backgroundColor, typeIconsHTML) {
    return `<div class="pokemon-card">
                <div class="pokemon-card-header">
                    <p class="pokemon-id">Id: ${pokemonData.id}</p>
                    <span class="pokemon-name collor-black">${capitalizeFirstLetter(pokemonData.name)}</span>
                </div>
                <div class="pokemon-card-image" style="background-color: ${backgroundColor};">
                    <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}" />
                </div>
                <div class="pokemon-card-footer">
                    ${typeIconsHTML}
                </div>
            </div>`;
}

function createTypeIconTemplate(typeName, iconPath) {
    return `<div class="icon ${typeName}">
                <img src="${iconPath}" alt="${typeName}" title="${capitalizeFirstLetter(typeName)}" />
            </div>`;
}