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


let categories = quizData.map(item => item.category);
const chipscontainer = document.querySelector("form > .chips");

categories.forEach((category) => {
    const chip = document.createElement("div");
    chip.className = "chip"; 
    chip.innerHTML = `
        <input type="checkbox" value="${category}" id="${category}">
        <label for="${category}">
            <span>${category}</span>
            <span class="close"><i class="fa-solid fa-xmark"></i></span>
        </label>`;
    chipscontainer.appendChild(chip);
    chip.style.margin = "10px"
});



let homesection = document.querySelector(".btn1")
const questionsection = document.getElementById("question-section");
const form = document.querySelector(".categories");
const username = document.getElementById("username");
let selectedList = [];
form.addEventListener("submit", (e) =>{
    e.preventDefault();
    let inputList = document.querySelectorAll(".categories input");
    selectedList = []
    for(let i = 0; i < inputList.length; i++){
        if(inputList[i].checked){
            selectedList.push(inputList[i].value);
        }
    }
    if(selectedList.length < 2){
        alert("please select at least 2 categories");
    }else{
       username.innerText = "karan";
       buttonOnClick();
       openQuestionSection();
    }
})

function openQuestionSection(){
    hero.style.display = "none";
    let selectedCategoriesObject = quizData.filter(item =>{
        return Boolean(selectedList.find(cat => cat===item.category));
    })
    selectedCategoriesObject.forEach(selectedCategory =>{
        questions.push(...selectedCategory.questions);
    });

activeQuestionIndex = 0;
applyQuestionDetails();
questionsection.style.display = "block";
}

