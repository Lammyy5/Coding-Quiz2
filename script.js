let highscoreEl = document.querySelector('#highscore');
let timerEl = document.querySelector('#timer');
let headEl = document.querySelector('#head');
let questionsEl = document.querySelector('#questions');
let startBtn = document.querySelector('#startBtn');
let answersEl = document.querySelector('#answers');
let timer;
let QI = -1;
const questions = [
  {
    question: "Commonly used data types DO NOT include:",
    answers: [
      { Text: 'strings', correct: false },
      { Text: 'booleans', correct: false },
      { Text: 'alerts', correct: true },
      { Text: 'numbers', correct: false },
    ]
  },
  {
    question: 'The condition in an if else statement is enclosed within:___',
    answers: [
      { Text: 'parentheses', correct: true },
      { Text: 'curly brackets', correct: false },
      { Text: 'numbers and strings', correct: false },
      { Text: 'square brackets', correct: false },
    ]
  },
  {
    question: 'Arrays in JavaScript can be used to store:____?',
    answers: [
      { Text: 'strings', correct: false },
      { Text: 'booleans', correct: false },
      { Text: 'alerts', correct: false },
      { Text: 'all of the above', correct: true },
    ]
  },
  {
    question: 'String values must be enclosed within _____ when being assigned to variables',
    answers: [
      { Text: 'curly brackets', correct: false },
      { Text: 'quotes', correct: true },
      { Text: 'commas', correct: false },
      { Text: 'periods', correct: false },
    ]
  },
  {
    question: 'A very useful during development and debugging for printing content to the debugger is:',
    answers: [
      { Text: 'console.log', correct: true },
      { Text: 'terminal', correct: false },
      { Text: 'for loops', correct: false },
      { Text: 'JavaScript', correct: false },
    ]
  }
]
for (let i = 0; i < questions.length; i++) {
  const element = questions[i].question;
  console.log(questions[i].answers)
}
console.log()
// Functions
function startQuiz() {
  setTime()
  setQuestions()
  setAnswers()
  startBtn.style.visibility = 'hidden'

}
function setTime() {
  timer = 3;
  var timerInterval = setInterval(function () {
    timer--;
    timerEl.textContent = timer
    if (timer === 0) {
      clearInterval(timerInterval);

    }
  }, 1000)
}
function setQuestions() {
  // todo
  

  QI++
  if (QI < questions.length) {
      questionsEl.innerHTML = '';
      questionsEl.innerHTML = questions[QI].question;
  }else{
    endQuiz()
  }
}
function setAnswers() {
  // todo

  questions[QI].answers.forEach(answers => {
    let answersBtn = document.createElement('button');
    answersBtn.innerText = answers.Text;
    answersBtn.classList.add('btn');
    if (answers.correct) {
      answersBtn.dataset.correct = answers.correct
      console.log('correct')
    }
    answersEl.appendChild(answersBtn);
    answersBtn.addEventListener('click',function setAnswers2() {
      if (QI > questions.length) {
        endQuiz()
      }else{
      resetState()
      setQuestions()
      setAnswers()
    }})
  });
}
function setHighscore() {
  // todo
}
function getHighscores() {
  // todo
}
function getCorrectAnswer() {
  // todo
}
function resetState() {
  questionsEl.innerHTML = '';
  answersEl.innerHTML = '';
}
function endQuiz() {
  // todo
  questionsEl.innerHTML = '';
  answersEl.innerHTML = '';
  timerEl.innerHTML = '';
  startBtn.style.visibility = 'visible'
  startBtn.innerHTML = 'Restart Quiz'
  let form = document.createElement('form')
  let nameInput = document.createElement('input')
  startBtn.addEventListener('click',restartQuiz)
} 
function restartQuiz() {
  // todo
  QI = -1;
} 
startBtn.addEventListener('click', startQuiz)