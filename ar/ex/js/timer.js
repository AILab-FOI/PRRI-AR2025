function startTimer() {
    let endTime = localStorage.getItem("timerEndTime");
    if (!endTime) {
        const now = new Date().getTime();
        endTime = now + 30 * 60 * 1000; 
        localStorage.setItem("timerEndTime", endTime);
    }

    const timerInterval = setInterval(() => {
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