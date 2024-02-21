const output = document.getElementById('output')

let currentMode = 'full';

setInterval(update, 1000);
update();

function update() {
    output.textContent = format(currentMode);
}

function chooseMode(button) {
    currentMode = button.id;
    update();
}

function format(modeFormat) {
    const date = new Date();

    switch (modeFormat) {
        case 'full': return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
        case 'time': return  date.toLocaleTimeString();
        case 'date': return date.toLocaleDateString();
        default: return '00:00:00';
    }
}