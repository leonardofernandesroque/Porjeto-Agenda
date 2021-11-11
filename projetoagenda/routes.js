const express = require('express');
const route = express.Router();
const homeController = require('./src/controllers/homeController');
const contatoController = require('./src/controllers/contatoController');
const loginController= require('./src/controllers/loginController');

const {loginRequired} = require('./src/middlewares/middleware');

//rota home

route.get('/', homeController.index);

//Rota login

route.get('/login/index', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato

route.get('/contato/index', loginRequired ,contatoController.index);
route.post('/contato/register',loginRequired ,contatoController.register);
route.get('/contato/index/:id',loginRequired ,contatoController.editIndex);
route.post('/contato/edit/:id',loginRequired ,contatoController.edit);
route.get('/contato/delete/:id',loginRequired ,contatoController.delete);






module.exports = route;