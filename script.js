// script.js

const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const resetBtn = document.getElementById('resetBtn');
const message = document.getElementById('message');
const playWithFriendBtn = document.getElementById('playWithFriendBtn');
const playWithAIBtn = document.getElementById('playWithAIBtn');
const modeSelection = document.getElementById('modeSelection');

let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let isGameActive = true;
let againstAI = false; // Initialize againstAI to false

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] || !isGameActive || (currentPlayer === 'O' && againstAI)) {
        return;
    }

    makeMove(index);
    if (againstAI && isGameActive) {
        setTimeout(aiMove, 500); // Delay AI move for better UX
    }
}

function makeMove(index) {
    gameState[index] = currentPlayer;
    cells[index].textContent = currentPlayer;
    cells[index].classList.add(currentPlayer.toLowerCase());

    if (checkWin()) {
        message.textContent = `${currentPlayer} wins!`;
        isGameActive = false;
        return;
    }

    if (gameState.every(cell => cell)) {
        message.textContent = `It's a tie!`;
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    message.textContent = `It's ${currentPlayer}'s turn`;
}

function checkWin() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState.fill(null);
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    currentPlayer = 'X';
    isGameActive = true;
    message.textContent = `It's ${currentPlayer}'s turn`;
}

function aiMove() {
    let availableCells = gameState.map((value, index) => value === null ? index : null).filter(val => val !== null);
    let randomIndex = availableCells[Math.floor(Math.random() * availableCells.length)];
    makeMove(randomIndex);
}

function startGame(mode) {
    againstAI = (mode === 'AI');
    modeSelection.style.display = 'none';
    board.style.display = 'grid';
    resetBtn.style.display = 'inline-block';
    message.textContent = `It's ${currentPlayer}'s turn`;
}

playWithFriendBtn.addEventListener('click', () => startGame('Friend'));
playWithAIBtn.addEventListener('click', () => startGame('AI'));

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);

message.textContent = 'Select a mode to start the game';
