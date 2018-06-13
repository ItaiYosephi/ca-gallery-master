'use strict';

var gNum1 = null;
var gNum2 = null;
var gScreen;
var gOp = null;
var gMemory = 0;
var gOpMap = {
    '+': function (num1, num2) { return +num1 + +num2 },
    '-': function (num1, num2) { return +num1 - +num2 },
    '*': function (num1, num2) { return +num1 * +num2 },
    '/': function (num1, num2) { return +num1 / +num2 },
    '√': function (num) { return Math.sqrt(+num) },
    '1/🗴': function(num) {return (+num)/4},
    '±': function(num) {return -(+num)},
}

function addDigit(digit) {
    if (!gNum1) {
        gNum1 = digit;
        // renderSmallScreen(gNum1);
    }
    else {
        gNum1 += digit;
    }
    renderMainScreen(gNum1);
}


function setOp(op) {
    if (gNum2 === null) {
        // debugger;
        renderSmallScreen(gNum1);
        gOp = op;
        gNum2 = gNum1;
        gNum1 = null;

    } else {
        // debugger;
        renderSmallScreen(gNum1)
        gNum2 = gOpMap[gOp](+gNum2, +gNum1);
        renderMainScreen(gNum2)
        gNum1 = null;
        gOp = op;

    }
    renderSmallScreen(gOp)
}

function setOneNumOp(op) {
    var elScreen = document.querySelector('.main-screen')
    var num= +elScreen.innerText;
    gNum1= gOpMap[op](num)
    gNum2=null;
    renderMainScreen(gNum1)
    clearSmallScreen()
    // renderSmallScreen(gNum1)

}
function equal() {
    if (!gOp) return;

    var res = gOpMap[gOp](+gNum2, +gNum1)
    renderMainScreen(res)
    clearSmallScreen();
    console.log(res)
    gNum2 = null;
    gNum1 = res;
    gOp = null;

}

function clearAll() {
    // debugger;
    gNum1 = null;
    gNum2 = null;
    gOp = null;
    renderMainScreen('')
    clearSmallScreen('')
    memory('MC');
}

function memory(el) {
    var action = el.innerText;
    switch (action) {
        case 'MC':
            gMemory = 0;
            break;
        case 'MR':
            reCallMemmory();
            break;
        case 'MS':
            gMemory = +document.querySelector('.main-screen').innerText;
            break;
        case 'M+':
            gMemory += +document.querySelector('.main-screen').innerText;
            break;
        case 'M+':
            gMemory += +document.querySelector('.main-screen').innerText;
            break;
    }
    var elMemory = document.querySelector('.memory')
    elMemory.innerText= gMemory;
}

function reCallMemmory() {
    if (gOp == null) {
        gNum1 = gMemory
        renderMainScreen(gNum1)
        clearSmallScreen();
        renderSmallScreen(gNum1)
    }
    else {
        gNum2 = +gOpMap[gOp](+gNum2, +gMemory);
        renderMainScreen(gMemory)
        renderSmallScreen(gMemory);
    }
}



function renderMainScreen(num) {
    var elScreen = document.querySelector('.main-screen');
    elScreen.innerText = num;
}

function clearSmallScreen() {
    var elScreen = document.querySelector('.small-screen');
    elScreen.innerText = '';
}

function renderSmallScreen(char, ) {
    var elScreen = document.querySelector('.small-screen');
    elScreen.innerText += char;
}