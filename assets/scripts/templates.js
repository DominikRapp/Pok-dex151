function getPokemonCardTemplate(pokemonData, backgroundColor, typeIconsHTML) {
    return `
        <div class="pokemon-card">
            <div class="pokemon-card-header">
                <span class="pokemon-id">#${pokemonData.id}</span>
                <span class="pokemon-name">${capitalizeFirstLetter(pokemonData.name)}</span>
            </div>
            <div class="pokemon-card-image" style="background-color: ${backgroundColor};">
                <img src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}" />
            </div>
            <div class="pokemon-card-footer">
                ${typeIconsHTML}
            </div>
        </div>
    `;
}