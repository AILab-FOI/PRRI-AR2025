const socket = io();

socket.on("time_up_all", () => {
  console.log("Game over received from server.");
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/ar/ex/gameover.html";
});

socket.on("victory_achieved", () => {
  localStorage.clear();
  sessionStorage.clear();
  window.location.href = "/ar/ex/victory.html";
});
