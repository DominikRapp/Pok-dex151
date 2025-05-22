function fetchKantoPokemon() {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
        .then(response => response.json())
        .then(function (allpokemon) {
            allpokemon.results.forEach(function (pokemon) {
                fetchPokemonData(pokemon);
            })
        })
}

async function renderAll() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const allPokemon = await response.json();
    for (const pokemon of allPokemon.results) {
        await fetchPokemonData(pokemon);
    }
}

async function fetchPokemonData(pokemon) {
    const response = await fetch(pokemon.url);
    const pokeData = await response.json();
    renderPokemon(pokeData);
}