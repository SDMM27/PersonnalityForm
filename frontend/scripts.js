// frontend/scripts.js
function startQuiz(quizType) {
  fetch(`http://localhost:3000/quiz/${quizType}`)
    .then((response) => response.json())
    .then((data) => {
      // Afficher les questions du quiz
      console.log(data);
      // Vous pouvez rediriger vers une page de quiz et afficher les questions là-bas
      window.location.href = `${quizType}.html`;
    })
    .catch((error) => console.error("Error:", error));
}
