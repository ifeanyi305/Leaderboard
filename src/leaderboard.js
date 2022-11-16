const form = document.querySelector('.input-con');
const refreshBtn = document.getElementById('refresh');
const scoresHolder = document.querySelector('.scores-con');

const url = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/rpN8IMWS1qo5BhRdNfm5/scores';

const getScores = async () => {
  const reponse = await fetch(`${url}`);
  const data = await reponse.json();
  return data
};

const refresh = () => {
  scoresHolder.innerHTML = '';
  const gamers = [];
  getScores().then((entry) => {
    Object.entries(entry.result).forEach(([, value]) => {
      gamers.push(JSON.stringify(value));
      const listItems = document.createElement('div');
      listItems.className = "listItems"
      listItems.innerHTML = `
              <p>${value.user}:</P>
              <p>${value.score}</P>
            `;
      scoresHolder.appendChild(listItems);
    })
  })
};

const add = async (newScore) => {
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

const create = () => {
  const newScore = {
    user: document.getElementById("username").value,
    score: document.getElementById("userscore").value,
  };
  document.getElementById("username").value = '';
  document.getElementById("userscore").value = '';
  add(newScore)
};

refresh()



refreshBtn.addEventListener("click", () => {
  refresh()
})

form.addEventListener('submit', (event) => {
  event.preventDefault();
  create()
})