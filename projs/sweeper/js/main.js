'use strict';

var MARK = '🚩';
var NORMAL = '🙂';
var SAD = '😣';
var VICTORY = '😎';
var BOMB = '💣';
var colorByNumMap = { 1: 'blue', 2: 'green', 3: 'red', 4: 'darkblue', 5: 'purple', 6: 'maroon', 7: 'yellow', 8: 'orange'}

var gLevels = {
    beginner: { SIZE: 4, MINES: 2, LEVEL: 'beginner' },
    medium: { SIZE: 6, MINES: 5, LEVEL: 'medium' },
    expert: { SIZE: 8, MINES: 15, LEVEL: 'expert' },
}
var gGameInterval;
var gStartTime;
var gBoard;
var gState;
var gLevel = gLevels.beginner;


function resetGame() {
    resetState()
    if (gGameInterval) clearInterval(gGameInterval); // in case user change level or click replay in the middle of a game;
    gGameInterval = null;
    gBoard = initBoard();
    renderBoard();
    renderScores()
}

//after first click, game starts, coords of the first celll are sent to buildBoard() to avoid putting there a mine;
function initGame(coord) {
    gStartTime = Date.now();
    gGameInterval = setInterval(updateClock, 200)
    buildBoard(coord)
    setMinesNegsCount();
    renderBoard();
    gState.isGameOn = true;
}
// CR: build board will be a better func name
function initBoard() {
    var board = [];
    for (var i = 0; i < gLevel.SIZE; i++) {
        board[i] = [];
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = {
                bombsAroundCount: 0,
                isShown: false,
                isBomb: false,
                isMarked: false,
            }
        }
    }
    return board;
}

// CR: this func isnt building the board. "placeMines" will be a better name
function buildBoard(coord) {
    var minesCount = gLevel.MINES;
    while (minesCount > 0) {
        var i = getRndInteger(0, gLevel.SIZE)
        var j = getRndInteger(0, gLevel.SIZE)
        var currCell = gBoard[i][j];
        if (i === coord.i && j === coord.j) continue; //first cell user clicked or he pre marked it;
        if (!currCell.isBomb) {
            currCell.isBomb = true;
            minesCount--;
        }
    }
}

function renderBoard() {
    renderHeader()
    var strHtml = ''
    for (var i = 0; i < gLevel.SIZE; i++) {
        strHtml += '<tr>';
        for (var j = 0; j < gLevel.SIZE; j++) {
            strHtml += `<td id="cell-${i}-${j}" onMouseDown="cellClicked(event)">`
            if (gBoard[i][j].isMarked) strHtml += MARK;
            // Uncomment  the next line for testing. it intitializes every cell text with a boolean wheather it's a bomb, and the number of bombs around;
            // strHtml += `${gBoard[i][j].isBomb}, ${gBoard[i][j].bombsAroundCount}`
            strHtml += `</td>`
        }
        strHtml += '</tr>'
    }
    var elBoard = document.querySelector('.board');
    elBoard.innerHTML = strHtml;
}

//render board table header with smiley, markedCount and clock;
function renderHeader() {
    var elGameHeader = document.querySelector('.game-header');
    var strHtml = '<tr>';
    strHtml += '<th class="clock">0</th>';
    strHtml += `<th  colspan="${gLevel.SIZE - 2}" class="smiley">${NORMAL}</th>`;
    strHtml += `<th class="mark-count">${gLevel.MINES - gState.markedCount}</th></tr>`;
    elGameHeader.innerHTML = strHtml;
}

function setMinesNegsCount() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard[0].length; j++) {
            var currCell = gBoard[i][j];
            if (currCell.isBomb) continue;
            currCell.bombsAroundCount = countBombsAround(i, j)
        }
    }
}

function countBombsAround(row, col) {
    var count = 0;
    for (var i = row - 1; i <= row + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = col - 1; j <= col + 1; j++) {
            if (j < 0 || j >= gBoard[0].length || (i === row && j === col)) continue;
            if (gBoard[i][j].isBomb) count++
        }
    }
    return count;
}

function cellClicked(evClick) {
    if (gState.needReset) return; //if game is over user cant click

    var elCell = evClick.target;
    var coord = getCellCoord(elCell.id)
    var cell = gBoard[coord.i][coord.j];

    if (evClick.button !== 2 && cell.isMarked) return; //if user left clicks on a marked cell

    if (!gState.isGameOn && evClick.button !== 2) initGame(coord) //when the first click occurs 

    if (cell.isShown) return;
    //check if right click :
    if (evClick.button === 2) {
        cellMarked(elCell, coord);
        return;
    }

    // if (cell.isMarked) return; // not needed

    if (cell.isBomb) bombClicked(elCell);
    else if (cell.bombsAroundCount > 0) showCell(coord, cell.bombsAroundCount);
    else expandShown(coord);
}



// Show one cell
function showCell(coord, char) {
    var cell = gBoard[coord.i][coord.j]
    var elCell = document.querySelector(`#cell-${coord.i}-${coord.j}`)
    cell.isShown = true;
    elCell.classList.add('shown');
    gState.shownCount++
    if (char !== '') {
        elCell.style.color = colorByNumMap[char];
    }
    elCell.innerText = char;
    checkGameOver()
}

// function gets a cell with no bombs around, expose the cell, and go over it's neighbors,
// the function skips cells  with bomb and calls itself recursively in case of another empty cell with 0 bombs around is found

function expandShown(coord) {
    var char = deterChar(coord);
    showCell(coord, char)

    // CR: coord.i will be better then coord.i
    var diff = 1;
    for (var i = coord['i'] - diff; i <= coord['i'] + diff; i++) {
        if (i < 0 || i > gBoard.length - 1) continue;

        for (var j = coord['j'] - diff; j <= coord['j'] + diff; j++) {
            if (j < 0 || j > gBoard[0].length - 1) continue;

            var cell = gBoard[i][j];
            if (cell.isShown || cell.isBomb || cell.isMarked) continue;

            var currCoord = { i: i, j: j }
            var currShowCellValue = deterChar(currCoord);
            if (cell.bombsAroundCount > 0) {

                showCell(currCoord, currShowCellValue)
            } else {
                expandShown(currCoord);
            }
        }
    }
    return; 
}


// in case a user right cllicks on cell
function cellMarked(elCell, coord) {

    // CR: You have already tested this in "cellClicked" before you have called this func. This test is unnecessary
    if (gState.needReset) return; 

    var cell = gBoard[coord.i][coord.j]
    var elMarkCount = document.querySelector('.mark-count');
    if (cell.isMarked) {
        elCell.innerText = '';
        gState.markedCount--
        elMarkCount.innerText++
        cell.isMarked = !cell.isMarked;

    } else if (gState.markedCount < gLevel.MINES) {
        elCell.innerText = MARK;
        gState.markedCount++
        elMarkCount.innerText--
        checkGameOver()
        cell.isMarked = !cell.isMarked;
    }
}

//in case the user clicked on bomb
function bombClicked(elCell) {
    clearInterval(gGameInterval)
    gGameInterval = null;
    gState.needReset = true;
    var elSmiley = document.querySelector('.smiley');
    elSmiley.innerText = SAD;
    elCell.classList.add('bomb')
    showAllBombs()
}

// after a user clicked a bomb, all the others are exposed;
function showAllBombs() {
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            var cell = gBoard[i][j];
            if (cell.isBomb) {
                var elCell = document.querySelector(`#cell-${i}-${j}`);
                elCell.innerText = BOMB;
            }
        }
    }
}

// every time a cell is marked or exposed, the function checks if the user won;
function checkGameOver() {
    if (gState.shownCount === gLevel.SIZE ** 2 - gLevel.MINES && gState.markedCount === gLevel.MINES) {
        clearInterval(gGameInterval);
        gGameInterval = null;
        checkBestScores()
        gState.needReset = true;
        var elSmiley = document.querySelector('.smiley');
        elSmiley.innerText = VICTORY;
    }
}

//function called when  item on the levels menu is clicked 
function levelClicked(elNewLevel, levelName) {
    if (elNewLevel.classList.contains('selected')) return;
    var elCurrLevel = document.querySelector('.selected');
    elCurrLevel.classList.remove('selected');
    elNewLevel.classList.add('selected');
    gLevel = gLevels[levelName];

    resetGame()
}


// CR: Not always working
function checkBestScores() {
    var bestScore = localStorage.getItem(`sweeper-${gLevel.LEVEL}`);
    if (gState.secsPassed < bestScore || bestScore === null) {  ///too less time
        localStorage.setItem(`sweeper-${gLevel.LEVEL}`, gState.secsPassed);
        renderScores()
    }
}

function renderScores() {
    for (var level in gLevels) {
        var score = localStorage.getItem(`sweeper-${level}`);
        if (score !== null) {
            var elScore = document.querySelector(`.${level}-score`);
            elScore.innerText = `${level}: ${score} Seconds.`
        }
    }
}

function resetScores() {
    for (var level in gLevels) {
        localStorage.removeItem(`sweeper-${level}`);
        var elScore = document.querySelector(`.${level}-score`);
        elScore.innerText = '';
    }
}

// function get coord and  determine what char to render with showCell

function deterChar(coord) {
    var char = (gBoard[coord.i][coord.j].bombsAroundCount === 0) ? '' : gBoard[coord.i][coord.j].bombsAroundCount;
    return char;
}

function updateClock() {
    var elClock = document.querySelector('.clock');
    elClock.innerText = gState.secsPassed = ((Date.now() - gStartTime) / 1000).toFixed(0);
}

// DISABLE BROWSER MENU WHEN RIGHT CLICK;
document.oncontextmenu = function () {
    return false;
}

function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    return coord;
}
//needReset prevents cells being clicked when game is done. isGame oמ turns true on first click:
function resetState() {
    gState = { needReset: false, isGameOn: false, shownCount: 0, markedCount: 0, secsPassed: 0 }
}