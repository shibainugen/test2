const HANDS = {
  rock: { emoji: "✊", name: "グー", beats: "scissors" },
  scissors: { emoji: "✌️", name: "チョキ", beats: "paper" },
  paper: { emoji: "🖐️", name: "パー", beats: "rock" },
};

const playerHandEl = document.getElementById("player-hand");
const computerHandEl = document.getElementById("computer-hand");
const resultEl = document.getElementById("result-message");
const playerScoreEl = document.getElementById("player-score");
const drawScoreEl = document.getElementById("draw-score");
const computerScoreEl = document.getElementById("computer-score");
const buttons = document.querySelectorAll(".hand-button");
const resetButton = document.getElementById("reset-button");

let score = { player: 0, draw: 0, computer: 0 };
let isPlaying = false;

function pickComputerHand() {
  const keys = Object.keys(HANDS);
  return keys[Math.floor(Math.random() * keys.length)];
}

function judge(playerHand, computerHand) {
  if (playerHand === computerHand) return "draw";
  return HANDS[playerHand].beats === computerHand ? "win" : "lose";
}

function setButtonsDisabled(disabled) {
  buttons.forEach((btn) => (btn.disabled = disabled));
}

function updateScoreboard() {
  playerScoreEl.textContent = score.player;
  drawScoreEl.textContent = score.draw;
  computerScoreEl.textContent = score.computer;
}

const SHUFFLE_KEYS = Object.keys(HANDS);
const SHUFFLE_INTERVAL_MS = 80;
const SHUFFLE_DURATION_MS = 900;

async function play(playerHand) {
  if (isPlaying) return;
  isPlaying = true;
  setButtonsDisabled(true);

  // Decide the computer's hand up front so the shuffle below is purely
  // visual and never influenced by (or made to look like it's reacting to)
  // the player's choice.
  const computerHand = pickComputerHand();

  resultEl.textContent = "せーの...";
  resultEl.className = "result-message";
  playerHandEl.textContent = HANDS[playerHand].emoji;

  computerHandEl.classList.add("shuffling");
  const shuffleStart = Date.now();
  let shuffleIndex = 0;
  await new Promise((resolve) => {
    const shuffleTimer = setInterval(() => {
      computerHandEl.textContent = HANDS[SHUFFLE_KEYS[shuffleIndex % SHUFFLE_KEYS.length]].emoji;
      shuffleIndex += 1;
      if (Date.now() - shuffleStart >= SHUFFLE_DURATION_MS) {
        clearInterval(shuffleTimer);
        resolve();
      }
    }, SHUFFLE_INTERVAL_MS);
  });
  computerHandEl.classList.remove("shuffling");

  computerHandEl.textContent = HANDS[computerHand].emoji;
  computerHandEl.classList.add("reveal");
  setTimeout(() => computerHandEl.classList.remove("reveal"), 400);

  const outcome = judge(playerHand, computerHand);

  if (outcome === "win") {
    score.player += 1;
    resultEl.textContent = "🎉 あなたの勝ち！";
    resultEl.classList.add("win");
  } else if (outcome === "lose") {
    score.computer += 1;
    resultEl.textContent = "😢 あなたの負け...";
    resultEl.classList.add("lose");
  } else {
    score.draw += 1;
    resultEl.textContent = "🤝 あいこ！";
    resultEl.classList.add("draw");
  }

  updateScoreboard();
  setButtonsDisabled(false);
  isPlaying = false;
}

buttons.forEach((btn) => {
  btn.addEventListener("click", () => play(btn.dataset.hand));
});

resetButton.addEventListener("click", () => {
  score = { player: 0, draw: 0, computer: 0 };
  updateScoreboard();
  playerHandEl.textContent = "❓";
  computerHandEl.textContent = "❓";
  resultEl.textContent = "手を選んでね！";
  resultEl.className = "result-message";
});
