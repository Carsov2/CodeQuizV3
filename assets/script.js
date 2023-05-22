document.addEventListener("DOMContentLoaded", function () {
  const startSection = document.getElementById("start-section");
  const quizContainer = document.getElementById("quiz-container");
  const endSection = document.getElementById("end-section");
  const highscoresSection = document.getElementById("highscores-section");
  const timerElement = document.getElementById("timer");
  const initialsInput = document.getElementById("initials-input");
  const submitButton = document.getElementById("submit-button");
  const highscoresList = document.getElementById("highscores-list");

  const questions = [
      {
          question: "Who is the best soccer player in the world?",
          answers: [
              { text: "Lionel Messi", correct: true },
              { text: "Neymar Jr.", correct: false },
              { text: "Cristiano Ronaldo", correct: false },
              { text: "Kevin De Bruyne", correct: false },
          ],
      },
      {
          question: "Who is the highest scoring basketball player of all time?",
          answers: [
              { text: "Michael Jordan", correct: false },
              { text: "Kobe Bryant", correct: false },
              { text: "Karim Abdul Jabar", correct: false },
              { text: "Lebron James", correct: true },
          ],
      },
      {
          question: "Who is the best Football Quarter Back of all time?",
          answers: [
              { text: "Peyton Manning", correct: false },
              { text: "Tom Brady", correct: true },
              { text: "Terry Bradshaw", correct: false },
              { text: "Big Ben", correct: false },
          ],
      },
      {
          question: "Who runs the family in the show: Peaky Blinders",
          answers: [
              { text: "Tommy Shelby", correct: true },
              { text: "Arthur Shelby", correct: false },
              { text: "Polly Gray", correct: false },
              { text: "John Shelby", correct: false },
          ],
      },
      {
          question: "Who is the 'chosen one' in Star Wars according to George Lucas?",
          answers: [
              { text: "Luke Skywalker", correct: false },
              { text: "Anakin Skywalker", correct: true },
              { text: "Obi-Wan Kenobi", correct: false },
              { text: "Darth Vader", correct: false },
          ],
      },
  ];

  const questionTime = 15;
  let currentQuestionIndex;
  let timeLeft;
  let timerInterval;

  function startQuiz() {
      startSection.style.display = "none";
      quizContainer.style.display = "block";
      currentQuestionIndex = 0;
      timeLeft = 60;
      timerElement.textContent = timeLeft;

      startTimer();

      showQuestion();
  }

  function startTimer() {
      timerInterval = setInterval(function () {
          timeLeft--;
          timerElement.textContent = timeLeft;

          if (timeLeft <= 0) {
              clearInterval(timerInterval);
              endQuiz();
          }
      }, 1000);
  }

  function showQuestion() {
      const questionElement = document.getElementById("q" + (currentQuestionIndex + 1));
      questionElement.style.display = "block";

      const buttons = questionElement.getElementsByClassName("button-container")[0].getElementsByTagName("button");
      for (let i = 0; i < buttons.length; i++) {
          buttons[i].addEventListener("click", handleAnswerClick);
      }
  }

  function handleAnswerClick(event) {
      const selectedButton = event.target;
      const currentQuestion = questions[currentQuestionIndex];
      const selectedAnswer = currentQuestion.answers.find((answer) => answer.text === selectedButton.textContent);

      if (selectedAnswer.correct) {
          selectedButton.classList.add("correct-answer");
      } else {
          selectedButton.classList.add("wrong-answer");
          timeLeft -= 10;
          if (timeLeft < 0) {
              timeLeft = 0;
          }
      }

      currentQuestionIndex++;

      if (currentQuestionIndex < questions.length) {
          setTimeout(showNextQuestion, 1000);
      } else {
          setTimeout(endQuiz, 1000);
      }
  }

  function showNextQuestion() {
      const previousQuestionElement = document.getElementById("q" + currentQuestionIndex);
      previousQuestionElement.style.display = "none";

      showQuestion();
  }

  function endQuiz() {
      clearInterval(timerInterval);

      quizContainer.style.display = "none";
      endSection.style.display = "block";
      document.getElementById("final-score").textContent = timeLeft;

      submitButton.addEventListener("click", function () {
          const initials = initialsInput.value.trim();
          if (initials !== "") {
              const scoreEntry = initials + " - " + timeLeft;
              highscoresList.innerHTML += "<li>" + scoreEntry + "</li>";

              initialsInput.value = "";

              endSection.style.display = "none";
              highscoresSection.style.display = "block";
          }
      });
  }

  function clearHighscores() {
      highscoresList.innerHTML = "";
  }

  function init() {
      const startButton = document.querySelector("button.adjust");
      startButton.addEventListener("click", startQuiz);

      const clearButton = document.getElementById("clear-button");
      clearButton.addEventListener("click", clearHighscores);
  }

  init();
});
