const app = require('./src/config/server');
const socket = require('socket.io');
const server = app.listen(8001, function(){
    console.log('Servidor Escutando na Porta 8001');
});

const io = socket.listen(server);
app.set('io', io);

let users = new Array();

io.on('connection', function(socket){

    socket.on('disconnect', function() {
        console.log('Um usuário saiu! ' + socket.id);
        let i = 0;
        users.forEach(item => {
            if(item.id == socket.id) {
                users.splice(i, 1);
                io.emit('disconnect', item.username);
            }
            i++;
        });
    });
    socket.on('join', function(user) {
        if(user !== null) {
            let username = JSON.parse(user).username;
            users.push({'username': username, 'id': socket.id});
            io.emit('join', users);
            console.log("Um novo usuário conectou: " + username + " " + socket.id);
        } else {
            console.log('denied');
            socket.emit('action', 'denied');
        }
    });
    socket.on('message', function(user) {
        let username = JSON.parse(user).username;
        let message = JSON.parse(user).message;
        io.emit('message', JSON.stringify({'username': username, 'message': message, 'time': new Date().toUTCString()}));
    });
})
io.on('disconnect', function(socket){
    console.log('Caiu conexaão' + socket.id);
})
