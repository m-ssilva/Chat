module.exports.get = function(req, res) {
    res.render("home/index");
    if(req !== null) {
        console.log(req.body);
    }
}

module.exports.post = function(req, res) {
    let response = req.body;
    res.status(200).send(response);
}