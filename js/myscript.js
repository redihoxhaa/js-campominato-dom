// FUNCTIONS

// Funzione per capire se la cella contiene una bomba

function checkIfBomb(cell, bombsList) {
    const cellValue = Number(cell.innerHTML);
    if (bombsList.includes(cellValue)) {
        cell.classList.add("bomb");
        return true;
    }
    if (!clickedCells.includes(cellValue)) {
        clickedCells.push(cellValue);
        cell.classList.add("active");
    }
    return false;
}

// Funzione per generare un elemento
function generateElement(tag, classes, content, wantEventListener) {
    const cell = document.createElement(tag);
    cell.className = classes.toLowerCase();
    cell.append(content);
    if (wantEventListener) {
        cell.addEventListener("click", function () {

            checkIfBomb(cell, bombsList);
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

// Funzione per inizializzare il gioco
function startGame() {
    callToAction.classList.add("d-none");
    board.classList.remove("d-none");
    clickedCells = [];
    board.innerHTML = "";


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


// Creazione opzioni in modo dinamico
for (i = 0; i < gameDifficulty.length; i++) {
    const option = generateElement("option", "", gameDifficulty[i], false);
    option.value = gameDifficulty[i];
    chooseDifficulty.append(option);
}

playButton.addEventListener("click", startGame);

