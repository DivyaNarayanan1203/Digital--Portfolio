// Quiz state management
let currentQuestion = 0;
let score = 0;
let quizData = [];

// DOM Elements
const questionsDiv = document.getElementById('questions');
const quizSetup = document.getElementById('quizSetup');
const quizContainer = document.getElementById('quizContainer');
const quizContent = document.getElementById('quizContent');
const quizResult = document.getElementById('quizResult');
const retryButton = document.querySelector('#quizContainer button');

// Function to add new question fields
function addQuestion() {
    const questionCount = questionsDiv.children.length + 1;

    const questionDiv = document.createElement('div');
    questionDiv.innerHTML = `
        <input type="text" placeholder="Question ${questionCount}" required>
        <input type="text" placeholder="Option 1" required>
        <input type="text" placeholder="Option 2" required>
        <input type="text" placeholder="Option 3" required>
        <input type="number" placeholder="Correct Answer (1-3)" min="1" max="3" required>
    `;
    questionsDiv.appendChild(questionDiv);
}

// Function to start the quiz
function startQuiz() {
    const questions = questionsDiv.children;
    quizData = [];

    // Validate and collect questions
    for (let question of questions) {
        const inputs = question.querySelectorAll('input');
        const questionText = inputs[0].value.trim();
        const options = [inputs[1].value.trim(), inputs[2].value.trim(), inputs[3].value.trim()];
        const answer = parseInt(inputs[4].value) - 1;

        // Validate inputs
        if (!questionText || options.some(option => !option) {
            alert('Please fill in all fields for each question.');
            return;
        }
        if (isNaN(answer) || answer < 0 || answer > 2) {
            alert('Please enter a valid correct answer (1, 2, or 3).');
            return;
        }

        quizData.push({ question: questionText, options, answer });
    }

    // Switch to quiz interface
    quizSetup.classList.add('hidden');
    quizContainer.classList.remove('hidden');
    showNextQuestion();
}

// Display next question or results
function showNextQuestion() {
    if (currentQuestion < quizData.length) {
        const question = quizData[currentQuestion];
        quizContent.innerHTML = `
            <p>${question.question}</p>
            ${question.options.map((option, index) => `
                <button onclick="checkAnswer(${index})">${option}</button>
            `).join('')}
        `;
    } else {
        showResult();
    }
}

// Handle answer selection
function checkAnswer(selectedIndex) {
    const question = quizData[currentQuestion];
    const isCorrect = selectedIndex === question.answer;

    // Provide feedback
    quizContent.innerHTML += `
        <p class="feedback ${isCorrect ? 'correct' : 'incorrect'}">
            ${isCorrect ? 'Correct!' : 'Incorrect!'}
        </p>
    `;

    if (isCorrect) score++;

    // Move to the next question after a short delay
    setTimeout(() => {
        currentQuestion++;
        showNextQuestion();
    }, 1000);
}

// Show final results
function showResult() {
    quizResult.innerHTML = `Your Score: ${score}/${quizData.length}`;
    retryButton.classList.remove('hidden');
    quizContent.innerHTML = '';
}

// Reset quiz
function retryQuiz() {
    currentQuestion = 0;
    score = 0;
    quizData = [];
    quizResult.innerHTML = '';
    retryButton.classList.add('hidden');
    quizSetup.classList.remove('hidden');
    quizContainer.classList.add('hidden');
    questionsDiv.innerHTML = ''; // Clear previous questions
}

// Event Listeners
document.getElementById('addQuestion').addEventListener('click', addQuestion);
document.getElementById('startQuiz').addEventListener('click', startQuiz);
retryButton.addEventListener('click', retryQuiz);
