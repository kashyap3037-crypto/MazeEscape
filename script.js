// 🏆 PROGRESS STATES (Separated by Difficulty)
let progress = {
    easy: { level: 1, max: 1 },
    medium: { level: 1, max: 1 },
    hard: { level: 1, max: 1 }
};
let difficultySetting = 'medium';

let totalScore = 0;
let coins = 0;
let timeElapsed = 0;
let movesCount = 0;
let timerRunning = false;
let timerInterval = null;

// Reward System States
let currentIcon = 'default';
let currentSkin = 'default';
let currentTheme = 'default';
let currentGoal = 'default';
let currentShopTab = 'icons';
let currentControlMode = 'swipe';

let inventory = {
    icons: ['default'],
    skins: ['default'],
    themes: ['default'],
    goals: ['default']
};

const shopItems = {
    icons: [
        { id: 'default', name: 'Original', price: 0, preview: '⚪', rarity: 'common' },
        { id: 'leaf', name: 'Leaf', price: 20, preview: '🍃', rarity: 'common' },
        { id: 'butterfly', name: 'Monarch', price: 40, preview: '🦋', rarity: 'common' },
        { id: 'sun', name: 'Sun Glow', price: 60, preview: '☀️', rarity: 'common' },
        { id: 'star', name: 'Star', price: 80, preview: '⭐', rarity: 'rare' },
        { id: 'spark', name: 'Spark', price: 100, preview: '✨', rarity: 'rare' },
        { id: 'robot', name: 'Mini Bot', price: 130, preview: '🤖', rarity: 'rare' },
        { id: 'ghost', name: 'Ghost', price: 160, preview: '👻', rarity: 'rare' },
        { id: 'diamond', name: 'Crystal', price: 200, preview: '💠', rarity: 'epic' },
        { id: 'fire', name: 'Fire Core', price: 240, preview: '🔥', rarity: 'epic' },
        { id: 'ice', name: 'Ice Spirit', price: 280, preview: '❄️', rarity: 'epic' },
        { id: 'alien', name: 'Alien Orb', price: 320, preview: '👽', rarity: 'epic' },
        { id: 'galaxy', name: 'Galaxy', price: 380, preview: '🌌', rarity: 'legendary' },
        { id: 'crown', name: 'Crown', price: 450, preview: '👑', rarity: 'legendary' },
        { id: 'phoenix', name: 'Phoenix', price: 500, preview: '🔥', rarity: 'legendary' }
    ],
    skins: [
        { id: 'default', name: 'Slate', price: 0, preview: '⬛', rarity: 'common', style: { color: '#334155' } },
        { id: 'blue', name: 'Ocean Blue', price: 20, preview: '🟦', rarity: 'common', style: { color: '#0ea5e9' } },
        { id: 'green', name: 'Forest Green', price: 40, preview: '🟩', rarity: 'common', style: { color: '#22c55e' } },
        { id: 'yellow', name: 'Sunlight', price: 60, preview: '🟨', rarity: 'common', style: { color: '#facc15' } },
        { id: 'red', name: 'Ruby', price: 80, preview: '🟥', rarity: 'rare', style: { color: '#ef4444' } },
        { id: 'purple', name: 'Violet', price: 100, preview: '🟪', rarity: 'rare', style: { color: '#a855f7' } },
        { id: 'cyan', name: 'Cyan Glow', price: 120, preview: '🔷', rarity: 'rare', style: { color: '#22d3ee', glow: true } },
        { id: 'lime', name: 'Lime Flash', price: 140, preview: '🟢', rarity: 'rare', style: { color: '#84cc16' } },
        { id: 'gold', name: 'Golden', price: 180, preview: '🟨', rarity: 'epic', style: { color: 'gold', glow: true } },
        { id: 'ice', name: 'Ice Crystal', price: 260, preview: '❄️', rarity: 'epic', style: { color: '#38bdf8', opacity: 0.7 } },
        { id: 'lava', name: 'Lava Flow', price: 300, preview: '🌋', rarity: 'epic', style: { gradient: ['#ef4444', '#f97316'] } },
        { id: 'galaxy', name: 'Galaxy', price: 360, preview: '🌌', rarity: 'legendary', style: { gradient: ['#4c1d95', '#a855f7'], glow: true } },
        { id: 'rainbow', name: 'Rainbow', price: 420, preview: '🌈', rarity: 'legendary', style: { gradient: ['red', 'orange', 'yellow', 'green', 'blue', 'purple'] } },
    ],
    themes: [
        { id: 'default', name: 'Midnight', price: 0, preview: '🌃', rarity: 'common' },
        { id: 'light', name: 'Light', price: 30, preview: '🌤️', rarity: 'common' },
        { id: 'mint', name: 'Mint', price: 60, preview: '🌿', rarity: 'common' },
        { id: 'sand', name: 'Sand', price: 80, preview: '🏜️', rarity: 'common' },
        { id: 'lava', name: 'Lava', price: 120, preview: '🌋', rarity: 'rare' },
        { id: 'fire', name: 'Fire', price: 150, preview: '🔥', rarity: 'rare' },
        { id: 'cyber', name: 'Cyber', price: 180, preview: '📡', rarity: 'rare' },
        { id: 'forest', name: 'Forest', price: 200, preview: '🌲', rarity: 'rare' },
        { id: 'ice', name: 'Ice', price: 240, preview: '🧊', rarity: 'epic' },
        { id: 'jungle', name: 'Jungle', price: 280, preview: '🌴', rarity: 'epic' },
        { id: 'desert', name: 'Desert', price: 320, preview: '🏜️', rarity: 'epic' },
        { id: 'paper', name: 'Paper', price: 350, preview: '📔', rarity: 'epic' },
        { id: 'space', name: 'Space', price: 400, preview: '🌌', rarity: 'legendary' },
        { id: 'fantasy', name: 'Fantasy', price: 450, preview: '🧙‍♂️', rarity: 'legendary' },
        { id: 'dream', name: 'Dream', price: 500, preview: '💭', rarity: 'legendary' }
    ],
    goals: [
        { id: 'default', name: 'Orb', price: 0, preview: '🟡', rarity: 'common' },
        { id: 'dot', name: 'Dot', price: 20, preview: '⚫', rarity: 'common' },
        { id: 'leaf', name: 'Leaf', price: 40, preview: '🍃', rarity: 'common' },
        { id: 'star', name: 'Star', price: 60, preview: '⭐', rarity: 'common' },
        { id: 'gift', name: 'Gift', price: 80, preview: '🎁', rarity: 'rare' },
        { id: 'flag', name: 'Flag', price: 100, preview: '🏁', rarity: 'rare' },
        { id: 'key', name: 'Key', price: 120, preview: '🔑', rarity: 'rare' },
        { id: 'gem', name: 'Gem', price: 150, preview: '💎', rarity: 'rare' },
        { id: 'portal', name: 'Portal', price: 200, preview: '🌀', rarity: 'epic' },
        { id: 'fire', name: 'Fire Goal', price: 240, preview: '🔥', rarity: 'epic' },
        { id: 'trophy', name: 'Trophy', price: 280, preview: '🏆', rarity: 'epic' },
        { id: 'crown', name: 'Crown', price: 320, preview: '👑', rarity: 'epic' },
        { id: 'galaxy', name: 'Galaxy Gate', price: 380, preview: '🌌', rarity: 'legendary' },
        { id: 'legend', name: 'Legend Relic', price: 450, preview: '🗿', rarity: 'legendary' },
        { id: 'divine', name: 'Divine Gate', price: 500, preview: '✨', rarity: 'legendary' }
    ]
};

let player = { x: 1, y: 1 };
let playerPath = [{ x: 1, y: 1 }];
// 🧩 Polyfill for roundRect (Older browsers/Mobile support)
if (!CanvasRenderingContext2D.prototype.roundRect) {
    CanvasRenderingContext2D.prototype.roundRect = function (x, y, w, h, r) {
        if (typeof r === 'undefined') r = 0;
        if (typeof r === 'number') r = { tl: r, tr: r, br: r, bl: r };
        else {
            var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
            for (var key in defaultRadius) r[key] = r[key] || defaultRadius[key];
        }
        this.beginPath();
        this.moveTo(x + r.tl, y);
        this.lineTo(x + w - r.tr, y);
        this.quadraticCurveTo(x + w, y, x + w, y + r.tr);
        this.lineTo(x + w, y + h - r.br);
        this.quadraticCurveTo(x + w, y + h, x + w - r.br, y + h);
        this.lineTo(x + r.bl, y + h);
        this.quadraticCurveTo(x, y + h, x, y + h - r.bl);
        this.lineTo(x, y + r.tl);
        this.quadraticCurveTo(x, y, x + r.tl, y);
        this.closePath();
        return this;
    };
}

const canvas = document.getElementById("mazeCanvas");
const ctx = canvas.getContext("2d");
const levelDisplay = document.getElementById("levelDisplay");
const scoreDisplay = document.getElementById("scoreDisplay");
const coinsDisplay = document.getElementById("coinsDisplay");
const timerDisplay = document.getElementById("timerDisplay");
const stepsDisplay = document.getElementById("stepsDisplay");

let rows = 15, cols = 15, size = 30;
let maze = [];
let visualPlayer = { x: 1, y: 1 }; // For smooth interpolation

const configs = {
    easy: { baseSize: 9, shortcuts: 0.15, seedShift: 1000 },
    medium: { baseSize: 17, shortcuts: 0.08, seedShift: 2000 },
    hard: { baseSize: 25, shortcuts: 0.03, seedShift: 3000 }
};

// 🎲 DETERMINISTIC SEEDED RANDOM (LCG)
let currentSeed = 1;
function seededRandom() {
    currentSeed = (currentSeed * 1664525 + 1013904223) % 4294967296;
    return currentSeed / 4294967296;
}

// 💾 LOCAL STORAGE
function saveGame() {
    const gameState = { progress, totalScore, coins, inventory, selections: { currentIcon, currentSkin, currentTheme, currentGoal, currentControlMode } };
    localStorage.setItem('mazeEscapeSave', JSON.stringify(gameState));
}

function loadGame() {
    const saved = localStorage.getItem('mazeEscapeSave');
    if (saved) {
        try {
            const data = JSON.parse(saved);
            progress = data.progress || progress;
            totalScore = data.totalScore || 0;
            coins = data.coins || 0;
            inventory = data.inventory || inventory;
            
            if (data.selections) {
                currentIcon = data.selections.currentIcon || 'default';
                currentSkin = data.selections.currentSkin || 'default';
                currentTheme = data.selections.currentTheme || 'default';
                currentGoal = data.selections.currentGoal || 'default';
                currentControlMode = data.selections.currentControlMode || 'swipe';
            }
            
            document.body.className = currentTheme === 'default' ? '' : `theme-${currentTheme}`;
            if (document.getElementById('controlModeSelect')) document.getElementById('controlModeSelect').value = currentControlMode;
            setControlMode(currentControlMode);
            updateStats(); renderShop();
        } catch(e) {
            console.error("Failed to load game:", e);
        }
    }
}

function setControlMode(mode) {
    currentControlMode = mode;
    const pad = document.getElementById('controlPad');
    const joystick = document.getElementById('joystickOuter');
    
    if (pad) {
        if (mode === 'buttons') pad.classList.add('active');
        else pad.classList.remove('active');
    }
    
    if (joystick) {
        if (mode === 'joystick') joystick.classList.remove('hidden');
        else joystick.classList.add('hidden');
    }
    saveGame();
}

// 🗺️ LEVEL MAP LOGIC
function openLevelMap() { document.getElementById('levelSelectOverlay').classList.remove('hidden'); renderLevelMap(); }
function closeLevelMap() { document.getElementById('levelSelectOverlay').classList.add('hidden'); }
function selectLevel(lvl) {
    if (lvl > progress[difficultySetting].max) return;
    progress[difficultySetting].level = lvl;
    closeLevelMap();
    startGame(true);
}

function renderLevelMap() {
    const container = document.getElementById('levelMapContainer');
    container.innerHTML = '';
    const currentMax = progress[difficultySetting].max;
    const currentLvl = progress[difficultySetting].level;
    for (let i = 1; i <= 100; i++) {
        const isUnlocked = i <= currentMax;
        const isCurrent = i === currentLvl;
        const node = document.createElement('div');
        node.className = `lvl-node ${isUnlocked ? 'unlocked' : 'locked'} ${isCurrent ? 'current' : ''}`;
        node.innerText = i;
        if (isUnlocked) node.onclick = () => selectLevel(i);
        container.appendChild(node);
    }
}

function setDifficulty(mode) {
    difficultySetting = mode;
    document.querySelectorAll('.diff-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.innerText.toLowerCase().includes(mode.substring(0, 3))) btn.classList.add('active');
    });
    updateStats();
    if (document.getElementById('levelSelectOverlay').offsetParent) renderLevelMap();
}

function openShop() { document.getElementById('shopOverlay').classList.remove('hidden'); renderShop(); updateStats(); }
function closeShop() { document.getElementById('shopOverlay').classList.add('hidden'); }
function switchTab(tab) {
    currentShopTab = tab;
    document.querySelectorAll('.shop-tabs button').forEach(btn => btn.classList.remove('active'));
    const t = document.getElementById({ icons: 'tabIcon', skins: 'tabSkin', themes: 'tabTheme', goals: 'tabGoal' }[tab]);
    if (t) t.classList.add('active');
    renderShop();
}

function buyItem(category, id, price) {
    if (coins >= price) {
        coins -= price; inventory[category].push(id);
        saveGame(); updateStats(); renderShop();
    } else { alert("Not enough coins! 🪙"); }
}

function equipItem(category, id) {
    if (category === 'icons') currentIcon = id;
    if (category === 'skins') currentSkin = id;
    if (category === 'themes') { currentTheme = id; document.body.className = id === 'default' ? '' : `theme-${id}`; }
    if (category === 'goals') currentGoal = id;
    saveGame(); updateStats(); renderShop();
    if (!document.getElementById('gameContainer').classList.contains('hidden')) drawMaze();
}

function renderShop() {
    const container = document.getElementById('shopItems');
    if (!container) return; container.innerHTML = '';
    shopItems[currentShopTab].forEach(item => {
        const isOwned = inventory[currentShopTab].includes(item.id);
        const isEquipped = (currentShopTab === 'icons' && currentIcon === item.id) || (currentShopTab === 'skins' && currentSkin === item.id) || (currentShopTab === 'themes' && currentTheme === item.id) || (currentShopTab === 'goals' && currentGoal === item.id);
        const itemEl = document.createElement('div'); itemEl.className = `shop-item ${isOwned ? 'owned' : ''} ${isEquipped ? 'equipped' : ''} ${item.rarity}`;
        itemEl.innerHTML = `<span style="font-size: 2rem; margin-bottom: 5px;">${item.preview}</span><div class="shop-item-name" style="font-size: 0.8rem; font-weight: 800;">${item.name}</div>${!isOwned ? `<div class="shop-item-price" style="font-size: 0.7rem; color: #fbbf24;">🪙 ${item.price}</div>` : ''}<button onclick="${!isOwned ? `buyItem('${currentShopTab}', '${item.id}', ${item.price})` : `equipItem('${currentShopTab}', '${item.id}')`}" style="margin-top: 10px; padding: 10px; font-size: 0.7rem; border-radius: 12px; height: auto;">${!isOwned ? 'Buy' : (isEquipped ? 'Equipped' : 'Equip')}</button>`;
        container.appendChild(itemEl);
    });
}

function goHome() { 
    stopTimer(); 
    document.querySelectorAll('.overlay').forEach(ov => ov.classList.add('hidden')); 
    document.getElementById('menuOverlay').classList.remove('hidden'); 
    updateStats(); 
}

function startGame() {
    document.querySelectorAll('.overlay').forEach(ov => ov.classList.add('hidden'));
    document.getElementById('gameContainer').classList.remove('hidden');
    generateMaze();
}

function updateStats() {
    const curLevel = progress[difficultySetting].level;
    if (levelDisplay) levelDisplay.innerText = curLevel; if (scoreDisplay) scoreDisplay.innerText = totalScore.toLocaleString(); if (coinsDisplay) coinsDisplay.innerText = coins.toLocaleString(); if (stepsDisplay) stepsDisplay.innerText = movesCount;
    const mc = document.getElementById('menuCoins'); if (mc) mc.innerText = coins.toLocaleString();
    const sc = document.getElementById('shopCoins'); if (sc) sc.innerText = coins.toLocaleString();
}

function startTimer() { if (timerRunning) return; timerRunning = true; timerInterval = setInterval(() => { timeElapsed++; let mins = String(Math.floor(timeElapsed / 60)).padStart(2, '0'); let secs = String(timeElapsed % 60).padStart(2, '0'); if (timerDisplay) timerDisplay.innerText = `${mins}:${secs}`; }, 1000); }
function stopTimer() { clearInterval(timerInterval); timerInterval = null; timerRunning = false; }
function restartLevel() { stopTimer(); timeElapsed = 0; movesCount = 0; player = { x: 1, y: 1 }; visualPlayer = { x: 1, y: 1 }; playerPath = [{ x: 1, y: 1 }]; if (timerDisplay) timerDisplay.innerText = "00:00"; updateStats(); drawMaze(); }
function prevLevel() { if (progress[difficultySetting].level > 1) { progress[difficultySetting].level--; generateMaze(); } }

function generateMaze() {
    stopTimer(); timeElapsed = 0; movesCount = 0; if (timerDisplay) timerDisplay.innerText = "00:00";
    const curLevel = progress[difficultySetting].level;
    const config = configs[difficultySetting];
    currentSeed = (curLevel * 1000) + config.seedShift; 

    rows = config.baseSize + Math.floor((curLevel - 1) * 0.5); 
    cols = config.baseSize + Math.floor((curLevel - 1) * 0.5); 
    if (rows % 2 === 0) rows++; if (cols % 2 === 0) cols++; 
    rows = Math.min(rows, 41); cols = Math.min(cols, 41);

    const cw = document.getElementById('gameContainer').clientWidth - 6; 
    // MCS: Maximizing for a "Brilliant Large" look on mobile
    const mcs = Math.min(cw, 600, window.innerHeight * 0.48); 
    size = Math.floor(mcs / Math.max(rows, cols)); 
    if (size < 11) size = 11; 
    
    canvas.width = cols * size; 
    canvas.height = rows * size;
    maze = Array.from({ length: rows }, () => Array(cols).fill(1));

    // 🏗️ ITERATIVE DFS (No recursion limits)
    const stack = [{x: 1, y: 1}];
    maze[1][1] = 0;
    
    while (stack.length > 0) {
        const curr = stack[stack.length - 1];
        const neighbors = [];
        const ds = [[0, 2], [0, -2], [2, 0], [-2, 0]];
        
        for (const [dx, dy] of ds) {
            const nx = curr.x + dx, ny = curr.y + dy;
            if (nx > 0 && nx < rows - 1 && ny > 0 && ny < cols - 1 && maze[nx][ny] === 1) {
                neighbors.push({x: nx, y: ny, dx, dy});
            }
        }
        
        if (neighbors.length > 0) {
            const next = neighbors[Math.floor(seededRandom() * neighbors.length)];
            maze[next.x][next.y] = 0;
            maze[curr.x + next.dx/2][curr.y + next.dy/2] = 0;
            stack.push(next);
        } else {
            stack.pop();
        }
    }

    // Add some shortcuts for variety
    for (let i = 1; i < rows - 1; i++) { 
        for (let j = 1; j < cols - 1; j++) { 
            if (maze[i][j] === 1 && seededRandom() < config.shortcuts) maze[i][j] = 0; 
        } 
    }
    
    // Ensure start/end are cleared
    maze[1][1] = 0; 
    maze[rows - 2][cols - 2] = 0; 

    player = { x: 1, y: 1 }; 
    visualPlayer = { x: 1, y: 1 }; 
    playerPath = [{ x: 1, y: 1 }]; 
    updateStats(); 
    drawMaze();
}

function handleMove(nx, ny) {
    if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && maze[nx][ny] === 0) {
        startTimer();
        if (playerPath.length > 1 && playerPath[playerPath.length - 2].x === nx && playerPath[playerPath.length - 2].y === ny) {
            playerPath.pop();
        } else {
            playerPath.push({ x: nx, y: ny });
        }
        player.x = nx;
        player.y = ny;
        movesCount++;
        updateStats();
        checkWin();
        return true;
    }
    return false;
}

function movePlayer(dx, dy) {
    return handleMove(player.x + dx, player.y + dy);
}

function moveUntilWall(dx, dy) {
    let moved = false;
    let keepMoving = true;

    while (keepMoving) {
        let nx = player.x + dx;
        let ny = player.y + dy;

        if (nx >= 0 && ny >= 0 && nx < rows && ny < cols && maze[nx][ny] === 0) {
            handleMove(nx, ny);
            moved = true;

            // Junction detection: Stop if there are other ways to go
            let availableWays = 0;
            const directions = [[0, 1], [0, -1], [1, 0], [-1, 0]];
            for (let [idx, idy] of directions) {
                let tx = player.x + idx;
                let ty = player.y + idy;
                if (tx >= 0 && ty >= 0 && tx < rows && ty < cols && maze[tx][ty] === 0) {
                    availableWays++;
                }
            }

            // If it's a junction (more than 2 ways: the way we came and at least 2 more)
            // or if it's a dead end, we stop.
            if (availableWays > 2) keepMoving = false;
        } else {
            keepMoving = false;
        }
    }
    return moved;
}

// Pre-calculated style objects for performance with better brightness
const pathStyles = { 
    default: { path: '#5eead4', dot: '#2dd4bf' }, 
    leaf: { path: '#4ade80', dot: '#22c55e' }, 
    butterfly: { path: '#f472b6', dot: '#ec4899' }, 
    sun: { path: '#fde047', dot: '#eab308' }, 
    star: { path: '#fcd34d', dot: '#fbbf24' }, 
    spark: { path: '#ffffff', dot: '#cbd5e1' }, 
    robot: { path: '#94a3b8', dot: '#475569' }, 
    ghost: { path: 'rgba(255, 255, 255, 0.8)', dot: 'rgba(255, 255, 255, 0.4)' }, 
    diamond: { path: '#22d3ee', dot: '#0891b2' }, 
    fire: { path: '#f87171', dot: '#dc2626' }, 
    ice: { path: '#7dd3fc', dot: '#0ea5e9' }, 
    alien: { path: '#4ade80', dot: '#16a34a' }, 
    galaxy: { path: '#818cf8', dot: '#3730a3' }, 
    crown: { path: '#facc15', dot: '#ca8a04' }, 
    phoenix: { path: '#ef4444', dot: '#991b1b' } 
};

function drawMaze() {
    if (!canvas || !ctx || !maze || maze.length === 0) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    const bgs = { 
        default: '#0f172a', light: '#f8fafc', mint: '#f0fdf4', sand: '#fef3c7', 
        lava: '#1a0b0b', fire: '#1a1110', cyber: '#020617', forest: '#064e3b', 
        ice: '#f0f9ff', jungle: '#022c22', desert: '#451a03', paper: '#fffbeb', 
        space: '#010409', fantasy: '#2e1065', dream: '#fdf4ff' 
    }; 
    
    ctx.fillStyle = bgs[currentTheme] || bgs.default; 
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 1. Draw Walls
    const skin = shopItems.skins.find(s => s.id === currentSkin)?.style;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (maze[i][j] === 1) {
                const x = j * size, y = i * size;
                ctx.beginPath();
                if (skin?.gradient) {
                    let grad = ctx.createLinearGradient(x, y, x + size, y + size);
                    skin.gradient.forEach((c, idx) => grad.addColorStop(idx / (skin.gradient.length - 1), c));
                    ctx.fillStyle = grad;
                } else { 
                    ctx.fillStyle = skin?.color || "#334155"; 
                }
                
                if (skin?.glow) { 
                    ctx.shadowColor = ctx.fillStyle; 
                    ctx.shadowBlur = 10; 
                } else {
                    ctx.shadowBlur = 0;
                }
                
                if (skin?.opacity) ctx.globalAlpha = skin.opacity;
                
                // Use a standard rect if roundRect fails or for better performance
                ctx.roundRect(x + 1, y + 1, size - 2, size - 2, Math.max(1, size * 0.15));
                ctx.fill();
                ctx.shadowBlur = 0; 
                ctx.globalAlpha = 1;
            }
        }
    }

    // 2. Draw Solid Path
    const st = pathStyles[currentIcon] || pathStyles.default; 
    if (playerPath.length > 1) { 
        ctx.beginPath(); 
        ctx.lineJoin = "round"; 
        ctx.lineCap = "round"; 
        ctx.strokeStyle = st.path; 
        ctx.lineWidth = size * 0.5; 
        
        ctx.moveTo(playerPath[0].y * size + size / 2, playerPath[0].x * size + size / 2); 
        for (let k = 1; k < playerPath.length; k++) {
            ctx.lineTo(playerPath[k].y * size + size / 2, playerPath[k].x * size + size / 2); 
        }
        ctx.stroke(); 

        // Draw path dots
        const pulse = Math.abs(Math.sin(Date.now() / 400)) * 0.12;
        ctx.fillStyle = st.dot; 
        for (let n of playerPath) { 
            ctx.beginPath(); 
            ctx.arc(n.y * size + size / 2, n.x * size + size / 2, Math.max(1, size * (0.09 + pulse)), 0, Math.PI * 2); 
            ctx.fill(); 
        } 
    }

    // 3. Draw Goal
    const gx = (cols - 2) * size, gy = (rows - 2) * size; 
    const gi = shopItems.goals.find(it => it.id === currentGoal); 
    const ge = gi ? gi.preview : '🟡'; 
    ctx.textAlign = "center"; 
    ctx.textBaseline = "middle"; 
    let p = 1 + Math.sin(Date.now() / 250) * 0.08; 
    ctx.font = `${size * 0.7 * p}px Arial`; 
    ctx.fillText(ge, gx + size / 2, gy + size / 2);

    // 5. Draw Player Icon
    const ii = shopItems.icons.find(it => it.id === currentIcon); 
    const pe = ii ? ii.preview : '⚪'; 
    const px = visualPlayer.y * size, py = visualPlayer.x * size; 
    
    // Icon Shadow for better visibility
    ctx.shadowColor = 'rgba(0,0,0,0.5)';
    ctx.shadowBlur = 5;
    ctx.font = `${Math.max(12, size * 0.85)}px Arial`; 
    ctx.fillText(pe, px + size / 2, py + size / 2);
    ctx.shadowBlur = 0;
}

function nextLevel() {
    document.getElementById('rewardOverlay').classList.add('hidden');
    progress[difficultySetting].level++;
    if (progress[difficultySetting].level > progress[difficultySetting].max) progress[difficultySetting].max = progress[difficultySetting].level;
    saveGame();
    generateMaze();
}

function checkWin() {
    if (player.x === rows - 2 && player.y === cols - 2) {
        stopTimer();
        const curLevel = progress[difficultySetting].level;
        let it = (rows + cols) * 0.8, is = (rows + cols) * 1.35, stars = (timeElapsed <= it && movesCount <= is) ? 3 : (timeElapsed <= it * 1.8 ? 2 : 1);
        let bw = 10 + Math.floor(curLevel / 2), sb = (timeElapsed <= it) ? 5 : 0, stb = (movesCount <= is) ? 5 : 0, tc = bw + sb + stb;
        coins += tc; totalScore += (curLevel * 1000) + (stars * 500);
        if (curLevel === progress[difficultySetting].max) progress[difficultySetting].max = curLevel + 1;
        saveGame();
        const rs = document.getElementById('rewardStars'); if (rs) rs.innerText = "⭐".repeat(stars) + "☆".repeat(3 - stars);
        document.getElementById('rewardBaseWin').innerText = `🪙 ${bw}`; document.getElementById('rewardSpeedBonus').innerText = `🪙 ${sb}`; document.getElementById('rewardStepBonus').innerText = `🪙 ${stb}`; document.getElementById('rewardCoins').innerText = `🪙 ${tc}`;
        document.getElementById('rewardOverlay').classList.remove('hidden'); updateStats();
    }
}

// 📱 IMPROVED FULL-SCREEN SWIPE CONTROLS
let startX = 0, startY = 0;
const minDistance = 30; // Minimum swipe distance in px

document.addEventListener("touchstart", (e) => {
    if (document.getElementById('gameContainer').classList.contains('hidden')) return;
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}, { passive: false });

document.addEventListener("touchmove", (e) => {
    const isGameActive = !document.getElementById('gameContainer').classList.contains('hidden');
    const anyOverlayOpen = !document.getElementById('menuOverlay').classList.contains('hidden') || 
                          !document.getElementById('shopOverlay').classList.contains('hidden') ||
                          !document.getElementById('levelSelectOverlay').classList.contains('hidden') ||
                          !document.getElementById('rewardOverlay').classList.contains('hidden');

    if (isGameActive && !anyOverlayOpen) {
        e.preventDefault(); // Only block scrolling when actually playing
    }
}, { passive: false });

document.addEventListener("touchend", (e) => {
    if (currentControlMode !== 'swipe') return;
    const isGameVisible = !document.getElementById('gameContainer').classList.contains('hidden');
    const isMenuOpen = !document.getElementById('menuOverlay').classList.contains('hidden');
    const isShopOpen = !document.getElementById('shopOverlay').classList.contains('hidden');
    const isMapOpen = !document.getElementById('levelSelectOverlay').classList.contains('hidden');
    const isRewardOpen = !document.getElementById('rewardOverlay').classList.contains('hidden');

    if (!isGameVisible || isMenuOpen || isShopOpen || isMapOpen || isRewardOpen) return;

    let dx = e.changedTouches[0].clientX - startX;
    let dy = e.changedTouches[0].clientY - startY;
    let absX = Math.abs(dx);
    let absY = Math.abs(dy);

    if (Math.max(absX, absY) > minDistance) {
        if (absX > absY) {
            if (dx > 0) movePlayer(0, 1);   
            else movePlayer(0, -1);         
        } else {
            if (dy > 0) movePlayer(1, 0);  
            else movePlayer(-1, 0);         
        }
    }
}, { passive: false });

// 🕹️ JOYSTICK LOGIC
const stick = document.getElementById('joystickStick');
const base = document.getElementById('joystickBase');
let joyActive = false, joyX = 0, joyY = 0, baseR = 65;

if (base && stick) {
    base.addEventListener('touchstart', (e) => { 
        if (currentControlMode !== 'joystick') return;
        joyActive = true; 
    }, { passive: false });

    document.addEventListener('touchmove', (e) => {
        if (!joyActive || currentControlMode !== 'joystick') return;
        const rect = base.getBoundingClientRect();
        const centerX = rect.left + baseR;
        const centerY = rect.top + baseR;
        const touch = e.touches[0];
        
        let dx = touch.clientX - centerX;
        let dy = touch.clientY - centerY;
        const dist = Math.sqrt(dx*dx + dy*dy);
        const maxD = baseR - 20;

        if (dist > maxD) { dx *= maxD/dist; dy *= maxD/dist; }
        
        stick.style.transform = `translate(${dx}px, ${dy}px)`;

        // Trigger move if distance exceeded small threshold
        if (dist > 30) {
            const absX = Math.abs(dx), absY = Math.abs(dy);
            if (absX > absY) {
                if (dx > 30) movePlayer(0, 1);
                else if (dx < -30) movePlayer(0, -1);
            } else {
                if (dy > 30) movePlayer(1, 0);
                else if (dy < -30) movePlayer(-1, 0);
            }
            // Temporarily stop move detection until stick returns center or moves far enough again
            joyActive = false; // Prevents spamming moves in one drag
        }
    }, { passive: false });

    document.addEventListener('touchend', () => {
        joyActive = false;
        stick.style.transform = `translate(0px, 0px)`;
    });
}

document.addEventListener("keydown", (e) => {
    if (!document.getElementById('menuOverlay').classList.contains('hidden') || !document.getElementById('rewardOverlay').classList.contains('hidden') || !document.getElementById('shopOverlay').classList.contains('hidden') || !document.getElementById('levelSelectOverlay').classList.contains('hidden')) return;
    if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) { e.preventDefault(); }
    if (e.key === "ArrowUp") movePlayer(-1, 0);
    else if (e.key === "ArrowDown") movePlayer(1, 0);
    else if (e.key === "ArrowLeft") movePlayer(0, -1);
    else if (e.key === "ArrowRight") movePlayer(0, 1);
});

// Smoothing Visuals
function updateVisuals() {
    const smoothFactor = 0.22; // Slightly more responsive
    visualPlayer.x += (player.x - visualPlayer.x) * smoothFactor;
    visualPlayer.y += (player.y - visualPlayer.y) * smoothFactor;
    
    // Snapping to avoid infinite tiny updates
    if (Math.abs(player.x - visualPlayer.x) < 0.001) visualPlayer.x = player.x;
    if (Math.abs(player.y - visualPlayer.y) < 0.001) visualPlayer.y = player.y;
}

function animate() { 
    updateVisuals();
    drawMaze(); 
    requestAnimationFrame(animate); 
}

// Start animation loop after complete initialization


let resizeTimeout;
window.addEventListener('resize', () => { 
    if (document.getElementById('gameContainer').classList.contains('hidden')) return;
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
        // Only update size and redraw, don't re-generate the maze structure
        const cw = document.getElementById('gameContainer').clientWidth - 40; 
        const mcs = Math.min(cw, 600, window.innerHeight * 0.65);
        size = Math.floor(mcs / Math.max(rows, cols)); 
        canvas.width = cols * size; 
        canvas.height = rows * size;
        drawMaze();
    }, 200);
});
function goHome() {
    // Hide all overlays
    document.querySelectorAll('.overlay').forEach(ov => ov.classList.add('hidden'));
    // Hide game container
    document.getElementById('gameContainer').classList.add('hidden');
    // Show main menu
    document.getElementById('homepageOverlay').classList.remove('hidden');
    stopTimer();
}

loadGame();
switchTab('icons'); renderShop(); updateStats();
animate();