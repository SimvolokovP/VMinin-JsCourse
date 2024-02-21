const usersList = document.getElementById('list');
const filterInput = document.getElementById('filter');

let usersArray = [];

async function getData() {
    try{
        usersList.innerHTML = 'Поиск..'
        usersList.style.color = 'red';
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
            method: 'GET'
        });

        const data = await response.json();
        console.log(data)
        usersArray = data;
        setTimeout(() => {
            renderUsers(data)},
            1500
        );
    } catch(err) {
        console.log("erorr is " + err)
    } finally {
        console.log('finally')
    }
}

function renderUsers(data) {
    usersList.innerHTML = '';
    data.forEach(user => {
        const name = user.name;
        const email = user.email;
        const phone = user.phone;

        usersList.insertAdjacentHTML('beforeend', userTemplate(name, email, phone))
    })
}

function userTemplate(name, email, phone) {
    return `<li class="list-group-item">
                <span>${name}</span>
                <span>${email}</span>
                <span>${phone}</span>
            </li>`;
}

filterInput.addEventListener('input', () => {
    const value = filterInput.value.toLowerCase();
    const filteredUsers = usersArray.filter(user => {
        return user.name.toLowerCase().includes(value);
    });
    renderUsers(filteredUsers);
    checkEmpty();
});

function sortByKey(currentBtn) {
    const key = currentBtn.getAttribute('id');
    const sortedUsers = [...usersArray].sort((a, b) => a[key].localeCompare(b[key]));
    renderUsers(sortedUsers);
    console.log(sortedUsers)
    console.log(usersArray)
}

function resetSort() {
    const initArray = usersArray;
    renderUsers(initArray);
}

function checkEmpty() {
    if (usersList.innerHTML == '') {
        usersList.innerHTML = 'Ничего не найдено..'
    }
}

getData();