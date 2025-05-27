function getPokemonCardTemplate(pokemonData, backgroundColor, typeIconsHTML) {
    return `<div class="pokemon-card" data-name="${pokemonData.name.toLowerCase()}">
                <div class="pokemon-card-header">
                    <p class="pokemon-id">Id: ${pokemonData.id}</p>
                    <span class="pokemon-name color-black">${capitalizeFirstLetter(pokemonData.name)}</span>
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

function createMainInfoListTemplate(height, weight, baseExp, abilitiesHTML) {
  return `<ul class="main-info-list">
            <li><strong>Height:</strong> ${height}</li>
            <li><strong>Weight:</strong> ${weight}</li>
            <li><strong>Base Experience:</strong> ${baseExp}</li>
            <li><strong>Abilities:</strong> ${abilitiesHTML}</li>
          </ul>`;
}

function createDetailTemplate(pokemonData, backgroundColor, typesHTML, mainHTML, statsHTML, evolutionHTML) {
  return `<div class="pokemon-detail">
            <div class="overlay-pokemon-card-header">
              <div><h2 class="pokemon-title color-white">Id: ${pokemonData.id}</h2></div> <div><h2><b class="color-black">${capitalizeFirstLetter(pokemonData.name)}</b></h2></div>
            </div>
            <div class="overlay-image-border" style="background-color: ${backgroundColor};">
              <img class="pokemon-image" src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}" />
            </div>
            <div class="overlay-pokemon-card-footer">
              <div class="overlay-pokemon-types">${typesHTML}</div>
            </div>
            <div class="tab-buttons">
              <button id="button-main" class="tab-button active" data-tab="main">Main</button>
              <button id="button-stats" class="tab-button" data-tab="stats">Stats</button>
              <button id="button-evolution" class="tab-button" data-tab="evolution">Evo Chain</button>
            </div>
            <div id="tab-main" class="tab-content active">${mainHTML}</div>
            <div id="tab-stats" class="tab-content">${renderStatsWrapperTemplate(statsHTML)}</div>
            <div id="tab-evolution" class="tab-content">${evolutionHTML}</div>
          </div>`;
}

function renderStatsWrapperTemplate(statsHTML) {
  return '<ul class="stats-list">' + statsHTML + '</ul>';
}

function renderStatItemTemplate(statName, barWidth) {
  return `<li class="stat-item">
              <strong>${statName}</strong>
            <div class="stat-bar-background">
              <div class="stat-bar-fill" style="width: ${barWidth}%;"></div>
            </div>
          </li>`;
}

function renderEvolutionStageTemplate(poke) {
  return `<div class="evolution-stage">
            <img src="${poke.image}" class="evolution-img" />
            <div class="evolution-name">${capitalizeFirstLetter(poke.name)}</div>
          </div>`;
}