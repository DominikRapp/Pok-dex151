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

function buildDetailTemplate(pokemonData, bgColor, typesHTML, mainHTML, statsHTML, evolutionHTML) {
  return `<div class="pokemon-detail" style="background-color: ${bgColor};">
              <h2 class="pokemon-title">${capitalizeFirstLetter(pokemonData.name)} (Id: ${pokemonData.id})</h2>
              <img class="pokemon-image" src="${pokemonData.sprites.other['official-artwork'].front_default}" alt="${pokemonData.name}" />
            <div class="pokemon-types">${typesHTML}</div>
            <div class="tab-buttons">
              <button id="btn-main" class="tab-btn active" data-tab="main">Main</button>
              <button id="btn-stats" class="tab-btn" data-tab="stats">Stats</button>
              <button id="btn-evolution" class="tab-btn" data-tab="evolution">Evo Chain</button>
            </div>
            <div id="tab-main" class="tab-content active">${mainHTML}</div>
            <div id="tab-stats" class="tab-content">${renderStatsWrapperHTML(statsHTML)}</div>
            <div id="tab-evolution" class="tab-content">${evolutionHTML}</div>
          </div>`;
}

function renderStatItemTemplate(statName, barWidth) {
  return `<li class="stat-item">
              <strong>${statName}</strong>
            <div class="stat-bar-bg">
              <div class="stat-bar-fill" style="width: ${barWidth}%;"></div>
            </div>
          </li>`;
}

function generateMainInfoListTemplate(height, weight, baseExp, abilitiesHTML) {
  return `<ul class="main-info-list">
            <li><strong>Height:</strong> ${height}</li>
            <li><strong>Weight:</strong> ${weight}</li>
            <li><strong>Base Experience:</strong> ${baseExp}</li>
            <li><strong>Abilities:</strong> ${abilitiesHTML}</li>
          </ul>`;
}

function renderEvolutionStageTemplate(poke) {
  return `<div class="evolution-stage">
            <img src="${poke.image}" class="evolution-img" />
            <div class="evolution-name">${capitalizeFirstLetter(poke.name)}</div>
          </div>`;
}