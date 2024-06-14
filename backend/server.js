// backend/server.js
const express = require("express");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

let quizzes = {
  sportif: [
    {
      question: "Quel est ton sport préféré ?",
      options: ["Football", "Basketball", "Tennis", "Natation"]
    }
    // Ajouter plus de questions ici
  ],
  youtubeur: [
    // Ajouter les questions ici
  ],
  chanteur: [
    // Ajouter les questions ici
  ],
  manga: [
    // Ajouter les questions ici
  ],
  films: [
    // Ajouter les questions ici
  ],
  foot: [
    // Ajouter les questions ici
  ]
};

app.get("/quiz/:type", (req, res) => {
  const quizType = req.params.type;
  res.json(quizzes[quizType]);
});

app.post("/result", (req, res) => {
  const { quizType, answers } = req.body;
  // Logique pour déterminer le personnage correspondant
  let result = "Personnage basé sur les réponses";
  res.json({ result });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
