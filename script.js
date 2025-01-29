let questions = [];
let timeLeft = 60;
let selectedAnswers = {}; // Store selected answers
let timer;

// This will be available globally
function saveAnswer(index, answer) {
  selectedAnswers[index] = answer;
  console.log(`Saved answer for Q${index + 1}: ${answer}`);  // Debugging log to verify answer saving
}

document.addEventListener("DOMContentLoaded", () => {
  // Fetch questions from JSON
  fetch("./questions.json")
    .then(response => response.json())
    .then(data => {
      questions = data;
      console.log("Questions Loaded: ", questions);  // Debugging log to verify questions
      displayQuestions();
      startTimer();
    })
    .catch(error => console.error("Error loading questions:", error));

  // Display all questions
  function displayQuestions() {
    const questionContainer = document.getElementById("quiz-container");
    questionContainer.innerHTML = "";

    questions.forEach((q, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.classList.add("question");
      questionDiv.innerHTML = `
        <p><strong>Q${index + 1}:</strong> ${q.question}</p>
        ${q.options.map(option => `
          <label>
            <input type="radio" name="q${index}" value="${option}" onchange="saveAnswer(${index}, '${option}')">
            ${option}
          </label>
        `).join("<br>")}
        <br>
      `;
      questionContainer.appendChild(questionDiv);
    });
  }

  // Timer function
  function startTimer() {
    timer = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timer);
        submitTest();
      } else {
        document.getElementById("timer").innerText = `Time left: ${timeLeft}s`;
        timeLeft--;
      }
    }, 1000);
  }

  // Submit test function
 // Submit test function
function submitTest() {
    clearInterval(timer);
    let correctCount = 0, wrongCount = 0, unattemptedCount = 0;
    let correctQuestionNumbers = [];
    let wrongAnswers = [];
    let unattemptedQuestions = [];
  
    // Loop through each question and compare answers
    questions.forEach((q, index) => {
      const userAnswer = selectedAnswers[index];
      const correctAnswer = q.answer;
  
      if (userAnswer) {
        if (userAnswer === correctAnswer) {
          correctCount++;
          correctQuestionNumbers.push(index + 1);
        } else {
          wrongCount++;
          wrongAnswers.push({
            question: q.question,
            userAnswer: userAnswer,
            correctAnswer: correctAnswer
          });
        }
      } else {
        unattemptedCount++;
        unattemptedQuestions.push({
          question: q.question,
          correctAnswer: correctAnswer
        });
      }
    });
  
    // Store the results in localStorage and redirect to results page
    const results = {
      correctCount,
      wrongCount,
      unattemptedCount,
      correctQuestionNumbers,
      wrongAnswers,
      unattemptedQuestions
    };
  
    localStorage.setItem('testResults', JSON.stringify(results));
    window.location.href = "results.html";
  }
  
  

  // Event listener for submit button
  document.getElementById("submit-btn").addEventListener("click", submitTest);
});
