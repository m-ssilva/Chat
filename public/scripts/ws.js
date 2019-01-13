const socket = io('http://localhost:8001');

// LISTA DE USUÁRIOS LOGADOS
let loggedUsers = new Array();

/* QUANDO A CONECTAR COM O WS */
socket.on('connect', function () {
    socket.emit('join', JSON.stringify({ username: localStorage.getItem('username') }));
});

/* QUANDO RECEBE UMA MENSAGEM DO SERVIDOR */
socket.on('message', function (res) {
    console.log(res);
    document.querySelector('#table-rows-conversation').innerHTML += `<tr><td>${JSON.parse(res).username}</td><td>${JSON.parse(res).message}</td><td>${JSON.parse(res).time}</td></tr>`;
});

/* QUANDO UM USUÁRIO ENTRA NO SERVIDOR */
socket.on('join', function (users) {
    console.log(users);
    users.forEach(item => {
        if (!loggedUsers.includes(item.username)) {
            console.log(item.username + " entrou!");
            loggedUsers.push(item.username);
            document.querySelector('#table-rows-usernames').innerHTML += `<tr id='${item.username}'><td>${item.username}</td></tr>`;
        }
    });
});

/* NÃO IMPLEMENTEI CORRETAMENTE AINDA */
socket.on('action', function (action) {
    if (action === 'denied') {
        window.location = "/index";
    }
});

/* EVENTO QUANDO ALGUM USUÁRIO DESCONECTAR */
socket.on('disconnect', function (user) {
    loggedUsers.forEach(item => {
        if (user == item) {
            console.log("Usuario saiu: " + item);
            document.querySelector('#' + item).remove();
            loggedUsers.splice(loggedUsers.indexOf(item), 1);
        }
    })
});

// QUANDO CLICAR NO BOTÃO DE ENVIAR MENSAGEM NO CHAT.MUSTACHE
function communicate() {
    let message = document.querySelector('#message').value;
    socket.emit('message', JSON.stringify({ 'message': message, 'username': localStorage.getItem('username') }));
    document.querySelector('#message').value = "";
}