let highscoreEl = document.querySelector('#Highscore')
let timerEl = document.querySelector('#timer')
let headEl = document.querySelector('#head')
let questionsEl = document.querySelector('#questions')
let startBtn = document.querySelector('#startBtn')
let answersEl = document.querySelector('#answers')
let timer
let QI = -1
let highscore = 0

const questions = [
	{
		question: 'Commonly used data types DO NOT include:',
		answers: [
			{ Text: 'strings', correct: false },
			{ Text: 'booleans', correct: false },
			{ Text: 'alerts', correct: true },
			{ Text: 'numbers', correct: false },
		],
	},
	{
		question: 'The condition in an if else statement is enclosed within:___',
		answers: [
			{ Text: 'parentheses', correct: true },
			{ Text: 'curly brackets', correct: false },
			{ Text: 'numbers and strings', correct: false },
			{ Text: 'square brackets', correct: false },
		],
	},
	{
		question: 'Arrays in JavaScript can be used to store:____?',
		answers: [
			{ Text: 'strings', correct: false },
			{ Text: 'booleans', correct: false },
			{ Text: 'alerts', correct: false },
			{ Text: 'all of the above', correct: true },
		],
	},
	{
		question:
			'String values must be enclosed within _____ when being assigned to variables',
		answers: [
			{ Text: 'curly brackets', correct: false },
			{ Text: 'quotes', correct: true },
			{ Text: 'commas', correct: false },
			{ Text: 'periods', correct: false },
		],
	},
	{
		question:
			'A very useful during development and debugging for printing content to the debugger is:',
		answers: [
			{ Text: 'console.log', correct: true },
			{ Text: 'terminal', correct: false },
			{ Text: 'for loops', correct: false },
			{ Text: 'JavaScript', correct: false },
		],
	},
]
for (let i = 0; i < questions.length; i++) {
	const element = questions[i].question
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
	timer = 3
	var timerInterval = setInterval(function () {
		timer--
		timerEl.textContent = timer
		if (timer === 0) {
			clearInterval(timerInterval)
		}
	}, 1000)
}
function setQuestions() {
	// todo

	QI++
	if (QI < questions.length) {
		questionsEl.innerHTML = ''
		questionsEl.innerHTML = questions[QI].question
	} else {
		endQuiz()
	}
}
function setAnswers() {
    // todo
    questions[QI].answers.forEach((answers) => {
        let answersBtn = document.createElement('button')
        answersBtn.innerText = answers.Text
        answersBtn.classList.add('btn')
        if (answers.correct) {
            answersBtn.dataset.correct = answers.correct
            answersBtn.addEventListener('click', function() {
                highscore++
                console.log('correct')
            })
        } else {
            answersBtn.addEventListener('click', function() {
                console.log('incorrect')
            })
        }
        answersEl.appendChild(answersBtn)
        answersBtn.addEventListener('click', function setAnswers2() {
			if (QI > questions.length) {
				endQuiz()
			} else {
				resetState()
				setQuestions()
				setAnswers()
			}
    })
}
		
)}
	

function setHighscore() {
	// todo
	// highscoreEl.addEventListener('click',function () {
	//   let student = {student:localStorage.getItem('Name'),
	//   score: localStorage.getItem('Highscore')}
	//   resetState();
	//   questionsEl.innerHTML = student.student + ' ' + student.score
	// })}
}
function getHighscores(event) {
	// todo

	var FN = document.createElement('input')
	FN.setAttribute('type', 'text')
	FN.setAttribute('name', 'FullName')
	FN.setAttribute('placeholder', 'Enter Your Name')
	FN.setAttribute('id', 'FullName')
	var s = document.createElement('input')
	s.setAttribute('type', 'submit')
	s.setAttribute('value', 'Submit')
	s.addEventListener('click', function (e) {
		e.preventDefault()
		const studentHighscore = {
			student: FN.value,
			score: highscore,
		}
		localStorage.setItem('Name', studentHighscore.student)
		localStorage.setItem('Highscore', studentHighscore.score)
		console.log(studentHighscore)
	})
	questionsEl.appendChild(FN)
	questionsEl.appendChild(s)
}
function getCorrectAnswer(e) {
	// todo
	const selectedBtn = e.target
	const correct = selectedBtn.dataset.correct === 'true'
	if (correct) {
		highscore++
		localStorage.setItem('score', highscore)
		console.log('correct')
	}
}
function resetState() {
	questionsEl.innerHTML = ''
	while (answersEl.firstChild) {
		answersEl.removeChild(answersEl.firstChild)
	}
}
function endQuiz() {
	// todo
	questionsEl.innerHTML = ''
	answersEl.innerHTML = ''
	timerEl.innerHTML = ''
	startBtn.style.visibility = 'visible'
	startBtn.innerHTML = 'Restart Quiz'
	getHighscores()

	startBtn.addEventListener('click', restartQuiz)
}
function restartQuiz() {
	// todo
	QI = -1
}
startBtn.addEventListener('click', startQuiz)
highscoreEl.addEventListener('click', function () {
	let student = {
		student: localStorage.getItem('Name'),
		score: localStorage.getItem('Highscore'),
	}

	// Retrieve the existing high scores from local storage
	let highscores = JSON.parse(localStorage.getItem('Highscores')) || []

	// Add the new high score to the array
	highscores.push(student)

	// Save the updated high scores back to local storage
	localStorage.setItem('Highscores', JSON.stringify(highscores))

	resetState()
	headEl.innerHTML = 'Highscores:'
	questionsEl.innerHTML = highscores
		.map(
			(score) =>
				`<bold>Student: </bold>${score.student}<br> <bold>Score: </bold>${score.score}`
		)
		.join('<br>')
})
