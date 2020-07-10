const STORE = [{
        question: "Which song did Daft Punk sample in &#34Harder, Better, Faster, Stronger&#34?",
        answers: ["&#34Stronger&#34 by: Kanye West", "&#34Blackstar&#34 by: David Bowie",
            "&#34Cola Bottle Baby&#34 by: Edwin Birdsong", "&#34Maps&#34 by: Yeah Yeah Yeahs"
        ],
        correct: 2,
        userAnswer: null,
        userCorrect: false
    },
    {
        question: "Sublime sampled what song for &#34Doin' Time&#34",
        answers: ["&#34Summertime&#34 by: Herbie Mann", "&#34Summertime&#34 by: Dj Jazzy Jeff and the Fresh Prince",
            "&#34Lady Madonna&#34 by: The Beatles", "&#34Africa&#34 by: TOTO"
        ],
        correct: 0,
        userAnswer: null,
        userCorrect: false
    },
    {
        question: "&#34Sometimes I Rhyme Slow&#34 by: Nice & Smooth contains a sample of which song?",
        answers: ["&#34Nobody&#34 by:Shaquille O'Neal", "&#34D'yer Mak'er&#34 by: Led Zeppelin",
            "&#34Wake Me Up&#34 by: Avicii", "&#34Fast Car&#34 by: Tracy Chapman"
        ],
        correct: 3,
        userAnswer: null,
        userCorrect: false
    },
    {
        question: "Lou Reed's &#34Walk on the Wild Side&#34 has been sampled over 20 times. Which of these songs is one of those?",
        answers: ["&#34Ohh la la&#34 by: Faces", "&#34Can I Kick It?&#34 by: A Tribe Called Quest",
            "&#34Rhiannon&#34 by: Fleetwood Mac", "&#34Caroline&#34 by: Amin&eacute"
        ],
        correct: 1,
        userAnswer: null,
        userCorrect: false
    },
    {
        question: "Which Queen song is sampled in Vanilla Ice's &quotIce Ice Baby&quot?",
        answers: ["&quotBohemian Rhapsody&quot", "&quotYou're my Best Friend&quot",
            "&quotKiller Queen&quot", "&quotUnder Pressure&quot"
        ],
        correct: 3,
        userAnswer: null,
        userCorrect: false
    }
]

var qNumber = document.getElementById('qNumber');
var qTotal = document.getElementById('qTotal');
var score = document.getElementById('score');
var questionForm = document.getElementById('questionForm');
var wrongAnswerNext = document.getElementById('wrongAnswerNext');
var answerSpan = document.getElementById('answerSpan');
var resultSpan = document.getElementById('resultSpan');
var radioButtons = $('input:radio');
let questionNumber = 0;
console.log(radioButtons);



function getRadioInput() {
    // radioButtons.each(function (i, e){
    //     console.log($(e).checked());
    // })
    var radios = document.getElementsByName('option');

    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            // do whatever you want with the checked radio
            return parseInt(radios[i].value);

            // only one radio can be logically checked, don't check the rest
            break;
        }
    }
    return null;
}

$('#questionForm').on('click', '.sbmtbttn', function(e) {
    e.preventDefault();
    var result = getRadioInput();
    if (result == null) {
        alert('Please make a selection');
        return null;
    }
    console.log(result);
    STORE[questionNumber].userAnswer = result;
    if (STORE[questionNumber].correct == result) {
        STORE[questionNumber].userCorrect = true;
        questionNumber++;
        if (questionNumber >= STORE.length) {
            $('.quiz').hide()
            $('.summary').show();
        } else {
            createRadioButtons(STORE[questionNumber])
        }

    } else {
        var correctIndex = STORE[questionNumber].correct
        var correctAnswer = STORE[questionNumber].answers[correctIndex];
        answerSpan.innerHTML = correctAnswer;
        $('.quiz').hide();
        $('.feedbackArea').show();
    }
    updateScore();
})

wrongAnswerNext.addEventListener('click', function() {
    if (questionNumber >= STORE.length) {
        $('.quiz').hide()
        $('.feedbackArea').hide();
        $('.summary').show();
    } else {
        questionNumber++;
        createRadioButtons(STORE[questionNumber])
        $('.quiz').show();
        $('.feedbackArea').hide();
        updateScore();
    }
})

$(document).ready(function() {
    hideAll();
    // createRadioButtons(STORE[1]);
});



function createRadioButtons(q) {
    var legend = `<legend class='testArea'>${q.question}</legend><br>`;
    var submit = `<button class="sbmtbttn">Submit</button>`;
    var radio = '';
    q.answers.forEach(function(item, index) {
        radio += createRadioButton(item, index)
    });

    function createRadioButton(answer, value) {
        return ` <input value='${value}' type="radio" id="optionA" name="option">
        <label class='optionA' for="optionA">${answer}</label><br></br>
        <span class="checkmark"></span>`

    }
    questionForm.innerHTML = legend + radio + submit;
}



function updateScore() {
    qNumber.innerHTML = questionNumber + 1;
    qTotal.innerHTML = STORE.length;
    score.innerHTML = getScore();
    resultSpan.innerHTML = `${getScore()}/${STORE.length}`
}

function getScore() {
    var count = 0;
    for (var i = 0; i < STORE.length; i++) {
        if (STORE[i].userCorrect) {
            count++;
        }
    }
    return count;
}

function hideAll() {
    $('.summary').hide();
    $('.quiz').hide();
    $('.scoreCard').hide();
    $('.feedbackArea').hide();
}

function startQuiz() {
    console.log("startQuiz ran");
    event.preventDefault();
    $('.start').hide();
    $('.quiz').show();
    $('.scoreCard').show();
    // createQuestion();
    updateScore();
    createRadioButtons(STORE[questionNumber])
}

// function createQuestion() {
//     console.log("createQuestion ran");
//     // render quiz questions on screen
//     let question = STORE[questionNumber];
//     console.log(question.question);
//     // console.log("***"+question.answers[2] );
//     let startNum = 0;
//     $('.testArea').text(`Question ${startNum}: ${question.question}`);
//     //  for(let i = 0)
//     $('.js-questionForm .optionA').text(question.answers[0]);
//     $('.js-questionForm .optionB').text(question.answers[1]);
//     $('.js-form .optionC').text(question.answers[2]);
//     $('.js-form .optionD').text(question.answers[3]);

// }

function submitAnswer() {
    console.log("submitAnser ran");
    //handle when user presses the submit button

}

function nextQuestion() {
    console.log("nextQuestion ran");
}

function restartQuiz() {
    console.log("restartQuiz ran");
    score = 0;
    questionNumber = 0;
    $('.summary').hide();
    startQuiz();
}

function runQuizApp() {
    startQuiz();
    // createQuestion();
    // submitAnswer();
    // nextQuestion();
}

$('#restartButton').click(restartQuiz)
$('.start a').click(startQuiz);
$(runQuizApp)