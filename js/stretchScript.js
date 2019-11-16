/***
Pseudocode for Bootcamp quiz

quizQuestion array of 4 objects. Each object has the keys 'question', 'answer' (which is an object with four keys a, b, c, and d and corresponding answers), and 'correctAnswer' which is a value of a, b, c or d

Three functions:
1) createQuizContent
2 ) getCorrectAnswers
3) validateAnswer

createQuizContent function
    use a for loop to loop over array quizQuestions.

    use loop to store correct answer value in an array

    for...in loop

    access the 'answer' properties to create a radio input with a name = question[number] and id set of their letter key (e.g. a, b, c or d) and a label which contains the answer and a 'for' attribute that matches the id

    nested inside a div with the class question[indexOfQuestionObject]
        -> Question variable will be be inserted into the question div in the DOM
        -> The radio button/label HTML variable will be appended to the answers div in the DOM




checkUserAnswerAgainstCorrectAnswer function, parameters


    find all checked radio inputs get name and ids, push to array

    get the name value of the checked input

    get the correctAnswer value for that question

    check that the selected radio input id matches the correctAnswer value of that question number

    if the value of the checked input matches the correctAnswer value, then change background of answer to green and bold text and increase score variable by 1

    if radio button with checked attribute does not match the correctAnswer value, change background of user's choice to red and change correct answer background to green and bold text.
        --> how do I make this accessible? Should I use an aria-live attribute to notify screen reader users?


validateAnswer function
    set up event listener for when user submits the form
    when user clicks submit button
    prevent default

    check that each question has a selected answer

    checkUserAnswerAgainstCorrectAnswer();






    for loop to check currentQuestionAnswer

        check each input value that has the attribute of checked to find user's answer
        -> if there is not an input checked, show error message above that question

    if every question has an input selected, push the user's answers to an array

    for...loop





    if there is no radio button selected, show error message by inserting it in the DOM before the question in the error div


show total correct answers out of # of questions

***/