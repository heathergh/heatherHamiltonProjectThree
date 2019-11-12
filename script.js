/***
Pseudocode for Bootcamp quiz

quizQuestion array of objects. Each object has the keys 'question', 'answer' (which is an object with four keys a, b, c, and d and corresponding answers), and 'correctAnswer' which is a value of a, b, c or d

Two functions:
1) createQuizContent
3) validateAnswer

createQuizContent function
    use a for loop to loop over array quizQuestions.

    use loop to store answer value in a variable

    for...in loop to access the 'answer' properties to create a radio button with a value and id set of their key (e.g. a, b, c or d) and a label which contains the answer.
    This HTML variable will be appended to the answers div.

    answer variable will be be inserted into the question div


validateAnswer
    set up event listener for when user submits the form
    prevent default
    check the input value that has the attribute of checked
    if the value of the checked input matches the correctAnswer value, then insert text after answer div that reads "your answer is correct"
    if radio button with checked attribute does not match the correctAnswer value, insert text after div that reads "Your answer is incorrect. The correct answer is x: blah blah blah", which will use the correctAnswer key and value.
        --> how do I make this accessible? Should I use an aria-live attribute?

    if there is no radio button selected, show error message by inserting it in the DOM before the submit button with message "Please select an answer"


***/