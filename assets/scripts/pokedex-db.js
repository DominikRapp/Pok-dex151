let isLoading = false;
let offset = 0;
const limit = 30;
const maxPokemon = 151;

async function loadPokemon() {
    if (isLoading) return;
    isLoading = true;
    const loadingOverlay = document.getElementById('loading_overlay');
    const loadMoreButton = document.getElementById('load_more_button');
    loadingOverlay.classList.remove('hidden');
    loadMoreButton.disabled = true;
    const currentLimit = calculateCurrentLimit();
    const allPokemon = await fetchPokemonList(currentLimit, offset);
    for (let pokemonIndex = 0; pokemonIndex < allPokemon.results.length; pokemonIndex++) {
        const pokemon = allPokemon.results[pokemonIndex];
        await fetchPokemonData(pokemon);
    }
    updateOffset(currentLimit);
    updateLoadMoreButton();
    updatePokemonCountDisplay();
    loadingOverlay.classList.add('hidden');
    loadMoreButton.disabled = false;
    isLoading = false;
}

function calculateCurrentLimit() {
    const remaining = maxPokemon - offset;
    if (limit < remaining) {
        return limit;
    } else {
        return remaining;
    }
}

async function fetchPokemonList(limit, offset) {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
    return await response.json();
}

function updateOffset(amount) {
    offset += amount;
}

function updateLoadMoreButton() {
    const loadMoreBtn = document.getElementById("load_more_button");
    if (offset >= maxPokemon) {
        loadMoreBtn.style.display = "none";
    } else {
        loadMoreBtn.style.display = "block";
    }
}

async function fetchPokemonData(pokemon) {
    const response = await fetch(pokemon.url);
    const pokeData = await response.json();
    renderPokemon(pokeData);
}