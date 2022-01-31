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
      question: "1) In a JK flip flop, if J =1 and K =1, then it will be considered as",
      answers: {
        a: "Set condition",
        b: "Reset condition",
        c: "No change",
        d: "Toggle condition"
      },
      correctAnswer: "d"
    },
    {
      question: "2) In JK flip flop, goggles more than once during one clock cycle is called",
      answers: {
        a: "Bouncing",
        b: "Racing",
        c: "Pinging",
        d: "Spiking"
      },
      correctAnswer: "b"
    },
    {
      question: "3) Stuck at faults occur when",
      answers: {
        a: "a line is permanently stuck to Vdd or ground giving a faulty output.",
        b: "a line is temporarily stuck to Vdd or ground giving a faulty output.",
        c: "a line is permanently stuck",
        d: "a line is temporarily stuck"
      },
      correctAnswer: "a"
    },
    {
      question: "4) The flip flops are categorized into",
      answers: {
        a: "1 type",
        b: "2 types",
        c: "3 types",
        d: "4 types"
      },
      correctAnswer: "d"
    },
    {
      question: "5) In which flip flop the present input will be the next output?",
      answers: {
        a: "S-R",
        b: "J-K",
        c: "D",
        d: "T"
      },
      correctAnswer: "c"
    }
  ];

  // Kick things off
  buildQuiz();

  // Event listeners
  submitButton.addEventListener('click', showResults);
})();
