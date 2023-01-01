const form = document.querySelector('.input-con');
const refreshBtn = document.getElementById('refresh');
const scoresHolder = document.querySelector('.scores-con');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/PMAK-63b1b6e85659986cc2a170e5-XXXX/scores';

const getScores = async () => {
  const reponse = await fetch(`${url}`);
  const data = await reponse.json();
  return data;
};

const reload = (bool) => {
  let wrapper = document.querySelector('.animate');
  if (wrapper === null) {
    scoresHolder.innerHTML += `<div class="animate">          
      </div>`;
    wrapper = document.querySelector('.animate');
  }
  wrapper.style.display = bool ? 'block' : 'none';
};

const refresh = async () => {
  const gamers = [];
  reload(true);
  await getScores().then((entry) => {
    scoresHolder.innerHTML = '';
    reload(false);
    Object.entries(entry.result).forEach(([, value]) => {
      gamers.push(JSON.stringify(value));
      const listItems = document.createElement('div');
      listItems.className = 'listItems';
      listItems.innerHTML = `
              <p class="p">${value.user}</P>
              <p class="p">${value.score}</P>
            `;
      scoresHolder.appendChild(listItems);
    });
  });
};

const add = async (newScore) => {
  const wrapper = document.querySelector('.animate');
  wrapper.style.display = 'block';
  const response = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newScore),
  });
  const data = await response.json();
  refresh();
  return data;
};

const createScore = () => {
  const newScore = {
    user: document.getElementById('username').value,
    score: document.getElementById('userscore').value,
  };
  document.getElementById('username').value = '';
  document.getElementById('userscore').value = '';
  add(newScore);
};

refresh();

refreshBtn.addEventListener('click', (event) => {
  event.preventDefault();
  refresh();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  createScore();
});
