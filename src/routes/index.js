module.exports = function(app) {
    app.get('/index', function(req, res){
        app.src.controllers.index.get(req, res);
    });

    app.post('/index', function(req, res){
        app.src.controllers.index.post(app, req, res);
    });
}