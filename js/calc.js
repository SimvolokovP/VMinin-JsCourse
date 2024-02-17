const firstInput = document.getElementById('input1');
const secondInput = document.getElementById('input2');

let action = '';

function setAction(el) {
    if (el.id == 'plus') {
        action = '+';
    }
    if (el.id == 'minus') {
        action = '-';
    }
    if (el.id == 'mult') {
        action = '*';
    }
    if (el.id == 'divide') {
        action = '/';
    }
}


function solve() {
    const firstNumber = Number (firstInput.value);
    const SecondNumber = Number (secondInput.value);

    if (action === '+') {
        console.log(Number (firstNumber + SecondNumber))
        return Number (firstNumber + SecondNumber);
    }

    if (action === '-') {
        console.log(Number (firstNumber - SecondNumber))
        return Number (firstNumber - SecondNumber);
    }

    if (action === '*') {
        console.log(Number (firstNumber * SecondNumber))
        return Number (firstNumber * SecondNumber);
    }

    if (action === '/') {
        console.log(Number (firstNumber / SecondNumber))
        return Number (firstNumber / SecondNumber);
    }
}

function showResult() {
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = solve();
}