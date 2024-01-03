let questions = [];
let activeQuestionIndex = 0;
let answers = [];

const questionTitle = document.getElementById("question-title");
const optionInputs = document.querySelectorAll("#options input");
const optionLabels = document.querySelectorAll("#options label");
const questionForm = document.querySelector("#question-form");

function applyQuestionDetails() {
    let activeQuestion = questions[activeQuestionIndex];
    questionTitle.innerText = activeQuestion.question;

    for (let i = 0; i < 4; i++) {
        optionInputs[i].value = activeQuestion.options[i];
        optionLabels[i].innerText = activeQuestion.options[i];
    }
}

function previous() {
    if (activeQuestionIndex === 0) {
        alert("This is the first question");
    } else {
        activeQuestionIndex--;
        applyQuestionDetails();
    }
}

function next() {
    // Save the answer of the question before moving to the next question
    let selectedOption = questionForm.option.value;
    if (selectedOption) {
        answers[activeQuestionIndex] = selectedOption;
    }

    if (activeQuestionIndex === questions.length - 1) {
        showScore();
    } else {
        activeQuestionIndex++;
        questionForm.reset();
        applyQuestionDetails();
    }
}
