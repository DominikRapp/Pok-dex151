let isLoading = false;
let offset = 0;
const limit = 20;
const maxPokemon = 151;

async function loadPokemon() {
  if (isLoading) return;
  isLoading = true;
  showLoadingState(true);
  const currentLimit = calculateCurrentLimit();
  const allPokemon = await fetchPokemonList(currentLimit, offset);
  await loadAllPokemonDetails(allPokemon.results);
  updateOffset(currentLimit);
  updateLoadMoreButton();
  updatePokemonCountDisplay();
  showLoadingState(false);
  isLoading = false;
  addCardClickEvents();
}

function showLoadingState(isLoading) {
  const loadingOverlay = document.getElementById('loading_overlay');
  const loadMoreButton = document.getElementById('load_more_button');
  if (isLoading) {
    loadingOverlay.classList.remove('hidden');
    loadMoreButton.disabled = true;
  } else {
    loadingOverlay.classList.add('hidden');
    loadMoreButton.disabled = false;
  }
}

async function loadAllPokemonDetails(pokemonList) {
  for (let currentPokemonIndex = 0; currentPokemonIndex < pokemonList.length; currentPokemonIndex++) {
    await fetchPokemonData(pokemonList[currentPokemonIndex]);
  }
}

function calculateCurrentLimit() {
  const remaining = maxPokemon - offset;
  return (limit < remaining) ? limit : remaining;
}

async function fetchPokemonList(limit, offset) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
  return await response.json();
}

function updateOffset(amount) {
  offset += amount;
}

function updateLoadMoreButton() {
  const loadMoreButton = document.getElementById("load_more_button");
  if (offset >= maxPokemon) {
    loadMoreButton.style.display = "none";
  } else {
    loadMoreButton.style.display = "block";
  }
}

async function fetchPokemonData(pokemon) {
  const response = await fetch(pokemon.url);
  const pokeData = await response.json();
  allPokemonData.push(pokeData);
  renderPokemon(pokeData);
  await fetchEvolutionChain(pokeData);
}

async function fetchEvolutionChain(pokemonData) {
  const speciesData = await getSpeciesData(pokemonData.species.url);
  const evoChainData = await getEvolutionChainData(speciesData.evolution_chain.url);
  const chain = await buildEvolutionChain(evoChainData.chain);
  evolutionChains[pokemonData.name.toLowerCase()] = chain;
}

async function getSpeciesData(speciesUrl) {
  const response = await fetch(speciesUrl);
  return await response.json();
}

async function getEvolutionChainData(evoChainUrl) {
  const response = await fetch(evoChainUrl);
  return await response.json();
}

function findPokemonIdByName(name) {
  for (let pokemonIndex = 0; pokemonIndex < allPokemonData.length; pokemonIndex++) {
    if (allPokemonData[pokemonIndex].name === name) {
      return allPokemonData[pokemonIndex].id;
    }
  }
  return 0;
}

async function getPokemonId(pokemonName) {
  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const pokemonData = await response.json();
  return pokemonData.id;
}

async function buildEvolutionChain(evolutionChainData) {
  const evolutionStages = [];
  let currentStage = evolutionChainData;
  for (let stage = 0; stage < 3; stage++) {
    if (!currentStage) break;
    const pokemonName = currentStage.species.name;
    const pokemonId = await getPokemonId(pokemonName);
    const pokemonImageUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonId}.png`;
    evolutionStages.push({ name: pokemonName, image: pokemonImageUrl });
    currentStage = currentStage.evolves_to && currentStage.evolves_to.length > 0 ? currentStage.evolves_to[0]: null;
  }
  return evolutionStages;
}