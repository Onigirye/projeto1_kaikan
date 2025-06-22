var userList = []
var count = 1;

function addUser(name,email){
    var newUser = {id: count++,date: new Date().toISOString().slice(0, 10) ,name: name, email: email};
    userList.push(newUser);
    localStorage.setItem('users', JSON.stringify(userList));
    renderUserList();
}

function deleteUser(userId){
    var updatedUserList = userList.filter(function(user){
        return user.id !== userId;
    });

    if(updatedUserList.length < userList.length){
        userList = updatedUserList;
        localStorage.setItem('users', JSON.stringify(userList));
        renderUserList();
    }else{
        alert('Usuário não encontrado');
    }
}

function getUserList(){
    var storedUsers = JSON.parse(localStorage.getItem('users'));
    userList = storedUsers || [];
}

function renderUserList(){
    var userListElement = document.getElementById('userList');
    userListElement.innerHTML = '';

    userList.forEach(function(user){
        var userItem = document.createElement('li');
        userItem.innerHTML = 'Data: <span class="user-date">' + user.date + '| Nome: </span> <span class="user-name">' + user.name + '|  Email:</span>'+'</span> <span class="user-email">' + user.email + '</span>' + '<button class="delete-button" onclick="deleteUser(' + user.id + ')">Excluir</button>';
        userListElement.appendChild(userItem);
        });
}

getUserList();
renderUserList();

document.getElementById('userForm').addEventListener('submit', function(event){
    event.preventDefault();
    var nameInput = document.getElementById('nameInput');
    var emailInput = document.getElementById('emailInput');

    addUser(nameInput.value, emailInput.value);
    nameInput.value = '';
    emailInput.value = '';
});

function clearFields(){
    const name = document.querySelector('#nameInput');
    const email = document.querySelector('#emailInput');
    name.value = '';
    email.value = '';
};

function clearList(){
    localStorage.clear();
    userList = [];
    renderUserList();
}