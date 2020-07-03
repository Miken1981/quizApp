const STORE = [
    {question:"sfhkjdhg", 
    answers: ["answer a","answer b","answer c","answer d"]
    correct:""
}
]

let score = 0;
let questionNumber = 0;




$(document).ready(function () {
    hideAll();
});

function hideAll(){
   $('.summary').hide();
   $('.quiz').hide();
   $('.scoreCard').hide();
   $('.feedbackArea').hide();

}
function startQuiz(){
    console.log("startQuiz ran");
        event.preventDefault();
        $('.start').hide();
        $('.quiz').show();
        createQuestion();
}

function createQuestion (){
    console.log("createQuestion ran");
    // render quiz questions on screen
    let question = STORE[questionNumber];
    let startNum = 1;
    $('p').text(`Question ${startNum}: ${question.question}`);
}

function submitAnswer(){
    console.log("submitAnser ran");
    //handle when user presses the submit button
}

function nextQuestion(){
    console.log("nextQuestion ran");
}

function restartQuiz(){
    console.log("restartQuiz ran");
}
function runQuizApp() {
    // startQuiz();
    createQuestion();
    submitAnswer();
    nextQuestion();
    restartQuiz();
}


$('.start a').click(startQuiz); 
$(runQuizApp)