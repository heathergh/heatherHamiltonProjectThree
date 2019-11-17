// each question is inside of a div with a class of question[i]

// on form submit, when the user clicks submit button
// prevent default


const webDevQuiz = {};

webDevQuiz.score = 0;

webDevQuiz.compareAnswers = (questionNumber, correctAnswer) => {
    const $userAnswer = $(`input[name=${questionNumber}]:checked`);
    const $userAnswerDivWrapper = $(`input[name=${questionNumber}]:checked`).parent('div');
    
    if ($userAnswer.attr('value') !== correctAnswer) {
        $userAnswerDivWrapper.addClass('incorrectAnswer');
        webDevQuiz.selectCorrectAnswer(questionNumber, correctAnswer);
    }

    if ($userAnswer.attr('value') === correctAnswer) {
        $userAnswerDivWrapper.removeClass('incorrectAnswer');
        webDevQuiz.selectCorrectAnswer(questionNumber, correctAnswer);
        webDevQuiz.score = webDevQuiz.score + 1;
    }
};

webDevQuiz.selectCorrectAnswer = (questionNumber, correctAnswer) => {
    $(`div.${questionNumber}Choice${correctAnswer.toUpperCase()}`).addClass('correctAnswer');
};

webDevQuiz.validateUserAnswer = (questionNumber, correctAnswer, numQuestions) => {
    const $questionAnswerLength = $(`div[class*=Wrapper]`).find('input:checked').length;
    const $userAnswer = $(`input[name=${questionNumber}]:checked`);
    const $errorMessage = $(`p.${questionNumber} + p.error`);
    
    if ($questionAnswerLength === 0) {
        if ($errorMessage.length) {
            webDevQuiz.focusAndScrollToFirstErrorMessage();
        } else {
            webDevQuiz.insertErrorMessage(questionNumber);
            webDevQuiz.focusAndScrollToFirstErrorMessage();
        }
    }

    if ($questionAnswerLength < numQuestions && $questionAnswerLength > 0) {
        if ($userAnswer.length === 0 && $errorMessage.length === 0) {
            webDevQuiz.insertErrorMessage(questionNumber);
            webDevQuiz.focusAndScrollToFirstErrorMessage();
        }
        
        if ($userAnswer.length && $errorMessage.length) {
            webDevQuiz.removeErrorMessage(questionNumber);
            webDevQuiz.focusAndScrollToFirstErrorMessage();
        }

        if ($errorMessage.length) {
            webDevQuiz.focusAndScrollToFirstErrorMessage();
        }
    }
    
    if ($errorMessage.length > 0 && $questionAnswerLength === numQuestions) {
        webDevQuiz.removeErrorMessage(questionNumber);
        webDevQuiz.compareAnswers(questionNumber, correctAnswer);  
    };

    if ($questionAnswerLength === numQuestions) {
        webDevQuiz.compareAnswers(questionNumber, correctAnswer);  
    };
};

webDevQuiz.insertErrorMessage = questionNumber => {
    const $errorMessage = "<p class=\"error\" role=\"alert\" tabindex=\"0\">You must select an answer</p>";

    $(`p.${questionNumber}`).after($errorMessage);
};

webDevQuiz.removeErrorMessage = questionNumber => {
    $(`p.${questionNumber} + p.error`).remove();
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

webDevQuiz.displayResults = (questionNumber, correctAnswer, numQuestions) => {
    $("button[type='submit']").on('click submit', (event) => {
        event.preventDefault();

        webDevQuiz.validateUserAnswer(questionNumber, correctAnswer, numQuestions);
    });
};

webDevQuiz.init = () => {
    webDevQuiz.displayResults('questionOne', 'd', 4);
    webDevQuiz.displayResults('questionTwo', 'c', 4);
    webDevQuiz.displayResults('questionThree', 'b', 4);
    webDevQuiz.displayResults('questionFour', 'a', 4);
};

$(document).ready(() => {
    webDevQuiz.init();
});


// Stretch Goals:
// choose category: depending on which category the user chooses (HTML, CSS, JavaScript), their choice will show a new quiz form
// dynamically generate quiz: dynamically generate a new quiz from an array of questions and answers and insert into the DOM
// show only one question at a time, and show/remove question only when it's been completed and user clicks on "next question" button

