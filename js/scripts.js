const app = {};

app.score = 0;

app.computeScore = () => {
    app.score = $('.correctAnswer').length - $('.incorrectAnswer').length;
};

app.resetScore = () => {
    app.score = 0;
};

app.displayScore = numQuestions => {
    const $userScore = app.score;
    const $scoreText = `<h2>You answered ${$userScore} out of ${numQuestions} questions correctly</h2>`;
    
    $('.userScore').removeClass('hide').html($scoreText);
};

app.insertErrorMessage = questionNumber => {
    const $errorMessage = "<p class=\"error\" role=\"alert\" tabindex=\"0\">You must select an answer</p>";

    $(`p.${questionNumber}`).after($errorMessage);
};

app.removeErrorMessage = questionNumber => {
    $(`p.${questionNumber} + p.error`).remove();
};

app.focusAndScrollToFirstErrorMessage = () => {
    const $firstErrorMessage = $('.error:visible').first();
    
    if ($('.error').length) {
        $('html, body').stop().animate({
            scrollTop: ($firstErrorMessage.offset().top - 20)
        }, 400, () => {
            $firstErrorMessage.focus();
        });
    }
};

app.selectCorrectAnswer = (questionNumber, correctAnswer) => {
    $(`div.${questionNumber}Choice${correctAnswer.toUpperCase()}`).addClass('correctAnswer');
};

app.compareAnswers = (questionNumber, correctAnswer, numQuestions) => {
    const $userAnswer = $(`input[name=${questionNumber}]:checked`);
    const $userAnswerDivWrapper = $(`input[name=${questionNumber}]:checked`).parent('div');
    
    if ($userAnswer.attr('value') !== correctAnswer) {
        $userAnswerDivWrapper.addClass('incorrectAnswer');
        app.selectCorrectAnswer(questionNumber, correctAnswer);
        app.displayScore(numQuestions);
    }
    
    if ($userAnswer.attr('value') === correctAnswer) {
        $userAnswerDivWrapper.removeClass('incorrectAnswer');
        app.selectCorrectAnswer(questionNumber, correctAnswer);
        app.computeScore();
        app.displayScore(numQuestions);
    }
};

app.validateUserAnswer = (questionNumber, correctAnswer, numQuestions) => {
    const $questionAnswerLength = $(`div[class*=Wrapper]`).find('input:checked').length;
    const $userAnswer = $(`input[name=${questionNumber}]:checked`);
    const $errorMessage = $(`p.${questionNumber} + p.error`);
    
    if ($questionAnswerLength === 0) {
        if ($errorMessage.length) {
            app.focusAndScrollToFirstErrorMessage();
        } else {
            app.insertErrorMessage(questionNumber);
            app.focusAndScrollToFirstErrorMessage();
        }
    }

    if ($questionAnswerLength < numQuestions && $questionAnswerLength > 0) {
        if ($userAnswer.length === 0 && $errorMessage.length === 0) {
            app.insertErrorMessage(questionNumber);
            app.focusAndScrollToFirstErrorMessage();
        }
        
        if ($userAnswer.length && $errorMessage.length) {
            app.removeErrorMessage(questionNumber);
            app.focusAndScrollToFirstErrorMessage();
        }

        if ($errorMessage.length) {
            app.focusAndScrollToFirstErrorMessage();
        }
    }
    
    if ($errorMessage.length > 0 && $questionAnswerLength === numQuestions) {
        app.removeErrorMessage(questionNumber);
        app.compareAnswers(questionNumber, correctAnswer, numQuestions);
    }
    
    if ($questionAnswerLength === numQuestions) {
        app.compareAnswers(questionNumber, correctAnswer, numQuestions);  
    }
};

app.resetQuiz = () => {
    $('form').trigger('reset');
    $('div').removeClass('incorrectAnswer correctAnswer');
    $('.userScore').addClass('hide').empty();
    app.resetScore();
};

app.processQuizActions = (questionNumber, correctAnswer, numQuestions) => {
    $("button[type='submit']").on('click submit', (event) => {
        event.preventDefault();

        if ($('.correctAnswer').length === numQuestions) {
            return false;
        } else {
            app.validateUserAnswer(questionNumber, correctAnswer, numQuestions);
        }
    });

    $("button[type='reset']").on('click', app.resetQuiz);
};

app.init = () => {
    app.processQuizActions('questionOne', 'd', 4);
    app.processQuizActions('questionTwo', 'c', 4);
    app.processQuizActions('questionThree', 'b', 4);
    app.processQuizActions('questionFour', 'a', 4);
};

$(document).ready(() => {
    app.init();
});