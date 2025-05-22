function getPokemonCardTemplate(pokeData, backgroundColor, typesContent) {
    return `<div class="pokemon-card" style="background-color: ${backgroundColor};">
                <img src="${pokeData.sprites.other['official-artwork'].front_default}" alt="${pokeData.name}" />
                <h4>${capitalizeFirstLetter(pokeData.name)}</h4>
                <p>#${pokeData.id}</p>
                <ul>${typesContent}</ul>
            </div>`;
}