const express = require('express');

const consign = require('consign');

const bodyParser = require('body-parser');

const validator = require('express-validator');

const mustache = require('mustache-express');

const path = require('path');

const server = express();

server.engine('mustache', mustache(path.resolve('src/views/partials'), '.mst'));
server.set('views', path.resolve('./src/views'));
server.set('view engine', 'mustache');
server.use(express.static('public'));

//MIDDLEWARES
server.use(bodyParser.urlencoded({extended: true}));
server.use(validator());
consign()
    .include('src/routes')
    .then('src/models')
    .then('src/controllers')
    .into(server);
module.exports = server;