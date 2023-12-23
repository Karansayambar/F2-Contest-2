let quizData = [
    {
        "id": "tag-1",
        "category": "HTML",
        "questions": [
            {
                "question": "What does HTML stand for?",
                "options": ["Hyper Text Markup Language", "High Tech Machine Language", "Hyper Transfer Markup Language", "Hyperlink and Text Markup Language"],
                "answer": "Hyper Text Markup Language"
            },
            {
                "question": "What is the correct HTML element for the largest heading?",
                "options": ["<h1>", "<h6>", "<heading>", "<head>"],
                "answer": "<h1>"
            },
        ]
    },
    {
        "id": "tag-2",
        "category": "CSS",
        "questions": [
            {
                "question": "What does CSS stand for?",
                "options": ["Counter Strike: Source", "Corrective Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
                "answer": "Cascading Style Sheet"
            },
            {
                "question": "Which property is used to change the background color?",
                "options": ["color", "background-color", "bgcolor", "background"],
                "answer": "background-color"
            },
        ]
    },
    {
        "id": "tag-3",
        "category": "JavaScript",
        "questions": [
            {
                "question": "What is the correct JavaScript syntax to print 'Hello World'?",
                "options": ["print('Hello World');", "console.log('Hello World');", "echo 'Hello World';", "printf('Hello World');"],
                "answer": "console.log('Hello World');"
            },
            {
                "question": "What is the purpose of the 'typeof' operator in JavaScript?",
                "options": ["Checking the type of a variable", "Converting a variable to a specific type", "Concatenating two strings", "None of the above"],
                "answer": "Checking the type of a variable"
            },
        ]
    }
];

let selectedTags = [];
let currentCategoryIndex = 0;
let currentQuestionIndex = 0;
let userScore = 0;
let filteredQuizData;

function buttonOnClick() {
    let badge = document.getElementById('Badge');
    let hero = document.getElementById('hero');

    if (badge.style.display === 'none') {
        badge.style.display = 'flex';
        hero.style.opacity = 0.1;
    } else {
        badge.style.display = 'none';
        hero.style.opacity = 1;
    }
}

function startQuize() {
    filteredQuizData = quizData.filter(question => selectedTags.includes(question.id));
    if (selectedTags.length >= 5) {
        currentCategoryIndex = 0;
        currentQuestionIndex = 0;
        userScore = 0;

        loadQuestion();
    } else {
        alert("Select at least 5 Tags to Start the Quiz");
    }
}

function toggleTag(event) {
   
    let tagId = event.target.id;

    if (selectedTags.includes(tagId)) {
        selectedTags = selectedTags.filter(selectedTag => selectedTag !== tagId);
    } else {
        selectedTags.push(tagId);
    }

    document.getElementById(tagId).classList = 'tag-active'
}

function loadQuestion() {
    if (currentCategoryIndex < filteredQuizData.length) {
        const questionContainer = document.getElementById('quiz-question-container');
        const optionsContainer = document.getElementById('quiz-options-container');

        const currentQuestion = filteredQuizData[currentCategoryIndex];

        questionContainer.textContent = currentQuestion.questions[currentQuestionIndex].question;

        optionsContainer.innerHTML = currentQuestion.questions[currentQuestionIndex].options
            .map((option, index) => `<li onclick="checkAnswer(${index})">${option}</li>`)
            .join('');

        document.getElementById('quiz').style.display = 'block';
        document.getElementById('Badge').style.display = 'none';
    } else {
        displayResults();
    }
}

function checkAnswer(selectedOptionIndex) {
    const currentQuestion = filteredQuizData[currentCategoryIndex].questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options[selectedOptionIndex];

    if (selectedOption === currentQuestion.answer) {
        userScore++;
    }

    currentCategoryIndex++;
    loadQuestion();
}

function displayResults() {
    const quizSection = document.getElementById('quiz');
    const resultsSection = document.getElementById('results');

    quizSection.style.display = 'none';
    resultsSection.style.display = 'block';

    document.getElementById('final-score').textContent = userScore;
}

function removeTag(tag) {
    selectedTags = selectedTags.filter(selectedTag => selectedTag !== tag);
    document.querySelector(`.tag[data-tag="${tag}"]`).style.backgroundColor = '';
    toggleTag();
}


function nextQuestion() {
    let flag = false;
    quizData.map((category) => {
        
        if(category.questions.length == currentQuestionIndex + 1){
            currentCategoryIndex++;
            currentQuestionIndex = 0;
            flag = true
        }
            
    })
    if(!flag){
        currentQuestionIndex++;
    }
    loadQuestion();
}

function prevQuestion() {
    if (currentCategoryIndex > 0) {
        let flag = false;
        quizData.map((category) => {
            
            if(currentQuestionIndex == 0){
                currentCategoryIndex--;
                currentQuestionIndex = category.questions.length -1;
                flag = true
            }
        })
        if(!flag){
            currentQuestionIndex--;
        }
        console.log(currentCategoryIndex, currentQuestionIndex)
        loadQuestion();
    }
}

function updateProgressBar() {
    const progressBar = document.getElementById('progress-bar');
    const progress = ((currentCategoryIndex + 1) / filteredQuizData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

function restartQuiz() {
    document.getElementById('results').style.display = 'none';
    document.getElementById('home').style.display = 'block';
}

// Add event listeners to your buttons
document.getElementById('start-button').addEventListener('click', startQuiz);
document.getElementById('restart-button').addEventListener('click', restartQuiz);

