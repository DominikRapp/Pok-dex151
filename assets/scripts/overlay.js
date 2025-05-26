let currentPokemonIndex = null;
const evolutionChains = {};

const overlay = document.getElementById('pokemon_overlay');
const detailCard = document.getElementById('pokemon_detail_card');
const closeBtn = document.getElementById('overlay_close');
const prevBtn = document.getElementById('overlay_prev');
const nextBtn = document.getElementById('overlay_next');

function disableScroll() {
  document.body.style.overflow = 'hidden';
}

function enableScroll() {
  document.body.style.overflow = '';
}

function renderDetailCard(pokemonData) {
  const mainType = pokemonData.types[0].type.name;
  const bgColor = getTypeColor(mainType);
  const typesHTML = renderTypesHTML(pokemonData.types);
  const statsHTML = renderStatsHTML(pokemonData.stats);
  const mainHTML = renderMainInfoHTML(pokemonData);
  const evolutionHTML = renderEvolutionChain(pokemonData.name);
  detailCard.innerHTML = buildDetailTemplate(pokemonData, bgColor, typesHTML, mainHTML, statsHTML, evolutionHTML);
  const btnMain = document.getElementById('btn-main');
  const btnStats = document.getElementById('btn-stats');
  const btnEvo = document.getElementById('btn-evolution');
  btnMain.onclick = () => activateTab('main');
  btnStats.onclick = () => activateTab('stats');
  btnEvo.onclick = () => activateTab('evolution');
}

function activateTab(tabName) {
  document.getElementById('btn-main').classList.remove('active');
  document.getElementById('btn-stats').classList.remove('active');
  document.getElementById('btn-evolution').classList.remove('active');
  document.getElementById('tab-main').classList.remove('active');
  document.getElementById('tab-stats').classList.remove('active');
  document.getElementById('tab-evolution').classList.remove('active');
  document.getElementById('btn-' + tabName).classList.add('active');
  document.getElementById('tab-' + tabName).classList.add('active');
}

function renderStatsWrapperHTML(statsHTML) {
  return '<ul class="stats-list">' + statsHTML + '</ul>';
}

function renderTypesHTML(types) {
  const typeIconsArray = getTypeIcons(types);
  let typesHTML = '';
  for (let typeIndex = 0; typeIndex < typeIconsArray.length; typeIndex++) {
    typesHTML += typeIconsArray[typeIndex];
  }
  return typesHTML;
}

function renderStatsHTML(stats) {
  let statsHTML = '';
  for (let statIndex = 0; statIndex < stats.length; statIndex++) {
    const currentStat = stats[statIndex];
    const statName = capitalizeFirstLetter(currentStat.stat.name.replace('-', ' '));
    const barWidth = Math.min(100, currentStat.base_stat);
    statsHTML += renderStatItemTemplate(statName, barWidth);
  }
  return statsHTML;
}

function renderMainInfoHTML(pokemonData) {
  const abilities = pokemonData.abilities;
  const height = pokemonData.height / 10 + ' m';
  const weight = pokemonData.weight / 10 + ' kg';
  const baseExp = pokemonData.base_experience;
  let abilitiesHTML = '';
  for (let abilityIndex = 0; abilityIndex < abilities.length; abilityIndex++) {
    const abilityName = capitalizeFirstLetter(abilities[abilityIndex].ability.name);
    abilitiesHTML += abilityName;
    if (abilityIndex < abilities.length - 1) {
      abilitiesHTML += ', ';
    }
  }
  return generateMainInfoListTemplate(height, weight, baseExp, abilitiesHTML);
}

function renderEvolutionChain(name) {
  const chain = evolutionChains[name.toLowerCase()];
  if (!chain || chain.length === 0) return 'No evolution data';
  let html = '<div class="evolution-chain">';
  for (let stageIndex = 0; stageIndex < chain.length; stageIndex++) {
    const poke = chain[stageIndex];
    html += renderEvolutionStageTemplate(poke);
    if (stageIndex < chain.length - 1) {
      html += '<div class="evolution-arrow">→</div>';
    }
  }
  html += '</div>';
  return html;
}

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

function setupOverlayEventHandlers() {
  closeBtn.onclick = closeOverlay;
  nextBtn.onclick = showNext;
  prevBtn.onclick = showPrev;

  overlay.onclick = function (mouseClickEvent) {
    if (mouseClickEvent.target === overlay) {
      closeOverlay();
    }
  };
}

function addCardClickEvents() {
  const cards = document.getElementsByClassName('pokemon-card');
  for (let cardIndex = 0; cardIndex < cards.length; cardIndex++) {
    cards[cardIndex].onclick = function () {
      openOverlay(cardIndex);
    };
  }
}

setupOverlayEventHandlers();