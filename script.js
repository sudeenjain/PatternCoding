const QUESTIONS = [
    // BEGINNER
    { q: "What is the simplest nested loop structure to print a 5x5 square of stars?", o: ["1 Loop", "2 Nested Loops", "3 Nested Loops", "While inside If"], a: 1, exp: "A square grid (2D) requires two loops: an outer loop for rows and an inner loop for columns." },
    { q: "To print a Right Angled Triangle, what should be the limit of the inner loop 'j' if 'i' is the row index?", o: ["j < n", "j <= i", "j > i", "j = 0"], a: 1, exp: "The number of elements in each row matches the row index, so j should run up to i." },
    { q: "Identify this pattern's type:", p: "*****\n*****\n*****", o: ["Square", "Rectangle", "Rhombus", "Triangle"], a: 1, exp: "Since there are 3 rows and 5 columns (unequal), it is a rectangle." },
    { q: "Which character is commonly used as a placeholder for spaces in pattern logic design?", o: ["*", "#", "_ or Space", "$"], a: 2, exp: "Spaces or underscores are used to create the 'empty' areas of a pattern." },
    { q: "What is the result of 'print(\"*\" * 3)' in Python?", o: ["*", "***", "*\n*\n*", "3"], a: 1, exp: "String multiplication in Python repeats the character sequence." },
    { q: "Next row logic for: \n1\n1 2\n1 2 3", o: ["Print i", "Print j", "Print n", "Print constant 1"], a: 1, exp: "In this series, the value starts at 1 and increases by 1 in each column, matching the loop counter 'j'." },
    { q: "What loop variable usually controls the number of rows?", o: ["Inner loop", "Outer loop", "Global variable", "None"], a: 1, exp: "The outer loop dictates how many vertical lines are generated." },

    // MEDIUM
    { q: "Which formula calculates stars in the i-th row of a centered Pyramid (1, 3, 5...)?", o: ["i + 1", "2*i + 1", "2*i - 1", "i * 2"], a: 2, exp: "This formula ensures an odd number of stars for every row (1, 3, 5, etc)." },
    { q: "In an inverted triangle (n to 1), the outer loop starts from 'n'. What is the condition?", o: ["i > 0", "i < n", "i == 0", "i++"], a: 0, exp: "To count down from n to 1, the loop must continue as long as i is greater than zero." },
    { q: "Logic for Floyd's Triangle involves which variable behavior?", o: ["Resetting 'j' to 0", "A continuous incrementing 'count'", "Printing row index", "Multiplying i and j"], a: 1, exp: "Floyd's triangle prints a sequence that never resets, requiring a separate counter variable." },
    { q: "Identify the pattern:", p: "1\n2 3\n4 5 6", o: ["Pascal's Triangle", "Floyd's Triangle", "Fibonacci Grid", "Binary Triangle"], a: 1, exp: "This specific arrangement of consecutive integers is Floyd's Triangle." },
    { q: "To print spaces before stars in a pyramid, the space loop usually runs from 1 to:", o: ["i", "n - i", "n + i", "2 * i"], a: 1, exp: "To center a pyramid, the number of spaces decreases as the row number increases." },
    { q: "What logic produces this binary pattern?", p: "1\n0 1\n1 0 1", o: ["i % 2", "j % 2", "(i + j) % 2 == 0", "Random"], a: 2, exp: "This checkerboard pattern is based on whether the sum of coordinates is even or odd." },
    { q: "For a Square of size 'n', how many total iterations occur in a nested loop?", o: ["n", "2n", "n^2", "n/2"], a: 2, exp: "Nested loops of size n result in n * n (n-squared) total operations." },

    // HARD
    { q: "Condition to print stars only on the boundaries of a Square (Hollow Square)?", o: ["i==1 || j==1", "i==1 || i==n || j==1 || j==n", "i==j", "i+j == n"], a: 1, exp: "Boundary stars occur at the first/last row and first/last column." },
    { q: "What logic is used for a Diamond pattern?", o: ["Two nested loops", "Pyramid + Inverted Pyramid", "One single loop", "Square - Triangle"], a: 1, exp: "A diamond is effectively an upright pyramid followed by a reversed one." },
    { q: "In a Pascal Triangle, the value at a position is the sum of:", o: ["Previous row elements", "Two elements directly above", "i and j", "Factorials only"], a: 1, exp: "Every number is the sum of the two directly above it in the preceding row." },
    { q: "What is the logic for a Rhombus pattern rows?", o: ["Only Stars", "Spaces + Stars", "Stars + Spaces", "None"], a: 1, exp: "A rhombus requires leading spaces to create the tilt, followed by stars." },
    { q: "Identify the complexity of a 3D Cube pattern (n x n x n)?", o: ["O(n)", "O(n^2)", "O(n^3)", "O(log n)"], a: 2, exp: "Three levels of nesting (length, width, height) result in cubic complexity." },
    { q: "To print a 'Z' shape pattern, which conditions are needed?", o: ["i==1, i==n, i+j==n+1", "i==j", "j==1, j==n", "All of above"], a: 0, exp: "A 'Z' prints the top row, bottom row, and the anti-diagonal." },
    { q: "What is the middle row index of a pattern with '2n-1' rows?", o: ["n-1", "n", "n+1", "2n"], a: 1, exp: "In an odd-numbered range like 1 to 5 (n=3), the middle is 3 (n)." },

    // ADVANCED
    { q: "Which mathematical concept is most related to the Butterfly pattern symmetry?", o: ["Rotation", "Reflection/Mirroring", "Translation", "None"], a: 1, exp: "The butterfly pattern is a horizontal and vertical reflection of a single wing." },
    { q: "In a Spiral Matrix pattern, how many directions are tracked?", o: ["2", "3", "4", "8"], a: 2, exp: "The spiral moves in 4 directions: Right, Down, Left, then Up." },
    { q: "What logic handles the 'X' pattern (both diagonals)?", o: ["i == j || i+j == n+1", "i == j && i+j == n", "i > j", "i < j"], a: 0, exp: "The X is formed by the primary diagonal (i=j) and the secondary diagonal (i+j = n+1)." },
    { q: "Advanced: What defines a 'Sierpinski Triangle' pattern?", o: ["Nested Loops", "Fractal/Recursive Logic", "Linear Increments", "Square Rooting"], a: 1, exp: "The Sierpinski Triangle is a fractal that repeats its shape at different scales." }
];

let state = { answers: {}, running: false, time: 1200 };

document.getElementById('start-btn').onclick = () => {
    const name = document.getElementById('user-name').value.trim();
    const id = document.getElementById('user-id').value.trim();
    if(!name || !id) return alert("Please fill in candidate details.");
    
    document.getElementById('login-card').classList.add('hide');
    document.getElementById('quiz-area').classList.remove('hide');
    document.getElementById('global-timer').classList.remove('hide');
    state.running = true;
    init();
    timer();
};

function timer() {
    const timerInterval = setInterval(() => {
        if(!state.running) { clearInterval(timerInterval); return; }
        state.time--;
        let m = Math.floor(state.time/60), s = state.time%60;
        document.getElementById('timer-val').innerText = `${m}:${s<10?'0'+s:s}`;
        if(state.time <= 0) { clearInterval(timerInterval); submit(); }
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

        const card = document.createElement('div');
        card.className = "glass-panel p-6"; card.id = `q-${i}`;
        card.innerHTML = `
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
    state.answers[qi] = oi;
    document.querySelectorAll(`[id^="opt-${qi}-"]`).forEach(b => b.classList.remove('selected'));
    document.getElementById(`opt-${qi}-${oi}`).classList.add('selected');
    document.getElementById(`dot-${qi}`).classList.add('done');
    
    let solved = Object.keys(state.answers).length;
    document.getElementById('progress-text').innerText = `${solved}/25`;
    if(solved === QUESTIONS.length) {
        const b = document.getElementById('final-submit');
        b.disabled = false; b.classList.replace('bg-gray-800', 'bg-blue-600'); b.classList.replace('text-gray-500', 'text-white');
        b.onclick = submit;
    }
};

function submit() {
    state.running = false;
    let score = 0;
    const analysisCont = document.getElementById('analysis-container');
    
    QUESTIONS.forEach((q, i) => { 
        const isCorrect = state.answers[i] === q.a;
        if(isCorrect) score++; 
        
        const card = document.createElement('div');
        card.className = `glass-panel p-5 analysis-card ${isCorrect ? 'correct-border' : 'wrong-border'}`;
        card.innerHTML = `
            <p class="text-white font-medium mb-3">${q.q}</p>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <div class="p-2 rounded bg-black/20">
                    <span class="text-gray-500 block text-[10px] font-bold">YOURS: ${q.o[state.answers[i]] || 'None'}</span>
                </div>
                <div class="p-2 rounded bg-green-900/10">
                    <span class="text-green-500 block text-[10px] font-bold">CORRECT: ${q.o[q.a]}</span>
                </div>
            </div>
            <div class="exp-box mt-3 text-sm text-gray-400"><strong>Note:</strong> ${q.exp}</div>
        `;
        analysisCont.appendChild(card);
    });
    
    document.getElementById('quiz-area').classList.add('hide');
    document.getElementById('global-timer').classList.add('hide');
    document.getElementById('success-area').classList.remove('hide');
    document.getElementById('res-name').innerText = document.getElementById('user-name').value;
    document.getElementById('res-score').innerText = `${score}/25`;

    // SYNC TO GOOGLE FORM
    const FORM_ACTION = "https://docs.google.com/forms/d/1qM8Z8cUNuELNq7vL7bTpOn_Gc1QlE-2mHC9rjEke4Uc/formResponse";
    const formData = new URLSearchParams();
    
    formData.append('entry.1003152390', document.getElementById('user-name').value);
    formData.append('entry.889924310', document.getElementById('user-id').value);
    formData.append('entry.1295637506', score);

    fetch(FORM_ACTION, {
        method: 'POST',
        mode: 'no-cors',
        body: formData
    }).then(() => {
        console.log("Results synced to Google Form successfully.");
    }).catch((err) => {
        console.error("Form submission failed:", err);
    });
};

// Password Protection Logic
document.getElementById('unlock-answers-btn').onclick = () => {
    const val = document.getElementById('answer-pwd').value;
    if(val === "2000") {
        document.getElementById('auth-section').classList.add('hide');
        document.getElementById('analysis-section').classList.remove('hide');
    } else {
        document.getElementById('pwd-error').classList.remove('hide');
    }
};

window.onblur = () => { if(state.running) document.getElementById('term-screen').classList.remove('hide'); };
