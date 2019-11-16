// each question is inside of a div with a class of question[i]

// on form submit, when the user clicks submit button
// prevent default


const webDevQuiz = {};

webDevQuiz.score = 0;

const correctAnswers = ['questionOneChoiceD', 'questionTwoChoiceC', 'questionThreeChoiceB', 'questionFourChoiceA'];

webDevQuiz.scoreAnswer = (questionNumber, correctAnswer) => {
    if ($(`input[name=${questionNumber}]:checked`).val() !== correctAnswer) {
        $(`input[name=${questionNumber}]:checked`).parent().addClass('incorrectAnswer');
        $(`#${questionNumber}${correctAnswer}`).parent().addClass('correctAnswer');
    } else {
        $('#questionOneChoiceD').addClass('correctAnswer');
        ++webDevQuiz.score;
        return webDevQuiz.score;
    }
};

webDevQuiz.validateAnswer = (questionNumber, correctAnswer) => {
    if ($(`input[name=${questionNumber}]:checked`).length === 0) {
        const $errorMessage = "<p class=\"error\">Please select an answer</p>";
        if ($(`input[name=${questionNumber}]`).siblings('.error').length === 0) {
            $(`input[name=${questionNumber}]`).first().before($errorMessage);
        }
    } else {
        $(`input[name=${questionNumber}]`).siblings('.error').empty();
        webDevQuiz.scoreAnswer(questionNumber, correctAnswer);
    };
};

webDevQuiz.displayResults = (questionNumber, correctAnswer) => {
    $("button[type='submit']").on('click submit', (event) => {
        event.preventDefault();

        webDevQuiz.validateAnswer(questionNumber, correctAnswer);
    });
};

webDevQuiz.init = () => {
    webDevQuiz.displayResults('questionOne', 'd');
    webDevQuiz.displayResults('questionTwo', 'c');
    webDevQuiz.displayResults('questionThree', 'b');
    webDevQuiz.displayResults('questionFour', 'a');
};

$(document).ready(() => {
    webDevQuiz.init();
});

// webDevQuiz.displayResults();
// for each div with the class of question[i]
// find the input value that's checked, if no value is checked, prepend the error message and move focus to that div
// compare it with correct answer for question[i]
// if correct, increase user score variable by 1, change background to green
// if not, change background to red, correct answer background green


// Stretch Goals:
// choose category: depending on which category the user chooses (HTML, CSS, JavaScript), their choice will show a new quiz form
// dynamically generate quiz: dynamically generate a new quiz from an array of questions and answers and insert into the DOM
// show only one question at a time, and show/remove question only when it's been completed and user clicks on "next question" button

