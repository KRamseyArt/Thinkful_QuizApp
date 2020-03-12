//database of critical project info
const STORE = {
    page: 'intro',
    currentQuestion: 0,
    score: 0,
    answers: [],
    questions: [
        // contains all information for questions in this quiz
        {
            image:
                ['https://cdn.shopify.com/s/files/1/1277/7365/products/Bastet_turn_740x.jpg?v=1561638420',
                'Image of the Egyptian goddess of cats, a commonly used good luck charm'],
            title: 'Which protective goddess of cats was often depicted on amulets for good luck?',
            answers: ['Bastet', 'Babi', 'Tawaret', 'Serkhet'],
            correctAnswer: 0
        },
        {   
            image:
                ['https://upload.wikimedia.org/wikipedia/commons/d/d1/Egyptian_-_Statue_of_Nephthys_-_Walters_22255_-_Right_Profile.jpg',
                'Image of the Egyptian river goddess, mother of Anubis'],
            title: 'This kind and gentle river goddess was the mother of Anubis:',
            answers: ['Bastet', 'Isis', 'Nephthys', 'Nekhbet'],
            correctAnswer: 2
        },
        {
            image:
                ['https://cdn.shopify.com/s/files/1/0078/0442/products/1169.jpg?v=1466539430',
                'Image of an evil Egyptian god of desert and storms'],
            title: 'This god of the desert, storm, and evil controlled all harsh lands outside the Nile Valley:',
            answers: ['Anubis','Osiris','Ra','Set'],
            correctAnswer: 3
        },
        {
            image:
                ['https://lh5.googleusercontent.com/proxy/WNEIOSyktXGrl1ZQ9UEhhdwzaEXX2WpZLw_t2vInD91xKxeLM5_gpRT5E_8ENFhpq-aa6sDMCBgAuvdmjCIfVbOi3qb1XnIL6KBFDC9Wl0KFRBOjjDCx1AR-TtcRB9ip2bmGUc1lpKtC32lFoU4NkkBxmm-QBsN6pQMJvQ',
                'Image of the Egyptian god of air, who held the sky above the earth'],
            title: 'This god of air prevents his daughter (the goddess of sky) from visiting her love (the god of earth):',
            answers: ['Geb','Shu','Nut','Set'],
            correctAnswer: 1
        },
        {
            image:
                ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQL7PPRZnWDTHPGUmWwwwPrnk3f9lnj3gukNAVEqrUXHRQqczdi',
                'Image of the Egyptian god of the sun, known as the first pharaoh'],
            title: 'Which god of the sun was the first pharaoh of the world?',
            answers: ['Ra','Horus','Sobek','Set'],
            correctAnswer: 0
        },
        {
            image:
                ['https://cdn.shoplightspeed.com/shops/608314/files/1849091/omen-sitting-anubis-statue-in-black-and-gold-finis.jpg',
                'Image of the Egyptian god of the afterlife, an assuring presence during final times'],
            title: 'This god of funerals helped prepare solus for the afterlife, and escorts them to the Hall of Judgment:',
            answers: ['Khonsu','Babi','Osiris','Anubis'],
            correctAnswer: 3
        },
        {
            image:
                ['https://dlp2gfjvaz867.cloudfront.net/product_photos/18306708/e-215gp-thoth-egyptian-god-o_original.jpg',
                'Image of the Egyptian god of writing, credited with teaching language to mankind'],
            title: 'This god of writing and wisdom is said to possess knowledge of magic and secrets unknown to other gods:',
            answers: ['Horus','Bes','Nun','Thoth'],
            correctAnswer: 3
        },
        {
            image:
                ['https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRsvydn8P3TF6jANxPRUzOwrvtObt_JXDX4GJiAk1NZMzIyge7m',
                'Image of an evil Egyptian god of the moon, known for killing other gods'],
            title: 'This bloodthirsty god of the moon is fabled to have feasted on the hearts of other gods:',
            answers: ['Amon','Set','Khonsu','Anubis'],
            correctAnswer: 2
        },
        {
            image:
                ['https://images-na.ssl-images-amazon.com/images/I/41GoqBoTmgL._AC_SY400_.jpg',
                'Image of the Egyptian goddess of truth, a symbol of order and balance'],
            title: 'Which goddess of truth, justice, and cosmic order holds the balance of the stars and seasons?',
            answers: ['Tawaret','Maat','Isis','Bastet'],
            correctAnswer: 1
        },
        {
            image:
                ['https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDUhoqXISm1pAfXnDXmbFsEXyHndIX8K6U6oBQbXbvHO5gp0Dm&s',
                'Image of the Egyptian god of the underworld, once a wise and gracious pharaoh'],
            title: 'This god of the underworld was originally a wise pharaoh who taught mankind about farming:',
            answers: ['Osiris','Anubis','Ptah','Set'],
            correctAnswer: 0
        }
    ]
}

function main(){
    // separate code into single-purpose, reusable, clearly named functions
    renderIntroPage();
    manageQuestions();
    displayFeedback();
}

function renderIntroPage(){
    // clear all page IDs except #intro
    // when start quiz button clicked, change page to #quiz
    render();
    
    $('#start-button').on('click', e =>{
        randomizeArray();
        loadQuestions();
        STORE.page = 'quiz';
        render();
    });
}

function loadQuestions(){
    // load question, answers, and image from STOREd list of Questions
    const question = STORE.questions[STORE.currentQuestion];
    $('#question').text(question.title);

    $('#label-0').text(question.answers[0]);
    $('#label-1').text(question.answers[1]);
    $('#label-2').text(question.answers[2]);
    $('#label-3').text(question.answers[3]);
    
    $('.q-img').attr({
        src: question['image'][0],
        alt: question['image'][1] 
    });
    // display question number
    $('legend').html('<h2>Question ' + (STORE.currentQuestion + 1) + ' / ' + STORE.questions.length + '</h2>');
}

function manageQuestions(){
    // On formsubmission, compare user answer vs correct answer and add result to the score counter.
    // Alter feedback page to correlate to correct/incorrect input, and then display feedback page
    $('form').on('submit', e=>{
        e.preventDefault();

        let userAnswer = $('input[type="radio"][name="answer"]:checked').val();
        
        const question = STORE.questions[STORE.currentQuestion];
        
        if (userAnswer == question.correctAnswer){
            STORE.score++;
            STORE.answers.push(true);
            displayCorrectFeedback();
        } else {
            STORE.answers.push(false);
            displayIncorrectFeedback();
        }
        // clear current selection
        e.target.reset();

        STORE.page = 'feedback';
        render();
    });
}    



function manageScore(){
    // Control colors and count of Score menu display
    let numRight = 0;
    let numWrong = 0;

    for (let i = 0; i <= STORE.answers.length; i++){
        if (STORE.answers[i] == true){
            numRight++;
            // if user answered correctly, show green
            $('.score-' + i).removeClass('score-unknown').addClass('score-correct');
        } else if (STORE.answers[i] == false){
            numWrong++;
            // if user answered incorrectly, show red
            $('.score-' + i).removeClass('score-unknown').addClass('score-incorrect');
        }
    }

    $('.score p').html(`<span>${numRight} right</span>...<span>${numWrong} wrong</span>`)
}

function clearScore(){
    // Clear Score tracking for use on page reload/ quiz retry
    for (let i = 0; i <= STORE.answers.length; i++){
        $('.score-' + i).removeClass('score-incorrect score-correct').addClass('score-unknown');
    }
    STORE.answers = [];
}

function displayFeedback(){
    // determine whether or not to continue cycling questions or advance to final results screen
    $('#next-button').on('click', e =>{
        STORE.currentQuestion++;
        
        if (STORE.currentQuestion < STORE.questions.length){    
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
    // alter feedback screen to reflect correct user answer
    $('#feedback .header-img').attr({
        src: 'https://vignette.wikia.nocookie.net/vsbattles/images/9/90/500px-Egyptian-sun-god-Ra-myth-legend.jpg/revision/latest?cb=20141124003314',
        alt: 'Image of the Egyptian god Ra, standing valiantly with arms outstretched'
    });
    $('#feedback h1').text('CORRECT!');
    $('#feedback em').text('May the light of Ra shine upon you!');
}
function displayIncorrectFeedback(){
    // alter feedback screen to reflect incorrect user answer
    const listOfAnswers = STORE.questions[STORE.currentQuestion].answers;
    const correctIndex = STORE.questions[STORE.currentQuestion].correctAnswer;

    $('#feedback .header-img').attr({
        src: 'https://qph.fs.quoracdn.net/main-qimg-9c57374a41a5bea97ffa23b76d7b91bd',
        alt: 'Image of the Egyptian god Anubis, glaring intently through the screen'
    });
    $('#feedback h1').text('INCORRECT...');
    $('#feedback em').text('Anubis is watching you eagerly...The correct answer is ' + listOfAnswers[correctIndex]);
}

function displayFinalResults(){
    // calculate final score, display varying text/image based on results
    $('#results h3').text('You Answered ' + STORE.score + '/' + STORE.questions.length + ' Questions Correctly!');

    let finalScore = (STORE.score/ STORE.questions.length).toFixed(2);
    $('#results h1').text((finalScore * 100)+ '%')

    if (finalScore == 1){
        $('#result-img').attr({
            src: 'https://2.bp.blogspot.com/-qWI0lQ2rlNg/TnkFR5tIFfI/AAAAAAAAAKQ/k9XkKoVirds/s1600/sarcophL0411_468x1385.jpg',
            alt: 'Image of a pristine golden sarcophagus, a tomb worthy of a Pharaoh'
        });
        $('#results em').text('Perfect Score!!! Have we found our next Pharaoh!?');
    } else if (finalScore >= .5){
        $('#result-img').attr({
            src: 'https://www.historyonthenet.com/wp-content/uploads/2017/06/Ancient_Aliens_Great_Pyramid_of_Khufu.jpg',
            alt: 'Image of an ancient sphynx positioned directly in front of a pyramid'
        });
        $('#results em').text('Great job! Try again to see if you can do better!');
    } else if (finalScore < .5){
        $('#result-img').attr({
            src: 'https://a.wattpad.com/cover/123307206-288-k900014.jpg',
            alt: 'Image of a cursed mummy chasing you through a tomb'
        });
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
    // randomize the order in which questions are asked
    for (let i = 0; i < STORE.questions.length; i++){
        const randNum = Math.floor(Math.random() * STORE.questions.length);
        const randNum2 = Math.floor(Math.random() * STORE.questions.length);

        const temp = STORE.questions[randNum];

        STORE.questions[randNum] = STORE.questions[randNum2];
        STORE.questions[randNum2] = temp;
    }
}

function render(){
    // hide unnecessary page IDs from window until needed
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