const coinCountEl = document.getElementById("coinCount");
const coinsPerClickEl = document.getElementById("coinsPerClick");
const coinsPerSecondEl = document.getElementById("coinsPerSecond");
const upgradeGridEl = document.getElementById("upgradeGrid");
const clickButton = document.getElementById("clickButton");
const worldNameEl = document.getElementById("worldName");
const worldMultiplierEl = document.getElementById("worldMultiplier");
const coinsToNextWorldEl = document.getElementById("coinsToNextWorld");
const worldProgressTextEl = document.getElementById("worldProgressText");
const progressFillEl = document.querySelector(".progress-fill");

let state = {
  coins: 0,
  coinsPerClick: 1,
  coinsPerSecond: 0,
  currentWorld: 1,
  worldMultiplier: 1,
  upgrades: [],
};

const worldNameGroups = [
  [
    "Mushroom Meadow",
    "Goomba Gorge",
    "Piranha Pond",
    "Blocky Bluff",
    "Coin Cavern",
    "Shroom Shore",
    "Toad Trail",
    "Lakitu Lagoon",
    "Switch Summit",
    "Acorn Acres",
    "Firefly Flats",
    "Rolling Hills",
    "Pipe Path",
    "Spiny Spring",
    "Shy Guy Shore",
    "Flower Field",
    "Mystery Meadow",
    "Pipe Plateau",
    "Mushroom Springs",
    "Warp Woods",
  ],
  [
    "Koopa Coast",
    "Boo Basin",
    "Cheep Cheep Channel",
    "Dry Dry Dunes",
    "Bullet Bill Bridge",
    "Hammer Bro Heights",
    "Cheep Cliffs",
    "Banzai Bill Bay",
    "Koopa Cliffs",
    "Spike Street",
    "Sneaky Steps",
    "Shell Shore",
    "Paratroopa Pass",
    "Piranha Passage",
    "Koopa Cove",
    "Skull Rock Ridge",
    "Whomp Wall",
    "Platform Pier",
    "Swoop Summit",
    "Wiggler Woods",
  ],
  [
    "Yoshi Valley",
    "Baby Dino Delta",
    "Star Steppe",
    "Rainbow Rapids",
    "Luma Lagoon",
    "Forest of Feathers",
    "Egg Plateau",
    "Cloudtop Cliffs",
    "Dreamy Dunes",
    "Petal Plains",
    "Feather Fields",
    "Vine Vale",
    "Yoshi Grove",
    "Fruit Falls",
    "Flutter Forest",
    "Candy Clouds",
    "Berry Bluff",
    "Fuzzy Forest",
    "Sunny Slope",
    "Crystal Cove",
  ],
  [
    "Bowser's Bridge",
    "Castle Keep",
    "Lava Labyrinth",
    "Thwomp Tower",
    "Dragon Dungeon",
    "Koopa Keep",
    "Royal Ramparts",
    "Magikoopa Mesa",
    "Bone Belt",
    "Fortress Falls",
    "Skull Sanctuary",
    "Thorn Thicket",
    "Spike Spire",
    "Pow Palace",
    "Chain Chomp Chateau",
    "Giant Gate",
    "Magma Maze",
    "Bowser Basin",
    "Hammer Hall",
    "Fire Fortress",
  ],
  [
    "Star Road",
    "Galaxy Gate",
    "Nova Nexus",
    "Comet Curve",
    "Meteor Mesa",
    "Cosmic Coast",
    "Supernova Strand",
    "Orbit Oasis",
    "Astro Alley",
    "Nebula Nook",
    "Planet Path",
    "Lunar Lane",
    "Sputnik Summit",
    "Gravity Gorge",
    "Moonbeam Meadow",
    "Rocket Ridge",
    "Solar Steps",
    "Aurora Arch",
    "Starlight Station",
    "Orbit Orchard",
  ],
  [
    "Rainbow Realm",
    "Prismatic Peak",
    "Cloud Canyon",
    "Spectrum Springs",
    "Prism Plateau",
    "Colorful Crossing",
    "Crystal Crescent",
    "Dream Dome",
    "Magic Mountain",
    "Glitter Glen",
    "Sparkle Springs",
    "Shimmer Shore",
    "Iridescent Isle",
    "Fusion Falls",
    "Mystic Mirage",
    "Radiant Ridge",
    "Illusion Inlet",
    "Vivid Valley",
    "Kaleido Keep",
    "Polychrome Path",
  ],
];

function getWorldThreshold(worldIndex) {
  return Math.floor(100 * Math.pow(1.14, worldIndex - 1));
}

const worldDefinitions = worldNameGroups.reduce((all, names) => {
  names.forEach((name) => {
    const worldIndex = all.length + 1;
    all.push({
      name,
      description: `Travel to ${name} and earn Mushroom Kingdom rewards.`,
      threshold: getWorldThreshold(worldIndex),
    });
  });
  return all;
}, []);

const upgradeDefinitions = [
  {
    id: "mushroom-pickaxe",
    name: "Super Mushroom",
    description: "Boost click power with a Super Mushroom growth.",
    type: "click",
    baseCost: 25,
    effect: 1,
    level: 0,
    unlockWorld: 1,
  },
  {
    id: "fireflower-factory",
    name: "Fire Flower Factory",
    description: "Add +3 coins per click with fiery power.",
    type: "click",
    baseCost: 145,
    effect: 3,
    level: 0,
    unlockWorld: 1,
  },
  {
    id: "star-boost",
    name: "Star Boost",
    description: "Every click shines with star-powered bonus.",
    type: "click",
    baseCost: 520,
    effect: 10,
    level: 0,
    unlockWorld: 1,
  },
  {
    id: "yoshi-egg",
    name: "Yoshi Egg",
    description: "Hatch steady coin gains and speed up your kingdom.",
    type: "cps",
    baseCost: 80,
    effect: 1,
    level: 0,
    unlockWorld: 1,
  },
  {
    id: "toad-team",
    name: "Toad Team",
    description: "A team of Toad helpers collects coins automatically.",
    type: "cps",
    baseCost: 320,
    effect: 5,
    level: 0,
    unlockWorld: 1,
  },
  {
    id: "koopaling-couriers",
    name: "Koopa Couriers",
    description: "Fast Koopas run coins back to your castle each second.",
    type: "cps",
    baseCost: 980,
    effect: 20,
    level: 0,
    unlockWorld: 10,
  },
  {
    id: "rainbow-road",
    name: "Rainbow Road",
    description: "Open a warp to rainbow coins that flow every second.",
    type: "cps",
    baseCost: 2600,
    effect: 60,
    level: 0,
    unlockWorld: 20,
  },
  {
    id: "peach-palace",
    name: "Princess Peach Palace",
    description: "A golden palace that dramatically multiplies income.",
    type: "cps",
    baseCost: 7200,
    effect: 180,
    level: 0,
    unlockWorld: 35,
  },
  {
    id: "bowser-bunker",
    name: "Bowser Bunker",
    description: "Make coins erupt from Bowser's fortress.",
    type: "cps",
    baseCost: 21000,
    effect: 520,
    level: 0,
    unlockWorld: 50,
  },
  {
    id: "cloud-castle",
    name: "Cloud Castle",
    description: "Soaring coins appear when your click power reaches cloud heights.",
    type: "click",
    baseCost: 57000,
    effect: 32,
    level: 0,
    unlockWorld: 70,
  },
  {
    id: "luigi-lab",
    name: "Luigi Laboratory",
    description: "Luigi's inventions give extra coin output per click.",
    type: "click",
    baseCost: 128000,
    effect: 70,
    level: 0,
    unlockWorld: 90,
  },
  {
    id: "starroad-express",
    name: "Star Road Express",
    description: "A high-speed star train brings huge automatic gains.",
    type: "cps",
    baseCost: 340000,
    effect: 420,
    level: 0,
    unlockWorld: 110,
  },
];

function loadState() {
  const saved = localStorage.getItem("marioClickerState");
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      state = { ...state, ...parsed };
      if (!Array.isArray(state.upgrades)) state.upgrades = [];
    } catch (error) {
      console.warn("Could not load saved game.", error);
    }
  }
}

function saveState() {
  localStorage.setItem("marioClickerState", JSON.stringify(state));
}

function formatNumber(value) {
  return Math.floor(value).toLocaleString(undefined, { maximumFractionDigits: 0 });
}

function formatFloat(value) {
  return value.toFixed(2);
}

function getCost(upgrade) {
  return Math.floor(upgrade.baseCost * Math.pow(1.65, upgrade.level));
}

function getUpgradeLabel(upgrade) {
  return upgrade.type === "click"
    ? `+${upgrade.effect} click`
    : `+${upgrade.effect} / sec`;
}

function getCurrentWorld() {
  return worldDefinitions[state.currentWorld - 1];
}

function getNextWorld() {
  return worldDefinitions[state.currentWorld] || null;
}

function advanceWorlds() {
  let advanced = false;
  let nextWorld = getNextWorld();
  while (nextWorld && state.coins >= nextWorld.threshold) {
    state.currentWorld += 1;
    state.coins += Math.floor(35 + state.currentWorld * 2.5);
    advanced = true;
    nextWorld = getNextWorld();
  }

  const newMultiplier = 1 + (state.currentWorld - 1) * 0.03;
  if (state.worldMultiplier !== newMultiplier) {
    state.worldMultiplier = newMultiplier;
    advanced = true;
  }

  return advanced;
}

function updateStats() {
  coinCountEl.textContent = formatNumber(state.coins);
  coinsPerClickEl.textContent = formatNumber(state.coinsPerClick);
  coinsPerSecondEl.textContent = formatNumber(state.coinsPerSecond);
}

function updateWorldStatus() {
  const currentWorld = getCurrentWorld();
  const nextWorld = getNextWorld();
  const nextThreshold = nextWorld ? nextWorld.threshold : currentWorld.threshold;
  const progress = nextWorld ? Math.min(1, state.coins / nextThreshold) : 1;

  worldNameEl.textContent = `${state.currentWorld}. ${currentWorld.name}`;
  worldMultiplierEl.textContent = `x${formatFloat(state.worldMultiplier)}`;
  coinsToNextWorldEl.textContent = nextWorld
    ? formatNumber(Math.max(0, nextThreshold - state.coins))
    : "Max";
  worldProgressTextEl.textContent = `${Math.round(progress * 100)}%`;
  progressFillEl.style.width = `${progress * 100}%`;
}

function updateUpgrades() {
  upgradeGridEl.innerHTML = "";
  upgradeDefinitions.forEach((template) => {
    const existing = state.upgrades.find((item) => item.id === template.id);
    const upgrade = existing ? existing : { ...template };
    const unlocked = state.currentWorld >= upgrade.unlockWorld;
    const cost = getCost(upgrade);
    const button = document.createElement("button");
    button.className = "upgrade-button";
    button.textContent = unlocked ? `Buy ${formatNumber(cost)}` : `World ${upgrade.unlockWorld} unlock`;
    button.disabled = !unlocked || state.coins < cost;
    button.addEventListener("click", () => buyUpgrade(upgrade.id));

    const card = document.createElement("article");
    card.className = `upgrade-card${unlocked ? "" : " locked"}`;
    card.innerHTML = `
      <h3>${upgrade.name}</h3>
      <p>${upgrade.description}</p>
      <div class="upgrade-footer">
        <span class="upgrade-cost">Cost: ${formatNumber(cost)} coins</span>
        <span class="upgrade-output">${getUpgradeLabel(upgrade)}</span>
        <span class="upgrade-level">Level: ${upgrade.level}</span>
      </div>
    `;

    if (!unlocked) {
      const unlockText = document.createElement("span");
      unlockText.className = "unlock-text";
      unlockText.textContent = `Unlocks at world ${upgrade.unlockWorld}`;
      card.appendChild(unlockText);
    }

    card.querySelector(".upgrade-footer").appendChild(button);
    upgradeGridEl.appendChild(card);
  });
}

function recalculateState() {
  const clickPower = state.upgrades.reduce((sum, upgrade) => {
    if (upgrade.type === "click" && state.currentWorld >= upgrade.unlockWorld) {
      return sum + upgrade.effect * upgrade.level;
    }
    return sum;
  }, 0);

  const cpsPower = state.upgrades.reduce((sum, upgrade) => {
    if (upgrade.type === "cps" && state.currentWorld >= upgrade.unlockWorld) {
      return sum + upgrade.effect * upgrade.level;
    }
    return sum;
  }, 0);

  state.coinsPerClick = Math.max(1, (clickPower + 1) * state.worldMultiplier);
  state.coinsPerSecond = Math.max(0, cpsPower * state.worldMultiplier);
}

function buyUpgrade(id) {
  const upgrade = state.upgrades.find((item) => item.id === id);
  if (!upgrade || state.currentWorld < upgrade.unlockWorld) return;
  const cost = getCost(upgrade);
  if (state.coins < cost) return;
  state.coins -= cost;
  upgrade.level += 1;
  recalculateState();
  updateStats();
  updateUpgrades();
  saveState();
}

function addCoins(amount) {
  state.coins += amount;
  const advanced = advanceWorlds();
  recalculateState();
  updateStats();
  updateWorldStatus();
  if (advanced) updateUpgrades();
}

function setupInitialUpgrades() {
  state.upgrades = upgradeDefinitions.map((upgrade) => ({ ...upgrade }));
}

clickButton.addEventListener("click", () => {
  clickButton.classList.add("clicked");
  setTimeout(() => clickButton.classList.remove("clicked"), 120);
  addCoins(state.coinsPerClick);
  saveState();
});

function gameTick() {
  if (state.coinsPerSecond > 0) {
    addCoins(state.coinsPerSecond / 10);
  }
}

function startAutoCollection() {
  setInterval(gameTick, 100);
  setInterval(saveState, 5000);
}

function initializeGame() {
  loadState();
  if (!state.upgrades.length) {
    setupInitialUpgrades();
  } else {
    state.upgrades = upgradeDefinitions.map((upgrade) => {
      const saved = state.upgrades.find((item) => item.id === upgrade.id);
      return saved ? { ...upgrade, level: saved.level } : { ...upgrade };
    });
  }

  advanceWorlds();
  recalculateState();
  updateStats();
  updateWorldStatus();
  updateUpgrades();
  startAutoCollection();
}

initializeGame();
