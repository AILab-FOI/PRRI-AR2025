// Definirajte svih 5 zagonetki
const riddles = [
    {
      description: "Opis prve zagonetke…",
      image: "images/riddle1.jpg",
      answer: "odgovor1"
    },
    {
      description: "Opis druge zagonetke…",
      image: "images/riddle2.jpg",
      answer: "odgovor2"
    },
    {
      description: "Opis treće zagonetke…",
      image: "images/riddle3.jpg",
      answer: "odgovor3"
    },
    {
      description: "Opis četvrte zagonetke…",
      image: "images/riddle4.jpg",
      answer: "odgovor4"
    },
    {
      description: "Opis pete zagonetke…",
      image: "images/riddle5.jpg",
      answer: "odgovor5"
    },
    {
        description: "Opis šeste zagonetke…",
        image: "images/riddle6.jpg",
        answer: "odgovor6"
      }
      
  ];
  
  // Preuzimanje levela iz query parametra ?level=1,2,...
  function getLevel() {
    const params = new URLSearchParams(window.location.search);
    let lvl = parseInt(params.get("level"));
    if (!lvl || lvl < 1 || lvl > riddles.length) lvl = 1;
    return lvl;
  }
  
  // Učitavanje zagonetke na stranicu
  function loadRiddle(level) {
    const { description, image } = riddles[level - 1];
    document.getElementById("riddle-number").textContent = `Zagonetka ${level}`;
    document.getElementById("riddle-description").textContent = description;
    const imgEl = document.getElementById("riddle-image");
    imgEl.src = image;
    imgEl.alt = `Slika zagonetke ${level}`;
    document.getElementById("answer-input").value = "";
    document.getElementById("feedback").classList.add("hidden");
  }
  
document.addEventListener("DOMContentLoaded", () => {
  let currentLevel = getLevel();
  loadRiddle(currentLevel);

  document.getElementById("submit-button").addEventListener("click", () => {
    const userAnswer = document.getElementById("answer-input").value.trim().toLowerCase();
    const correctAnswer = riddles[currentLevel - 1].answer.toLowerCase();

    if (userAnswer === correctAnswer) {
      let completed = JSON.parse(sessionStorage.getItem('completedLevels') || '[]');
      if (completed.length !== riddles.length) {
        completed = Array(riddles.length).fill(false);
      }
      completed[currentLevel - 1] = true;
      sessionStorage.setItem('completedLevels', JSON.stringify(completed));
      window.location.href = '/levels';
    } else {
      document.getElementById("feedback").classList.remove("hidden");

      // 👇 POZIV FUNKCIJE KOJA ODUZIMA 30 SEKUNDI I TRESE TIMER
      penalizeTime(30);
    }
  });
});
