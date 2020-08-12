const STORE = [{
        question: 'Which song did Daft Punk sample in "Harder, Better, Faster, Stronger"?',
        answers: ['"Stronger" by: Kanye West', '"Blackstar" by: David Bowie',
            '"Cola Bottle Baby" by: Edwin Birdsong', '"Maps" by: Yeah Yeah Yeahs'
        ],
        correct: 2,
        userCorrect: false
    },
    {
        question: 'Sublime sampled what song for "Doin" Time"?',
        answers: ['"Summertime" by: Herbie Mann', '"Summertime" by: Dj Jazzy Jeff and the Fresh Prince',
            '"Lady Madonna" by: The Beatles', '"Africa" by: TOTO'
        ],
        correct: 0,
        userCorrect: false
    },
    {
        question: '"Sometimes I Rhyme Slow" by: Nice & Smooth contains a sample of which song?',
        answers: ['"Nobody" by:Shaquille O"Neal', '"D"yer Mak"er" by: Led Zeppelin',
            '"Wake Me Up" by: Avicii', '"Fast Car" by: Tracy Chapman'
        ],
        correct: 3,
        userCorrect: false
    },
    {
        question: 'Lou Reed"s "Walk on the Wild Side" has been sampled over 20 times. Which of these songs is one of those?',
        answers: ['"Ohh la la" by: Faces', '"Can I Kick It?" by: A Tribe Called Quest',
            '"Rhiannon" by: Fleetwood Mac', '"Caroline" by: Amin&eacute'
        ],
        correct: 1,
        userCorrect: false
    },
    {
        question: 'Which Queen song is sampled in Vanilla Ice"s "Ice Ice Baby"?',
        answers: ['"Bohemian Rhapsody"', '"You"re my Best Friend"',
            '"Killer Queen"', '"Under Pressure"'
        ],
        correct: 3,
        userCorrect: false
    }
]

let questionNumber = 0;
var score = 0;


function createRadioButtons(q) {
    var legend = `<fieldset><legend class='testArea'>${q.question}</legend>`;
    var submit = `<button id="submitButton">Submit</button></fieldset>`;
    var radio = '';
    q.answers.forEach(function(item, index) {
        radio += createRadioButton(item, index)
    });

    function createRadioButton(answer, value) {
        if (questionNumber <= STORE.length) {
            return ` <input value='${value}' type="radio" id="optionA" name="option">
  <label class='optionA' for="optionA" required>${answer}</label><br></br>`
        } else {
            $('.quiz').hide();
            $('.scoreCard').hide();
            $('.summary').show();
            $(('#resultSpan')).text(score);
        }
    }
    questionForm.innerHTML = legend + radio + submit;
}


function beginQuiz() {
    $('.summary').hide();
    $('.quiz').hide();
    $('.scoreCard').hide();
    $('.feedbackArea').hide();
    $('.start a').on('click', function() {
        console.log("startQuiz ran");
        event.preventDefault();
        $('.start').hide();
        $('.quiz').show();
        $('.scoreCard').show();
        $('#qNumber').text(questionNumber + 1);
        $('#qTotal').text(STORE.length);
        createRadioButtons(STORE[questionNumber])
    })
}


function onSubmitButtonPressed() {
    $('#questionForm').on('click', '#submitButton', function onSubmitButtonCLicked(e) {
        e.preventDefault();
        let userAnswer = $('input:checked').val();
        if (userAnswer == null) {
            alert('Please make a selection');
            return null;
        }
        if (userAnswer == STORE[questionNumber].correct) {
            score++;
            $('#score').text(score);
            // checkIfEndOfQuiz();
            nextQuestion();
        } else {
            console.log('wrong answer');
            showAnswerIfIncorrect();
            // showAnswerIfIncorrect();
        }
    })
}

function onWrongAnswerGiven() {
    $('.feedbackArea').on('click', '#wrongAnswerNext', function() {
        console.log('next question pressed')
        nextQuestion();
        $('.feedbackArea').hide();
        $('.quiz').show();
        // checkIfEndOfQuiz();
    })
}

function onRestartButtonPressed() {
    $('.summary').on('click', '#restartButton', function() {
        score = 0;
        $('#score').text(score);
        questionNumber = 0;
        console.log('restart quiz pressed');
        $('.summary').hide();
        $('.quiz').hide();
        $('.scoreCard').hide();
        $('.feedbackArea').hide();
        $('.start').show();
    })
}

function nextQuestion() {
    questionNumber++;
    checkIfEndOfQuiz();
    $('#qNumber').text(questionNumber + 1);
    createRadioButtons(STORE[questionNumber])
}

function showAnswerIfIncorrect() {
    var correctIndex = STORE[questionNumber].correct
    var correctAnswer = STORE[questionNumber].answers[correctIndex];
    answerSpan.innerHTML = correctAnswer;
    $('.quiz').hide();
    $('.feedbackArea').show();
}

function checkIfEndOfQuiz() {
    if (questionNumber >= STORE.length) {
        $('.quiz').hide()
        $('.feedbackArea').hide();
        $('#resultSpan').text(score);
        $('.scoreCard').hide()
        $('.summary').show();

    } else {
        // questionNumber++;
        console.log('uggghhh')
        createRadioButtons(STORE[questionNumber])
        $('.quiz').show();
        $('.feedbackArea').hide();
    }
}




function completeQuizApp() {
    beginQuiz();
    onSubmitButtonPressed();
    onWrongAnswerGiven();
    onRestartButtonPressed()
}

$(completeQuizApp)