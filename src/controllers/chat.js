module.exports.get = function(app, req, res) {
    res.render("home/chat");
    if(req !== null) {
        //app.get('io').emit('join', JSON.stringify({username: req.query.username}));
    }
}

module.exports.post = function(req, res) {
    let response = req.body;
    res.status(200).send(response);
}