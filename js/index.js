//database of critical project info
const STORE = {
    page: 'intro',
    currentQuestion: 0,
    score: 0,
    answers: [],
    questions: [
        {
            image: 'https://cdn.shopify.com/s/files/1/1277/7365/products/Bastet_turn_740x.jpg?v=1561638420',
            title: 'Which protective goddess of cats was often depicted on amulets for good luck?',
            answers: ['Bastet', 'Babi', 'Tawaret', 'Serkhet'],
            correctAnswer: 0
        },
        {   
            image: 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Egyptian_-_Statue_of_Nephthys_-_Walters_22255_-_Right_Profile.jpg',
            title: 'This kind and gentle river goddess was the mother of Anubis:',
            answers: ['Bastet', 'Isis', 'Nephthys', 'Nekhbet'],
            correctAnswer: 2
        },
        {
            image: 'https://cdn.shopify.com/s/files/1/0078/0442/products/1169.jpg?v=1466539430',
            title: 'This god of the desert, storm, and evil controlled all harsh lands outside the Nile Valley:',
            answers: ['Anubis','Osiris','Ra','Set'],
            correctAnswer: 3
        }
    ]
}

function main(){
    // separate code into single-purpose, reusable, clearly named functions
    renderIntroPage();
    manageQuestions();
    displayFeedback();
    // displayFinalResults();
}

function renderIntroPage(){
    // clear all pages except intro
    render();
    
    // when start quiz button clicked, change page to quiz
    $('#start-button').on('click', e =>{
        randomizeArray();
        loadQuestions();
        STORE.page = 'quiz';
        render();
    });
}

function loadQuestions(){
    const question = STORE.questions[STORE.currentQuestion];
    $('#question').text(question.title);

    $('#label-0').html('<input type="radio" name="answer" id="answer-0" value="0">' + question.answers[0]);
    $('#label-1').html('<input type="radio" name="answer" id="answer-1" value="1">' + question.answers[1]);
    $('#label-2').html('<input type="radio" name="answer" id="answer-2" value="2">' + question.answers[2]);
    $('#label-3').html('<input type="radio" name="answer" id="answer-3" value="3">' + question.answers[3]);
    // change image to correspond to current question
    $('.q-img').attr('src', question['image']);
    // display question number
    $('legend').html('<h2>Question ' + (STORE.currentQuestion + 1) + ' / ' + STORE.questions.length + '</h2>');
}
function manageQuestions(){
    
    $('form').on('submit', e=>{
        e.preventDefault();
        // clear current selection so Question load does not contain users previous answer input
        e.target.reset();

        // show current question
        const question = STORE.questions[STORE.currentQuestion];
        
        // track user answer
        let userAnswer = $("input[name='answer']:checked").val();
        console.log('User chose: ' + userAnswer);
        console.log('Correct Answer: ' + question.answers[question.correctAnswer]);
        // compare correct answer vs user answer
        if (userAnswer == question.correctAnswer){
            STORE.score++;
            STORE.answers.push(true);
            displayCorrectFeedback();
        } else {
            STORE.answers.push(false);
            displayIncorrectFeedback();
        }
        STORE.page = 'feedback';
        render();
    });
}


function manageScore(){
    let numRight = 0;
    let numWrong = 0;

    for (let i = 0; i <= STORE.answers.length; i++){
        if (STORE.answers[i] == true){
            numRight++;
            //if answer [] is true, score area should show green
            $('.score-' + i).removeClass('score-unknown');
            $('.score-' + i).addClass('score-correct');
        } else if (STORE.answers[i] == false){
            numWrong++;
            //if answer index if false, score should show red
            $('.score-' + i).removeClass('score-unknown');
            $('.score-' + i).addClass('score-incorrect');
        }
    }

    $('.score p').html(`<span>${numRight} right</span>...<span>${numWrong} wrong</span>`)
}
function clearScore(){
    
    for (let i = 0; i <= STORE.answers.length; i++){
        $('.score-' + i).removeClass('score-incorrect score-correct').addClass('score-unknown');
    }
    STORE.answers = [];
}

function displayFeedback(){
    $('#next-button').on('click', e =>{
        STORE.currentQuestion++;
        
        if (STORE.currentQuestion < STORE.questions.length){    
            // change image to correspond to current question
            $('.q-img').attr('src', STORE.questions[STORE.currentQuestion]['image']);
            loadQuestions();
            STORE.page = 'quiz';
        } else {
            STORE.page = 'results';
            displayFinalResults();
        }
        render();
    })
}

function displayCorrectFeedback(){
    $('#feedback .header-img').attr('src', 'https://vignette.wikia.nocookie.net/vsbattles/images/9/90/500px-Egyptian-sun-god-Ra-myth-legend.jpg/revision/latest?cb=20141124003314');
    $('#feedback h1').text('CORRECT!');
    $('#feedback em').text('May the light of Ra shine upon you!');
}
function displayIncorrectFeedback(){
    const listOfAnswers = STORE.questions[STORE.currentQuestion].answers;
    // console.log(listOfAnswers);
    const correctIndex = STORE.questions[STORE.currentQuestion].correctAnswer;
    // console.log(correctIndex);
    // console.log(listOfAnswers[correctIndex]);

    $('#feedback .header-img').attr('src', 'https://qph.fs.quoracdn.net/main-qimg-9c57374a41a5bea97ffa23b76d7b91bd');
    $('#feedback h1').text('INCORRECT...');
    $('#feedback em').text('Anubis is watching you eagerly...The correct answer is ' + listOfAnswers[correctIndex]);
}

function displayFinalResults(){
    $('#results h3').text('You Answered ' + STORE.score + '/' + STORE.questions.length + ' Questions Correctly!');

    let finalScore = (STORE.score/ STORE.questions.length).toFixed(2);
    $('#results h1').text((finalScore * 100)+ '%')

    if (finalScore == 1){
        $('#result-img').css('background-image', 'url("https://lh3.googleusercontent.com/proxy/rLQM0mtlR1wkUu-iVwXhdYhRqqHRbjYLp2iIPTNV75uHWuRpJA0xlJDIgPcC7qPHfO9hLd0gRoRYdTl9ivFUfKX1H4VuuV-vPB6_BV2z7y8akP8frEOHtsSKvJQGwTB-qmx4OuhTeMlovsatWJxw3TvGCQ")');
        $('#results em').text('Perfect Score!!! Have we found our next Pharaoh!?');
    } else if (finalScore >= .5){
        $('#result-img').css("background-image", 'url("https://www.historyonthenet.com/wp-content/uploads/2017/06/Ancient_Aliens_Great_Pyramid_of_Khufu.jpg")');
        $('#results em').text('Great job! Try again to see if you can do better!');
    } else if (finalScore < .5){
        $('#result-img').css("background-image", 'url("https://a.wattpad.com/cover/123307206-288-k900014.jpg")');
        $('#results em').text("You'll be lost to the sands if you don't do better... try again.");
    }
    
    $('#retry-button').on('click', e =>{
        STORE.page = 'intro';
        STORE.currentQuestion = 0;
        STORE.score = 0;
        clearScore();
        render();
    });
}

function randomizeArray(){
    for (let i = 0; i < STORE.questions.length; i++){
        const randNum = Math.floor(Math.random() * STORE.questions.length);
        const randNum2 = Math.floor(Math.random() * STORE.questions.length);

        const temp = STORE.questions[randNum];

        STORE.questions[randNum] = STORE.questions[randNum2];
        STORE.questions[randNum2] = temp;
    }
}

function render(){
    $('#intro').hide();
    $('#quiz').hide();
    $('#feedback').hide();
    $('#results').hide();

    $('#' + STORE.page).show();
    if (STORE.page == 'quiz'){
        loadQuestions();
        manageScore();
    } else if (STORE.page == 'feedback'){
        manageScore();
    }
}

$(main);