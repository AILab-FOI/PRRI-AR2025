// Definirajte svih 5 zagonetki
const riddles = [
    {
      description: "How many Newtons did the apple hit Isaac Newton with on the head according to this recreation?",
      image: "ar/images/zagonetka_jabuka.png",
      answer1: "35",
      answer2: "Thirty Five",
      answer3: "nevalidno"
    },
    {
      description: "Heed the instructions written on the scroll.",
      image: "ar/images/zagonetka_egipat.png",
      answer1: "5",
      answer2: "Five",
      answer3: "nevalidno"
    },
    {
      description: "The sum of all three make the beginnings of a great civilization.",
      image: "ar/images/zagonetka_rim.png",
      answer1: "DCCLIII",
      answer2: "753",
      answer3: "Seven Hundred Fifty Three"
    },
    {
      description: "In tret\'rous dungeons of illusion, one wilt not loseth thi\'r way, from facing the tret\'rous south, t is imp\'rative f\'r thee to he\'d these w\'rds: three steps one shalt taketh, turneth the side of c\'rrectness.  One shalt doth yond again at the endeth of the c\'rrid\'r.  Then, only steps which art hath left art ones which art hath left: of which th\'re art three.  Aft\'r all thy eff\'rts, bef\'re thee shouldst beest the doth\'r to escapeth.  Which direction might not but thee visage to beest in front of t?",
      image: "ar/images/zagonetka_srednjovjekovna.png",
      answer1: "East",
      answer2: "nevalidno",
      answer3: "nevalidno"
    },
    {
      description: "Answer the riddle.",
      image: "ar/images/zagonetka_azija.png",
      answer1: "Water",
      answer2: "nevalidno",
      answer3: "nevalidno"
    },
    {
      description: "Which color represents the wire that doesn't connect to the bomb?",
      image: "ar/images/zagonetka_ww2.png",
      answer1: "Blue",
      answer2: "nevalidno",
      answer3: "nevalidno"
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
    const correctAnswer1 = riddles[currentLevel - 1].answer1.toLowerCase();
    const correctAnswer2 = riddles[currentLevel - 1].answer2.toLowerCase();
    const correctAnswer3 = riddles[currentLevel - 1].answer3.toLowerCase();

    if ((userAnswer === correctAnswer1 || userAnswer === correctAnswer2 || userAnswer === correctAnswer3) && userAnswer !== "nevalidno" ) {
      let completed = JSON.parse(sessionStorage.getItem('completedLevels') || '[]');
      if (completed.length !== riddles.length) {
        completed = Array(riddles.length).fill(false);
      }
      completed[currentLevel - 1] = true;
      sessionStorage.setItem('completedLevels', JSON.stringify(completed));
      if(currentLevel == 6){
        window.location.href = '../ar/ex/victory.html';
      }else{
        window.location.href = '/levels';
      }
    } else {
      document.getElementById("feedback").classList.remove("hidden");

      // 👇 POZIV FUNKCIJE KOJA ODUZIMA 30 SEKUNDI I TRESE TIMER
      penalizeTime(120);
    }
  });
});
