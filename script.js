const questions = [
    {
        question: "What is the capital of France?",
        answers:[
            {text: "Paris", correct: true},
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Rome", correct: false}
        ]
    },
    {
        question: "What is the capital of Germany?",
        answers:[
            {text: "Paris", correct: false},
            {text: "London", correct: false},
            {text: "Berlin", correct: true},
            {text: "Rome", correct: false}
        ]
    },
    {
        question: "What is the capital of Italy?",
        answers:[
            {text: "Paris", correct: false},
            {text: "London", correct: false},
            {text: "Berlin", correct: false},
            {text: "Rome", correct: true}
        ]
    },

    {
        question: "What is the capital of the United Kingdom?",
        answers:[
            {text: "Paris", correct: false},
            {text: "London", correct: true},
            {text: "Berlin", correct: false},
            {text: "Rome", correct: false}
        ]
    }

   
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;


    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);

    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild);
    }
}

function selectAnswer(e){
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    if(correct){
        selectedButton.classList.add("correct");
        score++;
    }
    else{
        selectedButton.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    // const scoreElement = document.getElementById("score");
    questionElement.innerText = `You scored ${score} out of ${questions.length}`;
    // scoreElement.classList.add("score");
    nextButton.innerText = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}


nextButton.addEventListener("click", () => {
    
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
       startQuiz();
    }
})

startQuiz();