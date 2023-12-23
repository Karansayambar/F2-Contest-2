
let selectedTags = [];
let currentQuestionIndex = 0;
let userScore = 0;
let filteredQuizData;

function buttonOnClick(){
    let badge = document.getElementById('Badge');
    let hero = document.getElementById('hero');

    if(badge.style.display === 'none'){
        badge.style.display = 'flex';
        hero.style.opacity = 0.1;
    }else{
        badge.style.display = 'none';
        hero.style.opacity = 1;
    }
}
function startQuize(){
    filteredQuizData= quizData.filter(question => selectedTags.includes(question.category));

    if(selectedTags.length >= 5){
        currentQuestionIndex = 0;
        userScore = 0;

        loadQuestion();
    }else{
        alert("Select at least 5 Tags to Start the Quize");
    }
}

function loadQuestion() {
    const questionContainer = document.getElementById('question-container');
    questionContainer.innerHTML = ' ';

    const currentQuestion = filteredQuizData[currentQuestionIndex];

    if (currentQuestion) {
        const questionElement = document.createElement('p');
        questionElement.textContent = currentQuestion.question;

        const optionsElement = document.createElement('ul');

        if (currentQuestion.options) {
            currentQuestion.options.forEach((option, index) => {
                const optionItem = document.createElement('li');

                optionItem.textContent = option;
                optionItem.addEventListener('click', () => checkAnswer(index, currentQuestion));
                optionsElement.appendChild(optionItem);
            });
        } else {
            console.error('Options are not defined for the current question:', currentQuestion);
        }

        const scoreElement = document.createElement('p');
        scoreElement.textContent = 'Score: ' + userScore;

        questionContainer.appendChild(questionElement);
        questionContainer.appendChild(optionsElement);
        questionContainer.appendChild(scoreElement);
    } else {
        console.error('Current question is not defined.');
    }
}

function checkAnswer(selectedIndex, currentQuestion){
    const selectedAnswer = currentQuestion.options[selectedIndex];

    if(selectedAnswer === currentQuestion.answer){
        userScore += 1;
    }

    nextQuestion();
}

function nextQuestion(){
    currentQuestionIndex += 1;
    if(currentQuestionIndex < filteredQuizData.length){
        loadQuestion();
    }else{
        alert(`Quize completes Your final Score is${userScore}`);
    }
    selectedTagsContainer.innerHTML = selectedTags
        .map(selectedTag => `<span class="selected-tag">${selectedTag} <span class="remove-tag" onclick="removeTag('${selectedTag}')">&times;</span></span>`)
        .join(', ');
}

function removeTag(tag) {
    selectedTags = selectedTags.filter(selectedTag => selectedTag !== tag);

    const selectedTagsContainer = document.getElementById('selectedTags');
    selectedTagsContainer.innerHTML = selectedTags
        .map(selectedTag => `<span class="selected-tag">${selectedTag} <span class="remove-tag" onclick="removeTag('${selectedTag}')">&times;</span></span>`)
        .join(', ');
}

function toggleTag(tag){
    const selectedTagsContainer = document.getElementById('selectedTags');
    if(selectedTags.includes(tag)){
        selectedTags = selectedTags.filter(selectedTags => selectedTags !== tag);
    }else{
        selectedTags.push(tag);
    }

    selectedTagsContainer.textContent = selectedTags.join(', ');
}
let quizData = [
    {
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
            // Add more JavaScript questions...
        ]
    },
    {
        "category": "Java",
        "questions": [
            {
                "question": "Which of the following is a keyword in Java?",
                "options": ["void", "static", "this", "all of the above"],
                "answer": "all of the above"
            },
            {
                "question": "What is the default value of a local variable in Java?",
                "options": ["0", "null", "undefined", "Depends on the data type"],
                "answer": "Depends on the data type"
            },
            // Add more Java questions...
        ]
    },
    {
        "category": "SQL",
        "questions": [
            {
                "question": "What does SQL stand for?",
                "options": ["Structured Query Language", "Sequential Query Language", "Structured Question Language", "Simple Question Language"],
                "answer": "Structured Query Language"
            },
            {
                "question": "Which SQL statement is used to update data in a database?",
                "options": ["UPDATE", "MODIFY", "SAVE", "CHANGE"],
                "answer": "UPDATE"
            },
            // Add more SQL questions...
        ]
    },
    // Add more categories...
];


