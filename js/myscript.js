// FUNCTIONS

// Funzione per generare un elemento
function generateElement(tag, classes, content, wantEventListener) {
    const cell = document.createElement(tag);
    cell.className = classes.toLowerCase();
    cell.append(content);
    if (wantEventListener) {
        cell.addEventListener("click", function () {

            if (!checkIfBomb(cell, bombsList)) {
                didYouWin();
            }
        })
    }

    return cell;
}

// Funzione per generare board
function generateBoard(elementToAppendTo, loops, difficulty) {
    const fragment = document.createDocumentFragment()
    for (i = 1; i <= loops; i++) {
        const cellElement = generateElement("li", `cell ${difficulty}`, i, true);
        fragment.append(cellElement);
    }
    elementToAppendTo.append(fragment);
}

// Funzione per creare le bombe
function createBombs(cellsNumber) {
    const bombsArray = [];
    while (bombsArray.length < 16) {
        const bomb = Math.floor(Math.random() * cellsNumber + 1);
        if (!bombsArray.includes(bomb)) {
            bombsArray.push(bomb);
        }
    }
    return bombsArray;
}

// Funzione per capire se la cella contiene una bomba
function checkIfBomb(cell, bombsList) {
    const cellValue = Number(cell.innerHTML);
    if (bombsList.includes(cellValue)) {
        showAllBombs();
        return true;
    }
    if (!clickedCells.includes(cellValue)) {
        clickedCells.push(cellValue);
        cell.classList.add("active");
        currentScore++;
        spanScore.innerHTML = currentScore;
    }
    return false;
}

//Funzione che mostra tutte le bombe in caso di gameover
function showAllBombs() {

    for (let i = 0; i < cellArray.length; i++) {
        const cellValue = Number(cellArray[i].innerHTML);
        if (bombsList.includes(cellValue)) {
            cellArray[i].classList.add("bomb");

        }
    }
    mainHTML.classList.add("unclickable");
    divOverlay.classList.remove("d-none");
    divOverlay.classList.add("d-flex");
    divYouLose.classList.remove("d-none");
    divFinalScore.innerHTML = currentScore;
}

// Funzione per capire se ho vinto
function didYouWin() {
    if (currentScore === cellArray.length - 16) {
        mainHTML.classList.add("unclickable");
        divOverlay.classList.remove("d-none");
        divOverlay.classList.add("d-flex");
        divYouWon.classList.remove("d-none");
        divFinalScore.innerHTML = currentScore;
    }
}

// Funzione per inizializzare il gioco
function startGame() {
    callToAction.classList.add("d-none");
    board.classList.remove("d-none");
    mainHTML.classList.remove("unclickable");
    divOverlay.classList.add("d-none");
    divOverlay.classList.remove("d-flex");
    divYouWon.classList.add("d-none");
    divYouLose.classList.add("d-none");
    clickedCells = [];
    currentScore = 0;
    divFinalScore.innerHTML = "";
    spanScore.innerHTML = 0;
    board.innerHTML = "";
    const divScoreContainer = document.querySelector(".score-container");


    // Generazione board condizionale in base alla difficoltà
    switch (chooseDifficulty.value) {
        case gameDifficulty[3]:
            generateBoard(board, loopsArray[3], gameDifficulty[3]);
            bombsList = createBombs(loopsArray[3]);
            break;

        case gameDifficulty[2]:
            generateBoard(board, loopsArray[2], gameDifficulty[2]);
            bombsList = createBombs(loopsArray[2]);
            break;

        case gameDifficulty[1]:
            generateBoard(board, loopsArray[1], gameDifficulty[1]);
            bombsList = createBombs(loopsArray[1]);
            break;

        case gameDifficulty[0]:
        default:
            generateBoard(board, loopsArray[0], gameDifficulty[0]);
            bombsList = createBombs(loopsArray[0]);
    }
    divScoreContainer.classList.remove("d-none");
    cellArray = document.querySelectorAll(".cell");
}

// OPERATIONS

const board = document.querySelector(".board");
const gameDifficulty = ["Facile", "Medio", "Difficile", "Pro"];
const loopsArray = [100, 81, 49, 25];
const chooseDifficulty = document.getElementById("difficulty-selector");
const playButton = document.getElementById("play-button");
const callToAction = document.querySelector(".call-to-action");
let bombsList = [];
let clickedCells = [];
let cellArray = 0;
const spanScore = document.getElementById("user-score");
let currentScore = 0;
const mainHTML = document.getElementById("main-element");
const divOverlay = document.querySelector(".overlay");
const divFinalScore = document.getElementById("final-score");
const divYouLose = document.getElementById("you-lose");
const divYouWon = document.getElementById("you-won");



// Creazione opzioni in modo dinamico
for (i = 0; i < gameDifficulty.length; i++) {
    const option = generateElement("option", "", gameDifficulty[i], false);
    option.value = gameDifficulty[i];
    chooseDifficulty.append(option);
}

playButton.addEventListener("click", startGame);


