const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');
const resetButton = document.getElementById('reset');
const width = 5;
let squares = [];
let score = 0;
let emojis = ['🍬', '🍫', '🍭', '🍩', '🍪', '🍎', '🍇', '🍉', '🍒', '🍓'];

// Create the game board
function createBoard() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('data-id', i);
    square.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    grid.appendChild(square);
    squares.push(square);
  }
}

// Check for matches
function checkForMatches() {
  for (let i = 0; i < squares.length - width; i++) {
    if (squares[i].textContent === squares[i + width].textContent) {
      score += 10;
      scoreDisplay.textContent = score;
      squares[i].textContent = '';
      squares[i + width].textContent = '';
    }
  }
}

// Reset the game
resetButton.addEventListener('click', () => {
  grid.innerHTML = '';
  squares = [];
  score = 0;
  scoreDisplay.textContent = score;
  messageDisplay.textContent = '';
  createBoard();
});

// Initialize the game
createBoard();
setInterval(checkForMatches, 1000);
