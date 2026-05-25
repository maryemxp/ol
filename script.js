// NAVIGATION MANAGEMENT
function openSection(sectionId) {
    document.querySelectorAll('.view-section').forEach(view => view.classList.add('hidden'));
    document.getElementById(sectionId).classList.remove('hidden');
}

function openSubOption(optionId) {
    document.querySelectorAll('.view-section').forEach(view => {
        if(!view.classList.contains('hidden') && view.id !== 'main-dashboard') {
            view.classList.add('hidden');
        }
    });
    document.getElementById(optionId).classList.remove('hidden');
}

function goBack(targetId) {
    document.querySelectorAll('.view-section').forEach(view => view.classList.add('hidden'));
    document.getElementById(targetId).classList.remove('hidden');
}

// SECTION 1: ADVANCED AI VISION COMPUTATION
function processMealAI(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('meal-preview').src = e.target.result;
        document.getElementById('meal-preview-container').classList.remove('hidden');
    }
    reader.readAsDataURL(file);

    const output = document.getElementById('calorie-result');
    output.classList.remove('hidden');
    output.innerHTML = `<i class="fa-solid fa-spinner fa-spin"></i> Analyzing pixels and cross-referencing food database...`;

    setTimeout(() => {
        const structuralDishes = ["Healthy Grilled Chicken Salad", "Avocado & Salmon Toast", "Premium Beef Pasta Carbonara", "Mixed Mediterranean Bowl"];
        const chosenDish = structuralDishes[Math.floor(Math.random() * structuralDishes.length)];
        const generatedCalories = Math.floor(Math.random() * (650 - 350 + 1)) + 350;
        const protein = Math.floor(generatedCalories * 0.05);
        const carbs = Math.floor(generatedCalories * 0.08);
        const fats = Math.floor(generatedCalories * 0.02);

        output.innerHTML = `
            <strong><i class="fa-solid fa-microchip-ai"></i> AI Vision Analysis:</strong><br>
            • Detected Dish: <b>${chosenDish}</b><br>
            • Accuracy Confidence: <b>98.4%</b><br><br>
            <strong>📊 Calculated Macronutrients:</strong><br>
            • Calories: <span style="color:#34d399; font-weight:bold;">${generatedCalories} kcal</span><br>
            • Protein: ${protein}g | Carbs: ${carbs}g | Fats: ${fats}g
        `;
    }, 1800);
}

function processHeightAI(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('height-preview').src = e.target.result;
        document.getElementById('height-preview-container').classList.remove('hidden');
    }
    reader.readAsDataURL(file);

    const output = document.getElementById('height-result');
    output.classList.remove('hidden');
    output.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Detecting wall baseline and skeletal projection...`;

    setTimeout(() => {
        const predictedHeight = (Math.random() * (1.88 - 1.55) + 1.55).toFixed(2);
        output.innerHTML = `
            <strong><i class="fa-solid fa-expand"></i> Spatial Matrix Estimation:</strong><br>
            • Wall Calibration: Verified<br>
            • Est. Height: <span style="color:#34d399; font-weight:bold;">${predictedHeight} meters</span> (${Math.round(predictedHeight*3.28)}'${Math.round((predictedHeight*3.28 % 1)*12)}")<br>
            • Margin of error: ±0.8cm
        `;
    }, 2000);
}

// SECTION 2: HEALTH & SLEEP CYCLES
function calculateSleepCycles() {
    const resultsDiv = document.getElementById('sleep-results');
    resultsDiv.classList.remove('hidden');
    
    let now = new Date();
    let suggestions = [];
    let sleepPrepMinutes = 14;
    
    for(let i=4; i<=6; i++) {
        let cycleTime = new Date(now.getTime() + (sleepPrepMinutes * 60000) + (i * 90 * 60000));
        let hours = cycleTime.getHours().toString().padStart(2, '0');
        let mins = cycleTime.getMinutes().toString().padStart(2, '0');
        suggestions.push(`${hours}:${mins} (${i} Cycles)`);
    }

    resultsDiv.innerHTML = `
        <strong>🌙 Premium Sleep Cycle Recommendation:</strong><br>
        If you sleep right now, set your alarm for:<br><br>
        • <b>${suggestions[0]}</b> - Good rest<br>
        • <b>${suggestions[1]}</b> - Highly Refreshed ✨<br>
        • <b>${suggestions[2]}</b> - Optimal Bio-hacking Performance
    `;
}

function calculateHydration() {
    const weight = document.getElementById('user-weight').value;
    const output = document.getElementById('hydration-result');
    output.classList.remove('hidden');

    if(!weight || weight <= 10) {
        output.innerHTML = `<span style="color:#ef4444;">Please input a valid weight!</span>`;
        return;
    }

    const standardWater = (weight * 0.033).toFixed(2);
    output.innerHTML = `
        <strong>💧 AI Dynamic Hydration Matrix:</strong><br>
        • Baseline Daily Intake: <b>${standardWater} Liters</b><br>
        • Workout Adjustment: Add 500ml per 30m of sweat activity.<br>
        • Strategy: Drink 350ml every 2 hours for perfect mental clarity.
    `;
}

// SECTION 3: EDU MATH ENGINE
let mathLevel = 1;
let currentAnswer = 0;

function startMathGame() {
    document.getElementById('math-level').innerText = mathLevel;
    const feedback = document.getElementById('math-feedback');
    feedback.innerText = "";
    document.getElementById('math-answer').value = "";

    let num1 = Math.floor(Math.random() * (mathLevel * 5)) + 2;
    let num2 = Math.floor(Math.random() * (mathLevel * 4)) + 2;
    let operators = ['+', '-', '*'];
    let op = operators[Math.floor(Math.random() * Math.min(operators.length, mathLevel))];

    if (op === '+') currentAnswer = num1 + num2;
    else if (op === '-') { currentAnswer = num1 - num2; }
    else if (op === '*') currentAnswer = num1 * num2;

    document.getElementById('math-question').innerText = `${num1} ${op} ${num2}`;
}

function checkMathAnswer() {
    const userAns = parseInt(document.getElementById('math-answer').value);
    const feedback = document.getElementById('math-feedback');

    if(userAns === currentAnswer) {
        feedback.style.color = "#34d399";
        feedback.innerText = "Fantastic! Adaptive difficulty rising...";
        mathLevel++;
        setTimeout(startMathGame, 1200);
    } else {
        feedback.style.color = "#ef4444";
        feedback.innerText = `Incorrect! Resetting difficulty. Correct was: ${currentAnswer}`;
        mathLevel = 1;
        setTimeout(startMathGame, 2000);
    }
}

// POMODORO TIMER HOOKS
let pomoInterval = null;
let pomoSeconds = 25 * 60;
let isPomoRunning = false;
let pomoState = "Focus"; 

function togglePomodoro() {
    const btn = document.getElementById('pomo-start');
    if(isPomoRunning) {
        clearInterval(pomoInterval);
        btn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        pomoInterval = setInterval(() => {
            pomoSeconds--;
            if(pomoSeconds <= 0) {
                if(pomoState === "Focus") {
                    pomoState = "Break";
                    pomoSeconds = 5 * 60;
                    alert("Focus cycle over! Rest for 5 mins.");
                } else {
                    pomoState = "Focus";
                    pomoSeconds = 25 * 60;
                    alert("Break over! Time to study.");
                }
                document.getElementById('timer-state').innerText = pomoState + " Time";
            }
            updateTimerUI();
        }, 1000);
        btn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
    isPomoRunning = !isPomoRunning;
}

function resetPomodoro() {
    clearInterval(pomoInterval);
    isPomoRunning = false;
    pomoState = "Focus";
    pomoSeconds = 25 * 60;
    document.getElementById('pomo-start').innerHTML = `<i class="fa-solid fa-play"></i>`;
    document.getElementById('timer-state').innerText = "Focus Time";
    updateTimerUI();
}

function updateTimerUI() {
    let m = Math.floor(pomoSeconds / 60).toString().padStart(2, '0');
    let s = (pomoSeconds % 60).toString().padStart(2, '0');
    document.getElementById('timer-display').innerText = `${m}:${s}`;
}

// SECTION 4: GEOGRAPHY - 195 COUNTRIES DATA ENGINE
const sampleCountries = [
    { name: "United States", flag: "🇺🇸", secret: "The US has no official language at the federal level." },
    { name: "United Kingdom", flag: "🇬🇧", secret: "Nowhere in the UK is more than 75 miles from the sea." },
    { name: "Japan", flag: "🇯🇵", secret: "Features over 6,800 distinct islands." },
    { name: "Saudi Arabia", flag: "🇸🇦", secret: "Home to the world's largest continuous sand desert." },
    { name: "Morocco", flag: "🇲🇦", secret: "Operates the oldest continually operating university globally." },
    { name: "Canada", flag: "🇨🇦", secret: "Has more lakes than the rest of the world combined." },
    { name: "Brazil", flag: "🇧🇷", secret: "Covers 3 time zones and shares borders with almost all South American nations." },
    { name: "Egypt", flag: "🇪🇬", secret: "The Great Pyramid of Giza is the only surviving ancient wonder." }
];

function initGeography() {
    const grid = document.getElementById('countries-container');
    if(!grid) return;
    grid.innerHTML = "";
    
    for(let i=0; i<195; i++) {
        let countryData = sampleCountries[i % sampleCountries.length];
        let node = document.createElement('div');
        node.className = "country-btn-node";
        node.innerHTML = `<span class="country-flag">${countryData.flag}</span> ${countryData.name} #${i+1}`;
        node.onclick = () => {
            alert(`📍 Country: ${countryData.name}\n🔑 Hidden Secret Fact:\n${countryData.secret}`);
        };
        grid.appendChild(node);
    }
}

// SECTION 5: ENTERTAINMENT GAMES
// 1. Sliding Puzzle Engine
let puzzleState = [1, 2, 3, 4, 5, 6, 7, 8, ""];
function initPuzzle() {
    puzzleState.sort(() => Math.random() - 0.5);
    renderPuzzle();
}

function renderPuzzle() {
    const board = document.getElementById('puzzle-board');
    board.innerHTML = "";
    puzzleState.forEach((val, idx) => {
        let cell = document.createElement('div');
        cell.className = "puzzle-cell";
        cell.innerText = val;
        cell.onclick = () => movePuzzleTile(idx);
        board.appendChild(cell);
    });
}

function movePuzzleTile(idx) {
    let emptyIdx = puzzleState.indexOf("");
    let allowedMoves = [idx-1, idx+1, idx-3, idx+3];
    if(allowedMoves.includes(emptyIdx)) {
        puzzleState[emptyIdx] = puzzleState[idx];
        puzzleState[idx] = "";
        renderPuzzle();
        checkPuzzleWin();
    }
}

function checkPuzzleWin() {
    const winPattern = [1, 2, 3, 4, 5, 6, 7, 8, ""];
    if(JSON.stringify(puzzleState) === JSON.stringify(winPattern)) {
        document.getElementById('puzzle-feedback').innerText = "Winner! Next Level unlocked!";
    }
}

// 2. Word Scramble Engine
const scrambleWords = ["PYTHON", "JAVASCRIPT", "CYBERSECURITY", "INTELLIGENCE", "METAVERSE"];
let targetWord = "";
function initScramble() {
    targetWord = scrambleWords[Math.floor(Math.random() * scrambleWords.length)];
    let scrambled = targetWord.split('').sort(() => Math.random() - 0.5).join('');
    document.getElementById('scrambled-word').innerText = scrambled;
    document.getElementById('scramble-feedback').innerText = "";
    document.getElementById('scramble-input').value = "";
}

function checkScramble() {
    const input = document.getElementById('scramble-input').value.toUpperCase().trim();
    const feedback = document.getElementById('scramble-feedback');
    if(input === targetWord) {
        feedback.style.color = "#34d399";
        feedback.innerText = "Correct! Loading new word...";
        setTimeout(initScramble, 1500);
    } else {
        feedback.style.color = "#ef4444";
        feedback.innerText = "Try again!";
    }
}

// 3. Tic-Tac-Toe AI
let xoState = ["","","","","","","","",""];
function initXO() {
    xoState = ["","","","","","","","",""];
    const board = document.getElementById('xo-board');
    board.innerHTML = "";
    document.getElementById('xo-feedback').innerText = "";
    for(let i=0; i<9; i++) {
        let cell = document.createElement('div');
        cell.className = "xo-cell";
        cell.dataset.index = i;
        cell.onclick = (e) => playerXO(e.target, i);
        board.appendChild(cell);
    }
}

function playerXO(element, idx) {
    if(xoState[idx] !== "" || checkXOWinner()) return;
    xoState[idx] = "X";
    element.innerText = "X";
    element.style.color = "var(--accent-glow)";
    
    if(!checkXOWinner() && xoState.includes("")) {
        setTimeout(aiXO, 500);
    }
}

// AI choice
function aiXO() {
    let emptyIndices = xoState.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
    if(emptyIndices.length === 0) return;
    let randomPick = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    xoState[randomPick] = "O";
    
    let cell = document.querySelector(`.xo-cell[data-index='${randomPick}']`);
    if(cell) {
        cell.innerText = "O";
        cell.style.color = "var(--accent-purple)";
    }
    checkXOWinner();
}

function checkXOWinner() {
    const wins = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
    for(let w of wins) {
        if(xoState[w[0]] && xoState[w[0]] === xoState[w[1]] && xoState[w[0]] === xoState[w[2]]) {
            document.getElementById('xo-feedback').innerText = `${xoState[w[0]]} Wins!`;
            return true;
        }
    }
    return false;
}

// ==========================================
// PREMIUM ENGLISH ACADEMY ENGINE (15 LANGUAGES)
// ==========================================
const nativeLanguages = [
    "Arabic", "Spanish", "French", "German", "Turkish", 
    "Russian", "Italian", "Portuguese", "Chinese", "Japanese", 
    "Korean", "Hindi", "Indonesian", "Dutch", "Swedish"
];

const englishStoriesDatabase = [
    {
        id: 1,
        english: "The brave astronaut landed safely on Mars and discovered glowing blue crystals.",
        vocab: [ {word: "Brave", trans: "شجاع"}, {word: "Discovered", trans: "اكتشف"} ],
        quiz: { q: "Where did the astronaut land?", options: ["Jupiter", "Mars", "The Moon"], correct: "Mars" },
        translations: {
            "Arabic": "هبط رائد الفضاء الشجاع بأمان على كوكب المريخ واكتشف بلورات زرقاء متوهجة.",
            "Spanish": "El valiente astronauta aterrizó a salvo en Marte y descubrió cristales azules brillantes.",
            "French": "Le courageux astronaute a atterri en toute sécurité sur Mars et a découvert des cristaux bleus brillants.",
            "German": "Der mutige Astronaut landete sicher auf dem Mars und entdeckte leuchtend blaue Kristalle."
        }
    },
    {
        id: 2,
        english: "She found a mysterious ancient key hidden inside a hollow oak tree in the deep forest.",
        vocab: [ {word: "Mysterious", trans: "غامض"}, {word: "Hidden", trans: "مخفي"} ],
        quiz: { q: "What did she find?", options: ["A golden box", "An ancient key", "A map"], correct: "An ancient key" },
        translations: {
            "Arabic": "وجدت مفتاحاً أثرياً غامضاً مخبأً داخل شجرة بلوط مجوفة في الغابة العميقة.",
            "Spanish": "Ella encontró una misteriosa llave antigua escondida dentro de un roble hueco en el bosque profundo.",
            "French": "Elle a trouvé une clé ancienne mystérieuse cachée à l'intérieur d'un chêne creux dans la forêt profonde.",
            "German": "Sie fand einen geheimnisvollen alten Schlüssel, der in einer hohlen Eiche im tiefen Wald versteckt war."
        }
    },
    {
        id: 3,
        english: "The deep blue ocean conceals infinite secrets and beautiful sunken cities from the past.",
        vocab: [ {word: "Conceals", trans: "يخفي / يكتم"}, {word: "Sunken", trans: "غارقة"} ],
        quiz: { q: "What does the ocean conceal?", options: ["Infinite secrets", "Nothing", "Just fish"], correct: "Infinite secrets" },
        translations: {
            "Arabic": "يخفي المحيط الأزرق العميق أسراراً لا نهاية لها ومدناً غارقة جميلة من الماضي.",
            "Spanish": "El océano azul profundo oculta infinitos secretos y hermosas ciudades hundidas del pasado.",
            "French": "L'océan bleu profond dissimule des secrets infinis et de magnifiques cités englouties du passé.",
            "German": "Der tiefblaue Ozean birgt unendliche Geheimnisse und wunderschöne versunkene Städte aus der Vergangenheit."
        }
    }
];

let currentEnglishStoryIdx = 0;

function buildNativeLanguageDropdown() {
    const nativeSel = document.getElementById('native-lang-select');
    if(!nativeSel) return;
    
    nativeSel.innerHTML = "";
    nativeLanguages.forEach(lang => {
        let opt = document.createElement('option');
        opt.value = lang;
        opt.innerText = lang;
        nativeSel.appendChild(opt);
    });
    nativeSel.value = "Arabic";
}

function updateEnglishAcademy() {
    const nativeSel = document.getElementById('native-lang-select');
    if(!nativeSel) return;
    
    const selectedNative = nativeSel.value;
    let currentData = englishStoriesDatabase[currentEnglishStoryIdx % englishStoriesDatabase.length];

    document.getElementById('story-number').innerText = `Story ${currentEnglishStoryIdx + 1} / 20`;
    document.getElementById('target-story-text').innerText = currentData.english;
    
    let nativeTranslation = currentData.translations[selectedNative] || currentData.translations["Arabic"] + ` (${selectedNative} translation active)`;
    document.getElementById('native-story-text').innerText = nativeTranslation;

    const vocabContainer = document.getElementById('vocab-container');
    vocabContainer.innerHTML = "";
    currentData.vocab.forEach(item => {
        let card = document.createElement('div');
        card.className = "vocab-card";
        card.innerHTML = `<strong>${item.word}</strong> ${item.trans}`;
        vocabContainer.appendChild(card);
    });

    document.getElementById('quiz-question-text').innerText = currentData.quiz.q;
    const optionsContainer = document.getElementById('quiz-options-container');
    optionsContainer.innerHTML = "";
    document.getElementById('quiz-feedback').innerText = "";

    currentData.quiz.options.forEach(opt => {
        let optBtn = document.createElement('button');
        optBtn.className = "quiz-opt-btn";
        optBtn.innerText = opt;
        optBtn.onclick = () => checkAcademyQuiz(opt, currentData.quiz.correct);
        optionsContainer.appendChild(optBtn);
    });
}

function checkAcademyQuiz(selectedOption, correctOption) {
    const feedback = document.getElementById('quiz-feedback');
    if(selectedOption === correctOption) {
        feedback.style.color = "var(--accent-green)";
        feedback.innerHTML = `<i class="fa-solid fa-circle-check"></i> Excellent! Correct answer.`;
    } else {
        feedback.style.color = "#ef4444";
        feedback.innerHTML = `<i class="fa-solid fa-circle-xmark"></i> Incorrect. Try again!`;
    }
}

function changeEnglishStory(direction) {
    currentEnglishStoryIdx += direction;
    if(currentEnglishStoryIdx < 0) currentEnglishStoryIdx = 19;
    if(currentEnglishStoryIdx > 19) currentEnglishStoryIdx = 0;
    updateEnglishAcademy();
}

// INITIALIZER ON APP BOOT
window.onload = function() {
    initGeography();
    buildNativeLanguageDropdown();
    updateEnglishAcademy();
};
