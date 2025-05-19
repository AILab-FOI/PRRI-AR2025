function startTimer() {
    if (!localStorage.getItem("timerEndTime")) {
        const now = new Date().getTime();
        const endTime = now + 30 * 60 * 1000; 
        localStorage.setItem("timerEndTime", endTime);
    }

    const timerInterval = setInterval(() => {
        const endTime = parseInt(localStorage.getItem("timerEndTime"));
        const now = new Date().getTime();
        const timeLeft = Math.floor((endTime - now) / 1000); 

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            localStorage.removeItem("timerEndTime"); 
            window.location.href = "/ar/ex/gameover.html"; 
        } else {
            updateTimerDisplay(timeLeft);
        }
    }, 1000);
}

function updateTimerDisplay(timeLeft) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const timerDisplay = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    const timerElement = document.getElementById("timer");
    if (timerElement) {
        timerElement.textContent = timerDisplay;
    }
}

function penalizeTime(secondsToSubtract) {
    let endTime = parseInt(localStorage.getItem("timerEndTime"));
    if (endTime) {
        endTime -= secondsToSubtract * 1000;
        localStorage.setItem("timerEndTime", endTime);
    }

    const penaltyMsg = document.getElementById("penalty-message");
    if (penaltyMsg) {
        penaltyMsg.textContent = `Kazna: -${secondsToSubtract} sekundi!`;
        penaltyMsg.classList.remove("hidden");
        penaltyMsg.classList.add("show");
        setTimeout(() => {
            penaltyMsg.classList.remove("show");
            penaltyMsg.classList.add("hidden");
        }, 2000);
    }

    const timerEl = document.getElementById("timer");
    if (timerEl) {
        timerEl.classList.add("shake");
        setTimeout(() => {
            timerEl.classList.remove("shake");
        }, 500);
    }

    const updatedEndTime = parseInt(localStorage.getItem("timerEndTime"));
    const now = new Date().getTime();
    const timeLeft = Math.floor((updatedEndTime - now) / 1000);
    updateTimerDisplay(timeLeft);
}

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.querySelector("button");
    if (startButton && startButton.textContent === "START GAME") {
        startButton.addEventListener("click", () => {
            localStorage.removeItem("timerEndTime"); 
            startTimer(); 
        });
    } else {
        if (localStorage.getItem("timerEndTime")) {
            startTimer(); 
        }
    }
});