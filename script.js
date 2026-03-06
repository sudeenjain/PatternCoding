const QUESTIONS = [
    { q: "What is the simplest nested loop structure to print a 5x5 square of stars?", o: ["1 Loop", "2 Nested Loops", "3 Nested Loops", "While inside If"], a: 1 },
    { q: "To print a Right Angled Triangle, what should be the limit of the inner loop 'j' if 'i' is the row index?", o: ["j < n", "j <= i", "j > i", "j = 0"], a: 1 },
    { q: "Identify this pattern's type:", p: "*****\n*****\n*****", o: ["Square", "Rectangle", "Rhombus", "Triangle"], a: 1 },
    { q: "Which character is commonly used as a placeholder for spaces in pattern logic design?", o: ["*", "#", "_ or Space", "$"], a: 2 },
    { q: "What is the result of 'print(\"*\" * 3)' in Python?", o: ["*", "***", "*\n*\n*", "3"], a: 1 },
    { q: "Next row logic for: \n1\n1 2\n1 2 3", o: ["Print i", "Print j", "Print n", "Print constant 1"], a: 1 },
    { q: "What loop variable usually controls the number of rows?", o: ["Inner loop", "Outer loop", "Global variable", "None"], a: 1 },
    { q: "Which formula calculates the number of stars in the i-th row of a centered Pyramid (1, 3, 5...)?", o: ["i + 1", "2*i + 1", "2*i - 1", "i * 2"], a: 2 },
    { q: "In an inverted triangle (n to 1), the outer loop starts from 'n'. What is the condition?", o: ["i > 0", "i < n", "i == 0", "i++"], a: 0 },
    { q: "Logic for Floyd's Triangle involves which variable behavior?", o: ["Resetting 'j' to 0", "A continuous incrementing 'count'", "Printing row index", "Multiplying i and j"], a: 1 },
    { q: "Identify the pattern:", p: "1\n2 3\n4 5 6", o: ["Pascal's Triangle", "Floyd's Triangle", "Fibonacci Grid", "Binary Triangle"], a: 1 },
    { q: "To print spaces before stars in a pyramid, the space loop usually runs from 1 to:", o: ["i", "n - i", "n + i", "2 * i"], a: 1 },
    { q: "What logic produces this binary pattern?", p: "1\n0 1\n1 0 1", o: ["i % 2", "j % 2", "(i + j) % 2 == 0", "Random"], a: 2 },
    { q: "For a Square of size 'n', how many total iterations occur in a nested loop?", o: ["n", "2n", "n^2", "n/2"], a: 2 },
    { q: "Condition to print stars only on the boundaries of a Square (Hollow Square)?", o: ["i==1 || j==1", "i==1 || i==n || j==1 || j==n", "i==j", "i+j == n"], a: 1 },
    { q: "What logic is used for a Diamond pattern?", o: ["Two nested loops", "Pyramid + Inverted Pyramid", "One single loop", "Square - Triangle"], a: 1 },
    { q: "In a Pascal Triangle, the value at a position is the sum of:", o: ["Previous row elements", "Two elements directly above", "i and j", "Factorials only"], a: 1 },
    { q: "What is the logic for a Rhombus pattern rows?", o: ["Only Stars", "Spaces + Stars", "Stars + Spaces", "None"], a: 1 },
    { q: "Identify the complexity of a 3D Cube pattern (n x n x n)?", o: ["O(n)", "O(n^2)", "O(n^3)", "O(log n)"], a: 2 },
    { q: "To print a 'Z' shape pattern, which conditions are needed?", o: ["i==1, i==n, i+j==n+1", "i==j", "j==1, j==n", "All of above"], a: 0 },
    { q: "What is the middle row index of a pattern with '2n-1' rows?", o: ["n-1", "n", "n+1", "2n"], a: 1 },
    { q: "Which mathematical concept is most related to the Butterfly pattern symmetry?", o: ["Rotation", "Reflection/Mirroring", "Translation", "None"], a: 1 },
    { q: "In a Spiral Matrix pattern, how many directions are tracked?", o: ["2", "3", "4", "8"], a: 2 },
    { q: "What logic handles the 'X' pattern (both diagonals)?", o: ["i == j || i+j == n+1", "i == j && i+j == n", "i > j", "i < j"], a: 0 },
    { q: "Advanced: What defines a 'Sierpinski Triangle' pattern?", o: ["Nested Loops", "Fractal/Recursive Logic", "Linear Increments", "Square Rooting"], a: 1 }
];

let state = { answers: {}, running: false, time: 900 }; // 15 Minutes = 900 Seconds

// Step 1: Verify Password
document.getElementById('verify-pass-btn').onclick = () => {
    const code = document.getElementById('access-code').value;
    if(code === "2005") {
        document.getElementById('pass-card').classList.add('hide');
        document.getElementById('login-card').classList.remove('hide');
    } else {
        alert("Incorrect Access Code.");
    }
};

// Step 2: Start Quiz
document.getElementById('start-btn').onclick = () => {
    const name = document.getElementById('user-name').value.trim();
    const id = document.getElementById('user-id').value.trim();
    if(!name || !id) return alert("Please fill in candidate details.");
    
    document.getElementById('login-card').classList.add('hide');
    document.getElementById('quiz-area').classList.remove('hide');
    document.getElementById('global-timer').classList.remove('hide');
    state.running = true;
    init();
    startTimer();
};

function startTimer() {
    const timerInterval = setInterval(() => {
        if(!state.running) { clearInterval(timerInterval); return; }
        state.time--;
        
        let m = Math.floor(state.time/60), s = state.time%60;
        document.getElementById('timer-val').innerText = `${m}:${s<10?'0'+s:s}`;
        
        // Visual Warning
        if(state.time <= 180) { // 3 Minutes left
            document.getElementById('global-timer').style.borderColor = "#ef4444";
            document.getElementById('global-timer').style.color = "#ef4444";
        }
        
        // Auto Terminate
        if(state.time <= 0) { 
            clearInterval(timerInterval); 
            submit(); 
        }
    }, 1000);
}

function init() {
    const grid = document.getElementById('dot-grid');
    const cont = document.getElementById('questions-container');
    QUESTIONS.forEach((q, i) => {
        const dot = document.createElement('div');
        dot.className = "dot-nav"; dot.id = `dot-${i}`; dot.innerText = i+1;
        dot.onclick = () => window.scrollTo({ top: document.getElementById(`q-${i}`).offsetTop - 100, behavior: 'smooth' });
        grid.appendChild(dot);

        let diff = i < 7 ? "Beginner" : i < 14 ? "Medium" : i < 21 ? "Hard" : "Advanced";
        let color = i < 7 ? "text-green-500" : i < 14 ? "text-yellow-500" : i < 21 ? "text-orange-500" : "text-red-500";

        const card = document.createElement('div');
        card.className = "glass-panel p-6 shadow-lg"; card.id = `q-${i}`;
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <span class="px-2 py-1 bg-[#1c2128] ${color} text-[10px] font-bold rounded uppercase tracking-tighter">${diff}</span>
                <span class="text-gray-600 text-[10px] font-bold uppercase">Q${i+1}</span>
            </div>
            <h3 class="text-lg text-white font-semibold mb-4">${q.q}</h3>
            ${q.p ? `<div class="pattern-box mb-4">${q.p}</div>` : ''}
            <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                ${q.o.map((opt, oi) => `
                    <button class="option-button flex items-center gap-3" id="opt-${i}-${oi}" onclick="sel(${i},${oi})">
                        <span class="w-6 h-6 flex items-center justify-center rounded-full border border-gray-700 text-[10px] font-bold">${String.fromCharCode(65 + oi)}</span>
                        ${opt}
                    </button>
                `).join('')}
            </div>
        `;
        cont.appendChild(card);
    });
}

window.sel = (qi, oi) => {
    if(!state.running) return;
    state.answers[qi] = oi;
    document.querySelectorAll(`[id^="opt-${qi}-"]`).forEach(b => b.classList.remove('selected'));
    document.getElementById(`opt-${qi}-${oi}`).classList.add('selected');
    document.getElementById(`dot-${qi}`).classList.add('done');
    
    let solved = Object.keys(state.answers).length;
    document.getElementById('progress-text').innerText = `${solved}/25`;
    
    // Enable submit if any question is answered (in case of time pressure)
    const b = document.getElementById('final-submit');
    b.disabled = false; 
    b.classList.replace('bg-gray-800', 'bg-blue-600'); 
    b.classList.replace('text-gray-500', 'text-white');
    b.onclick = submit;
};

function submit() {
    state.running = false;
    let score = 0;
    const analysisCont = document.getElementById('analysis-container');
    analysisCont.innerHTML = ""; // Clear
    
    QUESTIONS.forEach((q, i) => { 
        const isCorrect = state.answers[i] === q.a;
        if(isCorrect) score++; 
        
        const card = document.createElement('div');
        card.className = `glass-panel p-5 analysis-card ${isCorrect ? 'correct-border' : 'wrong-border'}`;
        card.innerHTML = `
            <div class="flex justify-between mb-2">
                <span class="text-xs font-bold text-gray-500">QUESTION ${i+1}</span>
                <span class="text-xs font-black ${isCorrect ? 'text-green-500' : 'text-red-500'}">${isCorrect ? 'CORRECT' : 'INCORRECT'}</span>
            </div>
            <p class="text-white font-medium mb-3">${q.q}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div class="p-2 rounded bg-red-900/10 border border-red-900/20">
                    <span class="text-gray-500 block text-[10px] font-bold uppercase">Your Answer</span>
                    <span class="${isCorrect ? 'text-green-400' : 'text-red-400'}">${q.o[state.answers[i]] || 'Not Answered'}</span>
                </div>
                <div class="p-2 rounded bg-green-900/10 border border-green-900/20">
                    <span class="text-gray-500 block text-[10px] font-bold uppercase">Correct Option</span>
                    <span class="text-green-400">${q.o[q.a]}</span>
                </div>
            </div>
        `;
        analysisCont.appendChild(card);
    });
    
    document.getElementById('quiz-area').classList.add('hide');
    document.getElementById('global-timer').classList.add('hide');
    document.getElementById('success-area').classList.remove('hide');
    document.getElementById('res-name').innerText = document.getElementById('user-name').value;
    document.getElementById('res-score').innerText = `${score}/25`;
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Google Form Submission
    const FORM_ACTION = "https://docs.google.com/forms/d/e/1FAIpQLSebillFGY4kIG9qiWSbDm-cItuLqhKtUzsl-nVu6yd7yUbCLg/formResponse";
    const formData = new URLSearchParams();
    formData.append('entry.1856738291', document.getElementById('user-name').value);
    formData.append('entry.947362910', document.getElementById('user-id').value);
    formData.append('entry.564738291', score);

    fetch(FORM_ACTION, { method: 'POST', mode: 'no-cors', body: formData });
}

// SECURITY: Tab/Focus protection
window.onblur = () => { 
    if(state.running) { 
        document.getElementById('term-screen').classList.remove('hide'); 
        state.running = false; 
    } 
};

// SECURITY: Disable F12, Ctrl+Shift+I, etc.
document.onkeydown = (e) => {
    if(e.keyCode == 123 || (e.ctrlKey && e.shiftKey && (e.keyCode == 73 || e.keyCode == 74)) || (e.ctrlKey && e.keyCode == 85)) {
        return false;
    }
};
