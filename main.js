const questions = [
    { q: "What is RAM?", a: ["Temporary Memory", "Permanent Memory", "Input Device", "Output Device"], correct: 0 },
    { q: "HTML stands for?", a: ["HyperText Markup Language", "HighText Machine Language", "Hyper Machine Logic", "None"], correct: 0 },
    { q: "Which is a programming language?", a: ["HTTP", "Java", "URL", "USB"], correct: 1 },
    { q: "What is RAM?", a: ["Temporary Memory", "Permanent Memory", "Input Device", "Output Device"], correct: 0 },
    { q: "HTML stands for?", a: ["HyperText Markup Language", "HighText Machine Language", "Hyper Machine Logic", "None"], correct: 0 },
    { q: "Which is a programming language?", a: ["HTTP", "Java", "URL", "USB"], correct: 1 },
    { q: "CPU stands for?", a: ["Central Processing Unit", "Control Program Utility", "Central Power Unit", "None"], correct: 0 },
    { q: "Which one is an OS?", a: ["Python", "Windows", "HTML", "MS Word"], correct: 1 },
    { q: "Full form of URL?", a: ["Uniform Resource Locator", "Universal Reference Link", "Uniform Random Link", "None"], correct: 0 },
    { q: "Which is NOT an input device?", a: ["Mouse", "Keyboard", "Monitor", "Scanner"], correct: 2 },
    { q: "1 Byte = ?", a: ["4 bits", "8 bits", "16 bits", "32 bits"], correct: 1 },
    { q: "LAN stands for?", a: ["Local Area Network", "Logical Assigned Network", "Long Area Node", "None"], correct: 0 },
    { q: "Which is a DBMS?", a: ["Oracle", "Windows", "Google", "HTML"], correct: 0 },
    { q: "Which is a storage device?", a: ["Pen Drive", "Monitor", "Mouse", "Keyboard"], correct: 0 },
    { q: "Which language is used for styling?", a: ["HTML", "CSS", "C", "Java"], correct: 1 },
    { q: "JavaScript is?", a: ["Programming Language", "Database", "OS", "None"], correct: 0 },
    { q: "Binary system base is?", a: ["2", "8", "10", "16"], correct: 0 },
    { q: "Which is NOT a browser?", a: ["Chrome", "Firefox", "Edge", "C++"], correct: 3 },
    { q: "PHP is used for?", a: ["Backend", "Hardware", "Networking", "OS"], correct: 0 },
    { q: "MySQL is?", a: ["Database", "OS", "Programming Language", "Browser"], correct: 0 },
    { q: "Full form of SQL?", a: ["Structured Query Language", "System Query Level", "Sequential Query Language", "None"], correct: 0 },
    { q: "Which is a loop in JS?", a: ["for", "if", "switch", "case"], correct: 0 },
    { q: "Which tag is for images in HTML?", a: ["<img>", "<image>", "<src>", "<pic>"], correct: 0 },
    { q: "WWW stands for?", a: ["World Wide Web", "Wide World Web", "Web World Wide", "None"], correct: 0 },
    { q: "Python was created by?", a: ["Guido van Rossum", "James Gosling", "Dennis Ritchie", "Bjarne Stroustrup"], correct: 0 },
    { q: "Shortcut for copy?", a: ["Ctrl + C", "Ctrl + X", "Ctrl + V", "Ctrl + P"], correct: 0 },
    { q: "Which is a cloud platform?", a: ["AWS", "Photoshop", "Chrome", "Excel"], correct: 0 },
    { q: "Which is a text editor?", a: ["VS Code", "Chrome", "Windows", "Python"], correct: 0 },
    { q: "Firewall is used for?", a: ["Security", "Storage", "Printing", "Backup"], correct: 0 },
    { q: "Which is NOT hardware?", a: ["CPU", "Mouse", "Browser", "Monitor"], correct: 2 },
    { q: "MS Word is a?", a: ["Word Processor", "OS", "Language", "Compiler"], correct: 0 },
    { q: "Compiler converts?", a: ["Code to Machine Code", "Audio", "Video", "None"], correct: 0 },
    { q: "RAM is?", a: ["Volatile", "Non-volatile", "Optical Disk", "None"], correct: 0 }
];
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

let quiz = [];
let index = 0;
let score = 0;
let timer;

const startBtn = document.getElementById("startBtn");
const quizBox = document.getElementById("quiz-box");
const questionText = document.getElementById("question");
const answersBox = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const timerDisplay = document.getElementById("timer");
const progress = document.getElementById("progress");
const result = document.getElementById("result");
const scorePercent = document.getElementById("scorePercent");
const playAgain = document.getElementById("playAgain");

// Start Quiz
startBtn.onclick = () => {
    document.getElementById("home").classList.add("no-center");
    quiz = questions.sort(() => Math.random() - 0.5).slice(0, 5);
    shuffleArray(questions);
    index = 0;
    score = 0;
    startBtn.classList.add("hide");
    quizBox.classList.remove("hide");
    loadQuestion();
    playAgain.onclick = () => {
    result.classList.add("hide");
    startBtn.classList.remove("hide");
    document.getElementById("home").classList.remove("no-center");
};
};


function loadQuestion() {
    clearInterval(timer);
    startTimer(30);

    const q = quiz[index];
    questionText.textContent = q.q;
    progress.textContent = `${index + 1} / 5`;

    answersBox.innerHTML = "";
    q.a.forEach((ans, i) => {
        const btn = document.createElement("button");
        btn.textContent = ans;
        btn.onclick = () => selectAnswer(i);
        answersBox.appendChild(btn);
    });
}
function selectAnswer(i) {
    const q = quiz[index];
    const btns = document.querySelectorAll("#answers button");
    btns.forEach(b => b.disabled = true);

    btns[q.correct].style.background = "green";
    if (i !== q.correct) {
        btns[i].style.background = "red";
    } else {
        score++;
    }

    nextBtn.classList.remove("hide");
}


nextBtn.onclick = () => {
    nextBtn.classList.add("hide");
    index++;

    if (index < 5) loadQuestion();
    else finishQuiz();
};

function startTimer(t) {
    timerDisplay.textContent = `⏳ ${t}s`;
    timer = setInterval(() => {
        t--;
        timerDisplay.textContent = `⏳ ${t}s`;
        if (t <= 0) {
            clearInterval(timer);
            nextBtn.click();
        }
    }, 1000);
}

function finishQuiz() {
    quizBox.classList.add("hide");
    result.classList.remove("hide");

    const percent = Math.round((score / 5) * 100);
    scorePercent.textContent = percent + "%";
}

playAgain.onclick = () => {
    result.classList.add("hide");
    startBtn.classList.remove("hide");
};

const themeToggle = document.getElementById("themeToggle");themeToggle.onclick = () => {
    document.body.classList.toggle("dark");
}

function showSection(sectionId) {
    document.querySelectorAll(".section-page").forEach(sec => {
        sec.classList.remove("active");
    });

    document.getElementById(sectionId).classList.add("active");
}

document.querySelectorAll(".navbar a").forEach(link => {
    link.addEventListener("click", function (e) {
        e.preventDefault(); 

        const sec = this.getAttribute("href").substring(1);
        showSection(sec);
    });
});
showSection("home");
