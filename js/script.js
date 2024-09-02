const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let gameBoard = Array(9).fill(null);

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Filas ganadoras
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columnas ganadoras
        [0, 4, 8], [2, 4, 6]              // Diagonales ganadoras
    ];
    
    for (const [a, b, c] of winPatterns) {
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return gameBoard[a];
        }
    }
    return gameBoard.includes(null) ? null : 'E'; // 'E' de Empate
}

function handleClick(event) {
    const cell = event.target;
    const index = Array.from(board.children).indexOf(cell);

    if (gameBoard[index] || checkWinner()) return;

    gameBoard[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === 'X' ? 'x' : 'o');
    const winner = checkWinner();

    if (winner) {
        setTimeout(() => {
            if (winner === 'E') {
                alert('¡Empate!');
            } else {
                alert(`¡Ganó ${winner}!`);
            }
        }, 10);
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function resetGame() {
    gameBoard.fill(null);
    Array.from(board.children).forEach(cell => cell.textContent = '');
    currentPlayer = 'X';

    const cells = document.querySelectorAll('.cell');
    cells.forEach(cell => {
        cell.classList.remove('x', 'o');  // Elimina los colores de las "X" y "O" previos
    });

}

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.addEventListener('click', handleClick);
        board.appendChild(cell);
    }
}

createBoard();
resetButton.addEventListener('click', resetGame);




