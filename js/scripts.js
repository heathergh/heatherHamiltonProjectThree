const webDevQuiz = {};

webDevQuiz.score = 0;

webDevQuiz.computeScore = () => {
    webDevQuiz.score = $('.correctAnswer').length - $('.incorrectAnswer').length;
};

webDevQuiz.resetScore = () => {
    webDevQuiz.score = 0;
};

webDevQuiz.displayScore = numQuestions => {
    const $userScore = webDevQuiz.score;
    const $scoreText = `<h2>You answered ${$userScore} out of ${numQuestions} questions correctly</h2>`;
    
    $('.userScore').removeClass('hide').html($scoreText);
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

webDevQuiz.selectCorrectAnswer = (questionNumber, correctAnswer) => {
    $(`div.${questionNumber}Choice${correctAnswer.toUpperCase()}`).addClass('correctAnswer');
};

webDevQuiz.compareAnswers = (questionNumber, correctAnswer, numQuestions) => {
    const $userAnswer = $(`input[name=${questionNumber}]:checked`);
    const $userAnswerDivWrapper = $(`input[name=${questionNumber}]:checked`).parent('div');
    
    if ($userAnswer.attr('value') !== correctAnswer) {
        $userAnswerDivWrapper.addClass('incorrectAnswer');
        webDevQuiz.selectCorrectAnswer(questionNumber, correctAnswer);
        webDevQuiz.displayScore(numQuestions);
    }
    
    if ($userAnswer.attr('value') === correctAnswer) {
        $userAnswerDivWrapper.removeClass('incorrectAnswer');
        webDevQuiz.selectCorrectAnswer(questionNumber, correctAnswer);
        webDevQuiz.computeScore();
        webDevQuiz.displayScore(numQuestions);
    }
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
        webDevQuiz.compareAnswers(questionNumber, correctAnswer, numQuestions);
    }
    
    if ($questionAnswerLength === numQuestions) {
        webDevQuiz.compareAnswers(questionNumber, correctAnswer, numQuestions);  
    }
};

webDevQuiz.resetQuiz = () => {
    $('form').trigger('reset');
    $('div').removeClass('incorrectAnswer correctAnswer');
    $('.userScore').addClass('hide').empty();
    webDevQuiz.resetScore();
};

webDevQuiz.processQuizActions = (questionNumber, correctAnswer, numQuestions) => {
    $("button[type='submit']").on('click submit', (event) => {
        event.preventDefault();

        if ($('.correctAnswer').length === numQuestions) {
            return false;
        } else {
            webDevQuiz.validateUserAnswer(questionNumber, correctAnswer, numQuestions);
        }
    });

    $("button[type='reset']").on('click', webDevQuiz.resetQuiz);
};

webDevQuiz.init = () => {
    webDevQuiz.processQuizActions('questionOne', 'd', 4);
    webDevQuiz.processQuizActions('questionTwo', 'c', 4);
    webDevQuiz.processQuizActions('questionThree', 'b', 4);
    webDevQuiz.processQuizActions('questionFour', 'a', 4);
};

$(document).ready(() => {
    webDevQuiz.init();
});