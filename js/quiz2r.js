(function(){
  function buildQuiz(){
    // variable to store the HTML output
    const output = [];

    // for each question...
    myQuestions.forEach(
      (currentQuestion, questionNumber) => {

        // variable to store the list of possible answers
        const answers = [];

        // and for each available answer...
        for(letter in currentQuestion.answers){

          // ...add an HTML radio button
          answers.push(
            `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
          );
        }

        // add this question and its answers to the output
        output.push(
          `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join('')} </div>`
        );
      }
    );

    // finally combine our output list into one string of HTML and put it on the page
    quizContainer.innerHTML = output.join('');
  }

  function showResults(){

    // gather answer containers from our quiz
    const answerContainers = quizContainer.querySelectorAll('.answers');

    // keep track of user's answers
    let numCorrect = 0;

    // for each question...
    myQuestions.forEach( (currentQuestion, questionNumber) => {

      // find selected answer
      const answerContainer = answerContainers[questionNumber];
      const selector = `input[name=question${questionNumber}]:checked`;
      const userAnswer = (answerContainer.querySelector(selector) || {}).value;

      // if answer is correct
      if(userAnswer === currentQuestion.correctAnswer){
        // add to the number of correct answers
        numCorrect++;

        // color the answers green
        answerContainers[questionNumber].style.color = 'black';
      }
      // if answer is wrong or blank
      else{
        // color the answers red
        answerContainers[questionNumber].style.color = 'red';
      }
    });

    // show number of correct answers out of total
    resultsContainer.innerHTML = `${numCorrect} out of ${myQuestions.length}`;
  }

  const quizContainer = document.getElementById('quiz');
  const resultsContainer = document.getElementById('results');
  const submitButton = document.getElementById('submit');
  const myQuestions = [
    {
      question: "1) There are total ______ steps for flip flop conversions",
      answers: {
        a: "1",
        b: "2",
        c: "3",
        d: "5"
      },
      correctAnswer: "d"
    },
    {
      question: "2) The flip flops works with ________",
      answers: {
        a: "Binary inputs",
        b: "Clock signal",
        c: "Both a and b",
        d: "None of the above"
      },
      correctAnswer: "c"
    },
    {
      question: "3) Flip-flops can be used as register",
      answers: {
        a: "True",
        b: "False",
       
      },
      correctAnswer: "b"
    },
    {
      question: "4) When S=0, R=0, CLK=X then the output will be ___________",
      answers: {
        a: "No change",
        b: "Set",
        c: "Reset",
        d: "Invalid"
      },
      correctAnswer: "a"
    },
    {
      question: "5) When reset is low and set is high in a NAND D-latch table then the output will be",
      answers: {
        a: "No change",
        b: "High",
        c: "Low",
        d: "Invalid"
      },
      correctAnswer: "b"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();
