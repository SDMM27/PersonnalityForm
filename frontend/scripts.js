let currentQuizType = ''; // Variable globale pour stocker le type de quiz actuel
let currentQuestionIndex = 0;
let questions = [];

// Fonction pour charger et afficher les questions d'un quiz
function loadQuiz(quizType) {
    console.log(`Loading quiz: ${quizType}`);
    fetch(`http://localhost:3000/quiz/${quizType}`)
        .then(response => response.json())
        .then(data => {
            questions = data;
            currentQuizType = quizType;
            currentQuestionIndex = 0;
            displayQuizIntro();
            displayQuestion();
        })
        .catch(error => console.error('Error:', error));
}

// Affiche l'introduction du quiz
function displayQuizIntro() {
    const quizIntro = document.getElementById('quiz-intro');
    const quizContainer = document.getElementById('quiz-container');
    const quizSubtitle = document.getElementById('quiz-subtitle');

    console.log('Elements in displayQuizIntro:', { quizIntro, quizContainer, quizSubtitle });

    if (!quizIntro || !quizContainer || !quizSubtitle) {
        console.error('Un ou plusieurs éléments nécessaires ne sont pas trouvés dans le DOM.');
        return;
    }

    quizIntro.style.display = 'none';
    quizContainer.style.display = 'block';
    quizSubtitle.innerText = `Spéciale ${currentQuizType}`;
}

// Affiche la question actuelle
function displayQuestion() {
    const question = questions[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    console.log('Displaying question:', question);

    if (!questionContainer) {
        console.error('Question container not found.');
        return;
    }
    questionContainer.innerHTML = `<p style="font-weight: bold;">${question.question}</p>`;
    
    const optionsElem = document.createElement('div');
    optionsElem.className = 'options';

    // Randomiser les options de réponse
    const shuffledOptions = question.options.sort(() => Math.random() - 0.5);

    shuffledOptions.forEach(option => {
        const optionButton = document.createElement('div');
        optionButton.className = 'option';
        optionButton.innerText = option;
        optionButton.onclick = function() { selectOption(option, question.question); };

        optionsElem.appendChild(optionButton);
    });

    questionContainer.appendChild(optionsElem);
    updateProgress();
    updateNavigationButtons();
}

// Gère la sélection d'option
let userAnswers = {};
function selectOption(option, question) {
    userAnswers[question] = option;
    nextQuestion();
}

// Passe à la question suivante
function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        submitQuiz(currentQuizType);
    }
}

// Revient à la question précédente
function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
}

// Soumet le quiz et récupère le résultat
function submitQuiz() {
    const answers = Object.keys(userAnswers).map(question => ({
        question: question,
        answer: userAnswers[question]
    }));
    console.log('Submitting quiz:', { quizType: currentQuizType, answers });
    fetch(`http://localhost:3000/result/${currentQuizType}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ answers: answers })
    })
    .then(response => response.json())
    .then(result => {
        console.log('Quiz result:', result);
        displayResult(result);
    })
    .catch(error => console.error('Error submitting quiz:', error));
}

// Affiche le résultat du quiz
function displayResult(result) {
    const quizContainer = document.getElementById('quiz-container');
    quizContainer.innerHTML = `
        <h2 id="result-title">Félicitations, tu es :</h2>
        <h3 id="result-character">${result.name}</h3>
        <img src="${result.image}" alt="${result.name}" class="result-image">
        <p id="result-description">${result.description}</p>
        <button id="retry-button" onclick="reloadPage()">Retour aux thèmes</button>
    `;
}

// Fonction pour recharger la page
function reloadPage() {
    window.location.reload();
}

// Met à jour la barre de progression
function updateProgress() {
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    if (!progressBar || !progressText) {
        console.error('Progress bar or text not found.');
        return;
    }
    const progress = ((currentQuestionIndex + 1) / questions.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressText.innerText = `QUESTION ${currentQuestionIndex + 1}/${questions.length}`;
}

// Met à jour les boutons de navigation
function updateNavigationButtons() {
    const prevButton = document.getElementById('prev-button');
    
    if (!prevButton) {
        console.error('Navigation buttons not found.');
        return;
    }
    
    if (currentQuestionIndex === 0) {
        prevButton.style.display = 'none';
    } else {
        prevButton.style.display = 'inline-block';
    }
}

// Fonction pour démarrer le quiz
function startQuiz(quizType) {
    console.log('Starting quiz:', quizType);
    loadQuiz(quizType);
}

// Attacher les gestionnaires d'événements lors du chargement de la page
window.onload = () => {
    console.log('Page loaded');
    attachThemeEventListeners();
};

// Fonction pour attacher les gestionnaires d'événements aux thèmes
function attachThemeEventListeners() {
    const themes = document.querySelectorAll('.quiz');
    themes.forEach(theme => {
        theme.addEventListener('click', function() {
            const quizType = this.getAttribute('data-quiz-type');
            console.log('Theme selected:', quizType);
            startQuiz(quizType);
        });
    });
}
function reloadPage() {
  const quizIntro = document.getElementById('quiz-intro');
  const quizContainer = document.getElementById('quiz-container');
  
  if (quizIntro && quizContainer) {
      quizContainer.style.display = 'none';
      quizIntro.style.display = 'block';
  } else {
      window.location.reload(); // Fallback if elements are not found
  }
}