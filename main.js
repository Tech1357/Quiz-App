const questions = [{
  question: "Which of the following is an application of machine learning?",
  options: ["Sentiment analysis", "Traffic prediction", "Speech and face recognition", "All of the above"],
  answer: "All of the above"
},
{
  question: "Which machine learning algorithm is based on the idea of bagging?",
  options: ["Decision tree", "Random forest", "Classification", "Regression"],
  answer: "Random forest"
},
{
  question: "Which of the following is a common class of problems in machine learning?",
  options: ["Regression", "Classification", "Clustering", "All of the above"],
  answer: "All of the above"
},
{
  question: "Which of the following is not a supervised learning algorithm?",
  options: ["Linear regression", "Logistic regression", "K-means clustering", "Support vector machine"],
  answer: "K-means clustering"
},
{
  question: "Which evaluation metric is commonly used for classification tasks when class imbalance is present?",
  options: ["Mean Squared Error (MSE)", "Accuracy", "F1-score", "R-squared"],
  answer: "F1-score"
},
{
  question: "Which algorithm is most suitable for finding groups within data?",
  options: ["Linear Regression", "Decision Tree", "K-Means Clustering", "Naive Bayes"],
  answer: "K-Means Clustering"
},
{
  question: "Which of the following is a dimensionality reduction technique?",
  options: ["PCA", "SVM", "CNN", "LSTM"],
  answer: "PCA"
},
{
  question: "What does overfitting refer to in machine learning?",
  options: [
    "Model performs poorly on training data",
    "Model performs well on unseen data",
    "Model performs well on training data but poorly on unseen data",
    "Model is too simple for the data"
  ],
  answer: "Model performs well on training data but poorly on unseen data"
},
{
  question: "Which ML technique uses rewards and penalties for learning?",
  options: ["Supervised Learning", "Reinforcement Learning", "Unsupervised Learning", "Semi-supervised Learning"],
  answer: "Reinforcement Learning"
},
{
  question: "Which one is an example of a loss function in regression problems?",
  options: ["Cross Entropy", "Hinge Loss", "Mean Squared Error", "Log Loss"],
  answer: "Mean Squared Error"
}];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const resultDiv = document.getElementById("result");

const nextBtn = document.getElementById("next");
const prevBtn = document.getElementById("previous");
const submitBtn = document.getElementById("submit");
const answeredCount = document.getElementById("answered-count");

function updateAnsweredTracker() {
  const count = userAnswers.filter(ans => ans !== undefined).length;
  answeredCount.textContent = count;
}

function displayQuestion() {
  const q = questions[currentQuestion];
  questionDiv.innerHTML = `<h2>Q${currentQuestion + 1}: ${q.question}</h2>`;
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const button = document.createElement("button");
    button.textContent = option;

    if (userAnswers[currentQuestion] === option) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => {
      userAnswers[currentQuestion] = option;
      document.querySelectorAll("#options button").forEach(btn => btn.classList.remove("selected"));
      button.classList.add("selected");
      updateAnsweredTracker();
    });

    optionsDiv.appendChild(button);
  });

  updateAnsweredTracker();
}

nextBtn.addEventListener("click", () => {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    displayQuestion();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentQuestion > 0) {
    currentQuestion--;
    displayQuestion();
  }
});

submitBtn.addEventListener("click", showResult);

function showResult() {
  score = 0;
  questions.forEach((q, i) => {
    if (userAnswers[i] === q.answer) {
      score++;
    }
  });

  resultDiv.innerHTML = `
    <div class="result-content">
      <p>You scored ${score} out of ${questions.length}</p>
    </div>
  `;

  nextBtn.disabled = true;
  prevBtn.disabled = true;
  submitBtn.disabled = true;
  clearInterval(timerInterval);
}

// ⏳ Timer
let timeLeft = 600; // 10 minutes
const timerSpan = document.getElementById("timer");

const timerInterval = setInterval(() => {
  timeLeft--;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerSpan.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

  if (timeLeft <= 60) timerSpan.style.color = "orange";
  if (timeLeft <= 30) timerSpan.style.color = "red";

  if (timeLeft <= 0) {
    clearInterval(timerInterval);
    autoSubmit();
  }
}, 1000);

function autoSubmit() {
  showResult();
  timerSpan.textContent = "00:00";
}

// Init first question
displayQuestion();