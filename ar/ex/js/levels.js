// Ukupno 6 levela
const totalLevels = 6;
let number_of_completed_levels = 0;

// Dohvati ili inicijaliziraj statuse dovršenih levela
let completed = JSON.parse(sessionStorage.getItem('completedLevels') || '[]');
if (completed.length !== totalLevels) {
  completed = Array(totalLevels).fill(false);
  sessionStorage.setItem('completedLevels', JSON.stringify(completed));
}

const listEl = document.querySelector('.levels-list');

// Mapiranje levela na marker stranice
const markerPages = {
    1: '../ar/ex/jabuka.html',
    2: '../ar/ex/piramida.html',
    3: '../ar/ex/rim.html',
    4: '../ar/ex/srednjovjekovno.html',
    5: '../ar/ex/kipic.html',
    6: '../ar/ex/ww2.html'
};

for (let i = 1; i <= totalLevels; i++) {
  const li = document.createElement('li');
  const btn = document.createElement('button');
  btn.textContent = `Level ${i}`;
  btn.dataset.level = i;
  btn.classList.add('level-button');

  if (completed[i - 1]) {
    btn.disabled = true;
    li.appendChild(btn);
    const span = document.createElement('span');
    span.textContent = 'Completed';
    span.classList.add('status');
    li.appendChild(span);
    number_of_completed_levels++;

  } else if (i > 1 && !completed[i - 2]) {
    btn.disabled = true;
    li.appendChild(btn);
    const span = document.createElement('span');
    span.textContent = 'Locked';
    span.classList.add('status');
    li.appendChild(span);

  } else {
    li.appendChild(btn);
    btn.addEventListener('click', () => {
      const markerPage = markerPages[i];
      window.location.href = `${markerPage}?level=${i}`;
    });
  }

  listEl.appendChild(li);

}


console.log("Broj rjesenih nivoa: ", number_of_completed_levels);