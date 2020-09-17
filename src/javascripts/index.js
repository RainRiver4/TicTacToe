import "./../scss/index.scss";

let sign = null;
let board = [];

const playerSignX = document.querySelector(".header__player-x");
const playerSignO = document.querySelector(".header__player-o");
const tiles = document.querySelectorAll(".board__tile");
const info = document.querySelector(".header__information");
const pointX = document.querySelector(".header__result-x");
const pointO = document.querySelector(".header__result-o");
let pointPlayerX = 0;
let pointPlayerO = 0;

const drawPlayerSign = txt => {
    playerSignX.disabled = false;
    playerSignO.disabled = false;
    playerSignX.addEventListener("click", e => {
        playerSignO.classList.remove("btn--active");
        e.currentTarget.classList.add("btn--active");
        e.currentTarget.disabled = true;
        playerSignO.disabled = true;
        sign = playerSignX;
        info.textContent = "Rozpoczyna gracz X";
        startNewGame();
    });

    playerSignO.addEventListener("click", e => {
        playerSignX.classList.remove("btn--active");
        e.currentTarget.classList.add("btn--active");
        e.currentTarget.disabled = true;
        playerSignX.disabled = true;
        sign = playerSignO;
        info.textContent = "Rozpoczyna gracz O";
        startNewGame();
    });
    playerSignX.classList.remove("btn--active");
    playerSignO.classList.remove("btn--active");
    info.textContent = txt;
};

const getElementsAndSetAttribute = () => {
    let indexX = 0;
    let indexY = 0;
    tiles.forEach(tile => {
        if (indexY === 3) {
            indexX++;
            indexY = 0;
        }
        tile.setAttribute("data-row", indexX);
        tile.setAttribute("data-col", indexY);
        indexY++;
        tile.addEventListener("click", addSign);
    });
};

const createDiv = (className, event) => {
    const div = document.createElement("div");
    div.className = className;
    event.target.appendChild(div);
    return div;
};

const createGameBoard = dimension => {
    for (let r = 0; r < dimension; r++) {
        board[r] = [];
        for (let c = 0; c < dimension; c++) {
            board[r][c] = null;
        }
    }
    return board;
};

function addSign(e) {
    const { row, col } = e.target.dataset;
    if (sign) {
        if (sign === playerSignX) {
            createDiv("board__tile--x-one", e);
            createDiv("board__tile--x-two", e);
            e.target.removeEventListener("click", addSign);
            board[row][col] = "X";
            sign = playerSignO;
            info.textContent = "Teraz gracz O";
            playerSignX.classList.remove("btn--active");
            playerSignO.classList.add("btn--active");
            check(tiles);
        } else {
            createDiv("board__tile--o", e);
            e.target.removeEventListener("click", addSign);
            board[row][col] = "O";
            info.textContent = "Teraz gracz X";
            sign = playerSignX;
            playerSignO.classList.remove("btn--active");
            playerSignX.classList.add("btn--active");
            check(tiles);
        }
    }
    return;
}

const gameSolutions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const removeDiv = divClass => {
    const divs = document.querySelectorAll(divClass);
    divs.forEach(div => div.remove());
};

const startNewGame = () => {
    board.length = 0;
    createGameBoard(3);
    removeDiv(".board__tile--x-one");
    removeDiv(".board__tile--x-two");
    removeDiv(".board__tile--o");
    getElementsAndSetAttribute();
};

const check = () => {
    const resultBoard = board.reduce((full, r) => full.concat(r));
    let playerX = [];
    let playerO = [];
    resultBoard.forEach((item, index) => {
        item === "X" ? playerX.push(index) : null;
        item === "O" ? playerO.push(index) : null;
    });

    gameSolutions.forEach(solution => {
        if (solution.every(index => playerX.indexOf(index) > -1)) {
            tiles.forEach(tile => tile.removeEventListener("click", addSign));
            pointPlayerX++;
            pointX.textContent = " " + pointPlayerX;
            drawPlayerSign(
                "Wygrał gracz X, wybierz symbol którym chcesz rozpocząć kolejną rundę."
            );
        }

        if (solution.every(index => playerO.indexOf(index) > -1)) {
            tiles.forEach(tile => tile.removeEventListener("click", addSign));
            pointPlayerO++;
            pointO.textContent = " " + pointPlayerO;
            drawPlayerSign(
                "Wygrał gracz O, wybierz symbol którym chcesz rozpocząć kolejną rundę."
            );
        }
    });

    if (resultBoard.every(result => result !== null)) {
        drawPlayerSign(
            "Remis wybierz symbol którym chcesz rozpocząć kolejną rundę."
        );
        pointPlayerO++;
        pointO.textContent = " " + pointPlayerO;
        pointPlayerX++;
        pointX.textContent = " " + pointPlayerX;
    }
};

const init = () => {
    drawPlayerSign();
    createGameBoard(3);
    getElementsAndSetAttribute();
    info.textContent = "Wybierz symbol którym chcesz rozpocząć.";
};

init();
