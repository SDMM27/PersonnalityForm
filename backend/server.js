const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;
const path = require('path');

app.use(cors());
app.use(express.json());

let quizzes = {
  sportif: [
    {
      question: "Quel est ton sport préféré ?",
      options: ["Football", "Basketball", "Tennis", "Natation"]
    },
    {
      question: "À quelle fréquence fais-tu du sport ?",
      options: ["Tous les jours", "Quelques fois par semaine", "Une fois par semaine", "Rarement"]
    },
    {
      question: "Quel est ton athlète préféré ?",
      options: ["Lionel Messi", "LeBron James", "Roger Federer", "Michael Phelps"]
    },
    {
      question: "Quel est ton moment sportif préféré ?",
      options: ["La victoire en championnat", "La médaille olympique", "Le record personnel", "La compétition amicale"]
    },
    {
      question: "Quelle est ta motivation pour faire du sport ?",
      options: ["La santé", "La compétition", "Le plaisir", "La socialisation"]
    }
  ],
  youtubeur: [
    {
      question: "Quel type de contenu préfères-tu ?",
      options: ["Gaming", "Vlog", "Education", "Humour"]
    },
    {
      question: "Combien de temps passes-tu sur YouTube par jour ?",
      options: ["1 heure", "2-3 heures", "4-5 heures", "Plus de 5 heures"]
    },
    {
      question: "Quel YouTubeur préfères-tu ?",
      options: ["PewDiePie", "MrBeast", "Casey Neistat", "Markiplier"]
    },
    {
      question: "Quel type de vidéos regardes-tu le plus ?",
      options: ["Let’s Play", "Daily Vlog", "Tutoriels", "Sketchs comiques"]
    },
    {
      question: "Que préfères-tu dans les vidéos ?",
      options: ["Le contenu", "La personnalité du créateur", "La qualité de production", "L'humour"]
    }
  ],
  chanteur: [
    {
      question: "Quel genre de musique préfères-tu ?",
      options: ["Pop", "Rock", "Hip-Hop", "Classique"]
    },
    {
      question: "À quelle fréquence écoutes-tu de la musique ?",
      options: ["Tous les jours", "Quelques fois par semaine", "Rarement", "Jamais"]
    },
    {
      question: "Quel est ton chanteur préféré ?",
      options: ["Beyoncé", "Freddie Mercury", "Eminem", "Ludovico Einaudi"]
    },
    {
      question: "Que préfères-tu dans la musique ?",
      options: ["Les paroles", "Le rythme", "La mélodie", "L'émotion"]
    },
    {
      question: "Quelle est ton activité musicale préférée ?",
      options: ["Concerts", "Karaoké", "Écoute en solo", "Jouer d'un instrument"]
    }
  ],
  manga: [
    {
      question: "Quel est ton genre préféré ?",
      options: ["Action", "Aventure", "Romance", "Horreur"]
    },
    {
      question: "Quel pouvoir aimerais-tu avoir ?",
      options: ["Vol", "Invisibilité", "Super force", "Lire les pensées"]
    },
    {
      question: "Quel type de personnage te ressemble le plus ?",
      options: ["Le héros courageux", "Le rival talentueux", "Le sage mentor", "Le comique de service"]
    },
    {
      question: "Quel est ton objectif dans la vie ?",
      options: ["Devenir le meilleur", "Explorer le monde", "Trouver l'amour", "Comprendre le monde"]
    },
    {
      question: "Quel est ton style de combat préféré ?",
      options: ["Arts martiaux", "Magie", "Armes", "Stratégie"]
    }
  ],
  films: [
    {
      question: "Quel genre de films préfères-tu ?",
      options: ["Action", "Comédie", "Drame", "Science-fiction"]
    },
    {
      question: "À quelle fréquence regardes-tu des films ?",
      options: ["Tous les jours", "Quelques fois par semaine", "Rarement", "Jamais"]
    },
    {
      question: "Quel est ton acteur préféré ?",
      options: ["Tom Cruise", "Will Smith", "Leonardo DiCaprio", "Scarlett Johansson"]
    },
    {
      question: "Quel est ton réalisateur préféré ?",
      options: ["Steven Spielberg", "Christopher Nolan", "Quentin Tarantino", "James Cameron"]
    },
    {
      question: "Quel type de fin de film préfères-tu ?",
      options: ["Heureuse", "Tragique", "Ouverte", "Inattendue"]
    }
  ],
  foot: [
    {
      question: "Quel est ton équipe de football préférée ?",
      options: ["FC Barcelone", "Real Madrid", "Manchester United", "Paris Saint-Germain"]
    },
    {
      question: "À quelle fréquence regardes-tu des matchs de football ?",
      options: ["Tous les jours", "Quelques fois par semaine", "Rarement", "Jamais"]
    },
    {
      question: "Quel est ton joueur de football préféré ?",
      options: ["Lionel Messi", "Cristiano Ronaldo", "Neymar", "Kylian Mbappé"]
    },
    {
      question: "Quel est ton style de jeu préféré ?",
      options: ["Offensif", "Défensif", "Équilibré", "Tactique"]
    },
    {
      question: "Quelle est ton position préférée sur le terrain ?",
      options: ["Attaquant", "Milieu", "Défenseur", "Gardien de but"]
    }
  ]
};

// Logique pour déterminer le personnage basé sur les réponses
function determineCharacter(quizType, answers) {
  if (quizType === "sportif") {
    if (answers.includes("Football")) {
      return {
        name: "Lionel Messi",
        description: "Un joueur de football légendaire avec une incroyable agilité.",
        image: "images/messi.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Basketball")) {
      return {
        name: "LeBron James",
        description: "Un joueur de basketball exceptionnel avec une détermination sans faille.",
        image: "images/lebron.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Tennis")) {
      return {
        name: "Roger Federer",
        description: "Un joueur de tennis gracieux et élégant, maître de son art.",
        image: "images/federer.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Natation")) {
      return {
        name: "Michael Phelps",
        description: "Un nageur prodige avec une discipline et une force inégalées.",
        image: "images/phelps.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else {
      return {
        name: "Usain Bolt",
        description: "L'homme le plus rapide du monde, toujours en quête de nouveaux records.",
        image: "images/bolt.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    }
  } else if (quizType === "youtubeur") {
    if (answers.includes("Gaming")) {
      return {
        name: "PewDiePie",
        description: "Un créateur de contenu divertissant et influent dans le domaine du gaming.",
        image: "images/pewdiepie.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Vlog")) {
      return {
        name: "Casey Neistat",
        description: "Un vlogger innovant avec un style unique et captivant.",
        image: "images/casey.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Education")) {
      return {
        name: "Markiplier",
        description: "Un éducateur divertissant et bienveillant, toujours prêt à aider.",
        image: "images/markiplier.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Humour")) {
      return {
        name: "MrBeast",
        description: "Un créateur de contenu hilarant avec un cœur d'or.",
        image: "images/mrbeast.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else {
      return {
        name: "Jenna Marbles",
        description: "Une créatrice de contenu pétillante avec un sens de l'humour unique.",
        image: "images/jenna.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    }
  } else if (quizType === "chanteur") {
    if (answers.includes("Pop")) {
      return {
        name: "Beyoncé",
        description: "Une artiste talentueuse et inspirante, reine de la pop.",
        image: "images/beyonce.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Rock")) {
      return {
        name: "Freddie Mercury",
        description: "Une légende du rock avec une voix puissante et une présence scénique inégalée.",
        image: "images/freddie.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Hip-Hop")) {
      return {
        name: "Eminem",
        description: "Un rappeur talentueux avec des paroles percutantes et un style unique.",
        image: "images/eminem.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Classique")) {
      return {
        name: "Ludovico Einaudi",
        description: "Un compositeur de musique classique contemporaine, émouvant et inspirant.",
        image: "images/einaudi.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else {
      return {
        name: "Adele",
        description: "Une chanteuse avec une voix puissante et des paroles émouvantes.",
        image: "images/adele.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    }
  } else if (quizType === "manga") {
    if (answers.includes("Action")) {
      return {
        name: "Goku",
        description: "Un héros courageux qui ne recule jamais devant un défi.",
        image: "images/goku.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Aventure")) {
      return {
        name: "Luffy",
        description: "Un aventurier enthousiaste toujours prêt à explorer de nouveaux horizons.",
        image: "images/luffy.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Romance")) {
      return {
        name: "Naruto",
        description: "Un ninja déterminé et fidèle à ses amis.",
        image: "images/naruto.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Horreur")) {
      return {
        name: "Light Yagami",
        description: "Un intellectuel brillant avec un côté sombre.",
        image: "images/light.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else {
      return {
        name: "Ichigo",
        description: "Un combattant spirituel déterminé à protéger ses proches.",
        image: "images/ichigo.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    }
  } else if (quizType === "films") {
    if (answers.includes("Action")) {
      return {
        name: "Ethan Hunt",
        description: "Un agent secret audacieux avec des compétences incroyables.",
        image: "images/ethan.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Comédie")) {
      return {
        name: "Hancock",
        description: "Un super-héros atypique avec un grand cœur.",
        image: "images/hancock.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Drame")) {
      return {
        name: "Jack Dawson",
        description: "Un artiste passionné avec un amour inconditionnel.",
        image: "images/jack.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Science-fiction")) {
      return {
        name: "Neo",
        description: "Un hacker qui découvre la vérité sur la réalité et combat pour la liberté.",
        image: "images/neo.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else {
      return {
        name: "Black Widow",
        description: "Une espionne redoutable avec un passé mystérieux.",
        image: "images/blackwidow.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    }
  } else if (quizType === "foot") {
    if (answers.includes("FC Barcelone")) {
      return {
        name: "Lionel Messi",
        description: "Un joueur de football légendaire avec une incroyable agilité.",
        image: "images/messi.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Real Madrid")) {
      return {
        name: "Cristiano Ronaldo",
        description: "Un athlète de haut niveau, toujours en quête de perfection.",
        image: "images/ronaldo.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Paris Saint-Germain")) {
      return {
        name: "Neymar",
        description: "Un joueur de football brésilien avec des compétences techniques impressionnantes.",
        image: "images/neymar.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else if (answers.includes("Manchester United")) {
      return {
        name: "Kylian Mbappé",
        description: "Un jeune talent avec une vitesse et une agilité incroyables.",
        image: "images/mbappe.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    } else {
      return {
        name: "Zlatan Ibrahimović",
        description: "Un joueur avec une personnalité unique et une incroyable technique.",
        image: "images/zlatan.png" // Assurez-vous que cette image existe dans votre dossier frontend
      };
    }
  }
}

app.get("/quiz/:type", (req, res) => {
  const quizType = req.params.type;
  res.json(quizzes[quizType]);
});

app.post("/result/:type", (req, res) => {
  const quizType = req.params.type;
  const { answers } = req.body;
  const result = determineCharacter(quizType, answers.map(answer => answer.answer));
  res.json(result);
});

// Assurez-vous que le chemin est correct
app.use(express.static(path.join(__dirname, '../../PersonnalityForm/frontend')));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
