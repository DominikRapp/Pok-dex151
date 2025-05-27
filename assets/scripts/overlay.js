let currentPokemonIndex = null;
const evolutionChains = {};

const overlay = document.getElementById('pokemon_overlay');
const detailCard = document.getElementById('pokemon_detail_card');
const closeButton = document.getElementById('overlay_close');
const prevButton = document.getElementById('overlay_prev');
const nextButton = document.getElementById('overlay_next');

function renderDetailCard(pokemonData) {
  const mainType = pokemonData.types[0].type.name;
  const backgroundColor = getTypeColor(mainType);
  const typesHtml = renderTypesHtml(pokemonData.types);
  const statsHtml = renderStatsHtml(pokemonData.stats);
  const mainHtml = renderMainInfoHtml(pokemonData);
  const evolutionHtml = renderEvolutionChain(pokemonData.name);
  detailCard.innerHTML = createDetailTemplate(pokemonData, backgroundColor, typesHtml, mainHtml, statsHtml, evolutionHtml);
  const buttonMain = document.getElementById('button-main');
  const buttonStats = document.getElementById('button-stats');
  const buttonEvo = document.getElementById('button-evolution');
  buttonMain.onclick = () => activateTab('main');
  buttonStats.onclick = () => activateTab('stats');
  buttonEvo.onclick = () => activateTab('evolution');
}

function renderTypesHtml(types) {
  const typeIconsArray = getTypeIcons(types);
  let typesHtml = '';
  for (let typeIndex = 0; typeIndex < typeIconsArray.length; typeIndex++) {
    typesHtml += typeIconsArray[typeIndex];
  }
  return typesHtml;
}

function renderStatsHtml(stats) {
  let statsHtml = '';
  for (let statIndex = 0; statIndex < stats.length; statIndex++) {
    const currentStat = stats[statIndex];
    const statName = capitalizeFirstLetter(currentStat.stat.name.replace('-', ' '));
    const barWidth = Math.min(100, currentStat.base_stat);
    statsHtml += renderStatItemTemplate(statName, barWidth);
  }
  return statsHtml;
}

function renderMainInfoHtml(pokemonData) {
  const abilities = pokemonData.abilities;
  const height = pokemonData.height / 10 + ' m';
  const weight = pokemonData.weight / 10 + ' kg';
  const baseExp = pokemonData.base_experience;
  let abilitiesHtml = '';
  for (let abilityIndex = 0; abilityIndex < abilities.length; abilityIndex++) {
    const abilityName = capitalizeFirstLetter(abilities[abilityIndex].ability.name);
    abilitiesHtml += abilityName;
    if (abilityIndex < abilities.length - 1) {
      abilitiesHtml += ', ';
    }
  }
  return createMainInfoListTemplate(height, weight, baseExp, abilitiesHtml);
}

function renderEvolutionChain(name) {
  const evolutionStages = evolutionChains[name.toLowerCase()];
  if (!evolutionStages || evolutionStages.length === 0) return '';
  let evolutionChainMarkup = '<div class="evolution-chain">';
  for (let stageIndex = 0; stageIndex < evolutionStages.length; stageIndex++) {
    const evolutionStage = evolutionStages[stageIndex];
    evolutionChainMarkup += renderEvolutionStageTemplate(evolutionStage);
    if (stageIndex < evolutionStages.length - 1) {
      evolutionChainMarkup += '<div class="evolution-arrow">></div>';
    }
  }
  evolutionChainMarkup += '</div>';
  return evolutionChainMarkup;
}

function initOverlay() {
  closeButton.onclick = closeOverlay;
  nextButton.onclick = showNext;
  prevButton.onclick = showPrev;
  overlay.onclick = function (mouseClickEvent) {
    if (mouseClickEvent.target === overlay) {
      closeOverlay();
    }
  };
}

initOverlay();

async function openOverlay(index) {
  currentPokemonIndex = index;
  const pokemonData = allPokemonData[currentPokemonIndex];
  const nameKey = pokemonData.name.toLowerCase();
  if (!evolutionChains[nameKey]) {
    await fetchEvolutionChain(pokemonData);
  }
  renderDetailCard(pokemonData);
  overlay.classList.remove('hidden');
  disableScroll();
}

function closeOverlay() {
  overlay.classList.add('hidden');
  enableScroll();
}

function showNext() {
  currentPokemonIndex = (currentPokemonIndex + 1) % allPokemonData.length;
  renderDetailCard(allPokemonData[currentPokemonIndex]);
}

function showPrev() {
  currentPokemonIndex = (currentPokemonIndex - 1 + allPokemonData.length) % allPokemonData.length;
  renderDetailCard(allPokemonData[currentPokemonIndex]);
}

function addCardClickEvents() {
  const cards = document.getElementsByClassName('pokemon-card');
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    cards[cardIndex].onclick = function () {
      openOverlay(cardIndex);
    };
  }
}

function activateTab(tabName) {
  document.getElementById('button-main').classList.remove('active');
  document.getElementById('button-stats').classList.remove('active');
  document.getElementById('button-evolution').classList.remove('active');
  document.getElementById('tab-main').classList.remove('active');
  document.getElementById('tab-stats').classList.remove('active');
  document.getElementById('tab-evolution').classList.remove('active');
  document.getElementById('button-' + tabName).classList.add('active');
  document.getElementById('tab-' + tabName).classList.add('active');
}

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}