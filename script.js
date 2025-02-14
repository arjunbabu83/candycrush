const grid = document.querySelector('.grid');
const scoreDisplay = document.getElementById('score');
let score = 0;
const width = 5; // 5x5 grid
let fruits = [];

// Fruit colors
const colors = ['red', 'yellow', 'green', 'blue', 'purple'];

// Create the grid
function createGrid() {
  for (let i = 0; i < width * width; i++) {
    const square = document.createElement('div');
    square.setAttribute('data-id', i);
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    square.setAttribute('data-color', randomColor);
    square.textContent = '🍎🍌🍇🍊🍒'.split('')[colors.indexOf(randomColor)];
    grid.appendChild(square);
    fruits.push(square);
  }
}

// Swap fruits
let beingDragged;
let beingReplaced;

fruits.forEach(fruit => {
  fruit.addEventListener('dragstart', dragStart);
  fruit.addEventListener('dragover', dragOver);
  fruit.addEventListener('dragenter', dragEnter);
  fruit.addEventListener('dragleave', dragLeave);
  fruit.addEventListener('drop', dragDrop);
  fruit.addEventListener('dragend', dragEnd);
});

function dragStart() {
  beingDragged = this;
}

function dragOver(e) {
  e.preventDefault();
}

function dragEnter(e) {
  e.preventDefault();
}

function dragLeave() {}

function dragDrop() {
  beingReplaced = this;
}

function dragEnd() {
  if (beingReplaced && beingDragged !== beingReplaced) {
    swapFruits(beingDragged, beingReplaced);
    checkForMatches();
  }
}

function swapFruits(fruit1, fruit2) {
  const tempColor = fruit1.getAttribute('data-color');
  const tempText = fruit1.textContent;

  fruit1.setAttribute('data-color', fruit2.getAttribute('data-color'));
  fruit1.textContent = fruit2.textContent;

  fruit2.setAttribute('data-color', tempColor);
  fruit2.textContent = tempText;
}

// Check for matches
function checkForMatches() {
  for (let i = 0; i < fruits.length; i++) {
    const row = Math.floor(i / width);
    const col = i % width;

    // Check horizontal matches
    if (col < width - 2) {
      const fruit1 = fruits[i];
      const fruit2 = fruits[i + 1];
      const fruit3 = fruits[i + 2];

      if (
        fruit1.getAttribute('data-color') === fruit2.getAttribute('data-color') &&
        fruit1.getAttribute('data-color') === fruit3.getAttribute('data-color')
      ) {
        fruit1.textContent = '';
        fruit2.textContent = '';
        fruit3.textContent = '';
        score += 30;
        scoreDisplay.textContent = score;
      }
    }

    // Check vertical matches
    if (row < width - 2) {
      const fruit1 = fruits[i];
      const fruit2 = fruits[i + width];
      const fruit3 = fruits[i + width * 2];

      if (
        fruit1.getAttribute('data-color') === fruit2.getAttribute('data-color') &&
        fruit1.getAttribute('data-color') === fruit3.getAttribute('data-color')
      ) {
        fruit1.textContent = '';
        fruit2.textContent = '';
        fruit3.textContent = '';
        score += 30;
        scoreDisplay.textContent = score;
      }
    }
  }
}

// Initialize the game
createGrid();
