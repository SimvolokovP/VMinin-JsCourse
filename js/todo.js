const createBtn = document.getElementById('create');
const titleInput = document.getElementById('title');
const taskContainer = document.getElementById('list');
let list = [
    
];
let countId = Number (0);



function createTask() {
    if (titleInput.value == '') {
        alert('Empty input!')
    } else {
        list.push({
            "id" : countId,
            "title" : titleInput.value,
            "checked": ''
        });
    }
    render(list);
    titleInput.value = ''
    updateStorage();
    countId++;
}

function template(title, checked, id) {
    return `<li data-id="${id}"
        class="list-group-item d-flex justify-content-between align-items-center ${checked}"
        >
        <span>${title}</span>
        <span>
        <span class="btn btn-small btn-success" onclick="checked(this)">&check;</span>
        <span class="btn btn-small btn-success" onclick="renameTask(this)">R</span>
        <span class="btn btn-small btn-danger" onclick="removeTask(this)">&times;</span>
        </span>
        </li>`;
}

function removeTask(el) {
    const item = el.closest('li');
    const currentId = item.getAttribute('data-id');
    for (let i = 0; i < list.length; i++) {
        if (list[i].id == currentId) {
            list.splice(i, 1);
            render(list);
        }
        // console.log(list[i].id)
        // if (item.dataset.id == list[i].id) {
        //     list.splice(i, 1);
        //     render(list);
        // }
    }

    updateStorage();
}

function renameTask(el) {
    const item = el.closest('li');
    const currentId = item.getAttribute('data-id');
    
    if (titleInput.value == '') {
        alert('Empty input!')
    } else {
        for (let i = 0; i < list.length; i++) {
            if (list[i].id == currentId) {
                list[i].title = titleInput.value;
                updateStorage();
            }
        }
    }
    render(list);
    titleInput.value = '';
}

function checked(el) {
    const item = el.closest('li');
    const currentId = item.getAttribute('data-id');

    for (let i = 0; i < list.length; i++) {
        if (list[i].id == currentId) {
            // list[i].checked == 'checked' ? list[i].checked = '' : list[i].checked = 'checked';
            if (list[i].checked == 'checked') {
                list[i].checked = ''
            } else {
                list[i].checked = 'checked'
            }
        }
    }

    item.classList.toggle('checked');

    createDecoration();
    updateStorage();
}

function createDecoration() {
    const items = taskContainer.querySelectorAll('li');

    items.forEach(el => {
        let title = el.querySelector('span');
        if (el.classList.contains('checked')) {
            title.style.textDecoration = 'line-through'
        } else {
            title.style.textDecoration = 'none'
        }
    })

}

function render(list) {
    taskContainer.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        let title = list[i].title;
        let checked = list[i].checked;
        let id = i;
        console.log(title)
        console.log(checked)
        console.log(id)
        taskContainer.insertAdjacentHTML('beforeend', template(title, checked, id));
    }
    createDecoration();
    
}

function deleteAll() {
    console.log(list)
    list.length = 0;
    console.log(list)
    render(list);
    updateStorage();
}

render(list);



const initState = () => {
    if (localStorage.getItem('task') != null) {
        list = JSON.parse(localStorage.getItem('task'));


        console.log(JSON.parse(localStorage.getItem('task')));
    }   
    render(list);     
}

initState();

const updateStorage = () => {
    let savedData = list;
    console.log(savedData);
    console.log(savedData.length);
    
    if (savedData.length) {
        localStorage.setItem('task', JSON.stringify(savedData));
    } else {
        localStorage.removeItem('task');
    }
}


