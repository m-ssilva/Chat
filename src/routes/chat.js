module.exports = function(app) {
    app.get('/chat', function(req, res){
        app.src.controllers.chat.get(app, req, res);
    });

    app.post('/chat', function(req, res){
        app.src.controllers.chat.post(app, req, res);
    });
}