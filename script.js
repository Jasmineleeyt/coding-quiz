// Set variables to get elements
var introBox = document.querySelector("#intro");
var startBtn = document.querySelector("#start");
var questionsBox = document.querySelector("#question");
var questionText = document.querySelector("#question-text");
var choiceBox = document.querySelector(".choice-box");
var scoreBox = document.querySelector("#outro");
var timerEl = document.querySelector("#time-count");
var feedbackEl = document.querySelector("#feedback");
var choice1El = document.querySelector("#choice-1");
var choice2El = document.querySelector("#choice-2");
var choice3El = document.querySelector("#choice-3");
var choice4El = document.querySelector("#choice-4");
var submitInitial = document.querySelector("#log-score");
var enterInitial = document.querySelector("#initials-box");
var scoreEl = document.querySelector("#result");

// Define questions, choices, and answers
var questions = [
  {
    question: "The condition in an if/else statement is enclosed with ________",
    choice1: "quotes",
    choice2: "curly brackets",
    choice3: "parenthesis",
    choice4: "square brackets",
    correctAnswer: "curly brackets",
  },
  {
    question: "String values must be enclosed within ________ when being assigned to variables.",
    choice1: "commas",
    choice2: "curly brackets",
    choice3: "quotes",
    choice4: "parenthesis",
    correctAnswer: "quotes",
  },
  {
    question: "A very useful tool used during development and debugging for printing content to the debugger is:",
    choice1: "JavaScript",
    choice2: "Terminal/Bash",
    choice3: "For loops",
    choice4: "Console.log",
    correctAnswer: "Console.log",
  },
  {
    question: "Commonly used data types do NOT include:",
    choice1: "Strings",
    choice2: "Booleans",
    choice3: "Alerts",
    choice4: "Numbers",
    correctAnswer: "Alerts",
  },
  {
    question: "Arrays in JavaScript can be used to store:",
    choice1: "Numbers and strings",
    choice2: "Other arrays",
    choice3: "Booleans",
    choice4: "All of the above",
    correctAnswer: "All of the above"
  }
];

var index = 0;
var score = 0;
var timeLeft = 75;
var timerCount;
var penalty = 10;

// When the user clicks on the "Start Quiz!" button, the intro page and outro page get hidden while the questions and choices are rendered.
startBtn.addEventListener("click", function () {
  startTimer();  

  questionsBox.setAttribute("class", "");
  introBox.setAttribute("class", "hidden");
  scoreBox.setAttribute("class", "hidden");

  questionText.innerText = questions[index].question;
  choice1El.innerText = questions[index].choice1;
  choice2El.innerText = questions[index].choice2;
  choice3El.innerText = questions[index].choice3;
  choice4El.innerText = questions[index].choice4;

});

// Timer count down 
function startTimer() {
    timer = setInterval(function () {
        timeLeft--;
        timerEl.textContent = timeLeft;
        // End game when time is up or when the last question is finished
        if(timeLeft === 0){
          clearInterval(timer);
          timesUp();
        } else if (index === questions.length) {
          clearInterval(timer);
          timerEl.setAttribute("class", "hidden");
        }
    }, 1000)
};

//When a choice is clicked, compare the choice selected with the correct answer
choice1El.addEventListener("click", compareAnswer);
choice2El.addEventListener("click", compareAnswer);
choice3El.addEventListener("click", compareAnswer);
choice4El.addEventListener("click", compareAnswer);

// Compare the answer that user selects and goes to the next question/page
function compareAnswer() {
  // Compare answer
  if (this.textContent===questions[index].correctAnswer){
    feedbackEl.textContent = "Correct!";
    score++;
  } else {
    feedbackEl.textContent = "Wrong!";
    timeLeft -= 10;
  }
  // display next question
  index++;
  if (questions.length > index) {
    questionText.textContent = questions[index].question;
    choice1El.textContent = questions[index].choice1;
    choice2El.textContent = questions[index].choice2;
    choice3El.textContent = questions[index].choice3;
    choice4El.textContent = questions[index].choice4;
  };
// When finished with the last question, display the log score page and hide the intro page and questions  
  if (index === questions.length){
    questionsBox.setAttribute("class", "hidden");
    introBox.setAttribute("class", "hidden");
    scoreBox.setAttribute("class", "");
    scoreEl.textContent = "You got " + score + " out of 5!"; 
  }
};

// End game when time is up
function timesUp() {
  questionsBox.setAttribute("class", "hidden");
  introBox.setAttribute("class", "hidden");
  scoreBox.setAttribute("class", ""); 
  scoreEl.textContent = "You got " + score + " out of 5!"; 
};

// Save score by providing the initials
function saveScore() {
  var gameScore = {
    enterInitial: enterInitial.value,
    score: score
  };
  if (enterInitial.value === "") {
    alert("Unable to save score as no initials were provided.");
    return;
  } else {
    // Get initial and score and store it in local storage as a string
    localStorage.setItem('gameScore', JSON.stringify(gameScore));
    // console.log(gameScore)
  }
};

submitInitial.addEventListener("click", function (event) {
  event.preventDefault();
  saveScore();
  scoreBox.setAttribute("class", "hidden"); 
  
  window.location.assign("./scores.html");
});