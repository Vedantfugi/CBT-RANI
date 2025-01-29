document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the results data passed from the main page (e.g., using localStorage or URL params)
    const results = JSON.parse(localStorage.getItem('testResults'));
    
    if (!results) {
      // If no results, redirect to the test page
      window.location.href = 'index.html';
      return;
    }
  
    const resultContainer = document.getElementById("test-results");
  
    // Display summary of results
    resultContainer.innerHTML = `
      <p>✅ Correct: ${results.correctCount}</p>
      <p>❌ Wrong: ${results.wrongCount}</p>
      <p>⚪ Unattempted: ${results.unattemptedCount}</p>
      <p>✔️ Correct Questions: ${results.correctQuestionNumbers.join(", ") || "None"}</p>
      
      <h3>Wrong Questions:</h3>
      ${results.wrongAnswers.length > 0 ? results.wrongAnswers.map(item => `
        <div class="result-question">
          <p><strong>Q: ${item.question}</strong></p>
          <p>Your Answer: <span class="wrong-answer">${item.userAnswer}</span></p>
          <p>Correct Answer: <span class="correct-answer">${item.correctAnswer}</span></p>
        </div>
      `).join('') : "<p>No wrong answers.</p>"}
  
      <h3>Unattempted Questions:</h3>
      ${results.unattemptedQuestions.length > 0 ? results.unattemptedQuestions.map(item => `
        <div class="result-question">
          <p><strong>Q: ${item.question}</strong></p>
          <p>Your Answer: <span class="unattempted">Not Answered</span></p>
          <p>Correct Answer: <span class="correct-answer">${item.correctAnswer}</span></p>
        </div>
      `).join('') : "<p>No unattempted questions.</p>"}
    `;
  });
  