// each question is inside of a div with a class of question[i]

// on form submit, when the user clicks submit button
// prevent default


const webDevQuiz = {};

webDevQuiz.score = 0;

webDevQuiz.scoreAnswer = (questionNumber, correctAnswer) => {
    const $userAnswer = $(`input[name=${questionNumber}]:checked`);
    const $userAnswerDivWrapper = $(`input[name=${questionNumber}]:checked`).parent('div');
    
    if ($userAnswer.attr('value') !== correctAnswer) {
        $userAnswerDivWrapper.addClass('incorrectAnswer');
        webDevQuiz.highlightCorrectAnswer(questionNumber, correctAnswer);
    } else {
        $userAnswerDivWrapper.removeClass('incorrectAnswer');
        webDevQuiz.highlightCorrectAnswer(questionNumber, correctAnswer);
    }
};

webDevQuiz.highlightCorrectAnswer = (questionNumber, correctAnswer) => {
    $(`div.${questionNumber}Choice${correctAnswer.toUpperCase()}`).addClass('correctAnswer');
};

// find the input value that's checked, if no value is checked, 
webDevQuiz.validateAndCheckAnswer = (questionNumber, correctAnswer) => {
    if ($(`input[name=${questionNumber}]:checked`).val() === undefined) {        
        webDevQuiz.addErrorMessage(questionNumber);    
    };
    
    if ($(`p.${questionNumber} + p.error`) && $(`input[name=${questionNumber}]:checked`).val() !== undefined) {
        $(`p.${questionNumber} + p.error`).remove();
        webDevQuiz.scoreAnswer(questionNumber, correctAnswer);
        webDevQuiz.focusAndScrollToFirstErrorMessage();
    };
};

// prepend the error message and move focus to that div
webDevQuiz.addErrorMessage =  questionNumber => {
    const $errorMessage = "<p class=\"error\" role=\"alert\" tabindex=\"0\">You must select an answer</p>";

    if ($(`p.${questionNumber} + p.error`).length && $(`input[name=${questionNumber}]:checked`).val() !== undefined) {
        webDevQuiz.removeErrorMessage(questionNumber);
        webDevQuiz.focusAndScrollToFirstErrorMessage();
    }
    if ($(`p.${questionNumber} + p.error`).length === 0)  {
        // insert error message after question
        $(`p.${questionNumber}`).after($errorMessage);
        // scroll to first error message and add focus
        webDevQuiz.focusAndScrollToFirstErrorMessage();
    }
};

webDevQuiz.focusAndScrollToFirstErrorMessage = () => {
    const $firstErrorMessage = $('.error:visible').first();
    if ($('.error').length) {
        $('html, body').stop().animate({
            scrollTop: ($firstErrorMessage.offset().top - 20)
        }, 400, () => {
            $firstErrorMessage.focus();
        });
    }
};

webDevQuiz.removeErrorMessage = questionNumber => {
    $(`p.${questionNumber} + p.error`).remove();
};

webDevQuiz.displayResults = (questionNumber, correctAnswer) => {
    $("button[type='submit']").on('click submit', (event) => {
        event.preventDefault();

        webDevQuiz.validateAndCheckAnswer(questionNumber, correctAnswer);
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






// if correct, increase user score variable by 1, change background to green
// if not, change background to red, correct answer background green


// Stretch Goals:
// choose category: depending on which category the user chooses (HTML, CSS, JavaScript), their choice will show a new quiz form
// dynamically generate quiz: dynamically generate a new quiz from an array of questions and answers and insert into the DOM
// show only one question at a time, and show/remove question only when it's been completed and user clicks on "next question" button

