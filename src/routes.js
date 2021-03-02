const express = require('express');
const connection = require('./database/connection');
const cors = require('cors');
const UsersController = require('./controllers/UsersController')
const GastosController = require('./controllers/GastosController')
const PerfilController = require('./controllers/PerfilController')
const SessionsController = require('./controllers/SessionsController')

const routes = express.Router();

// Users
routes.get('/user', UsersController.view);
routes.post('/user', UsersController.create);

// Perfil
routes.get('/perfil', PerfilController.view);

// Session
routes.post(`/sessions`, SessionsController.create);

// CRUD Gastos
routes.delete('/gastos/:id',GastosController.delete);
routes.get('/gastos', GastosController.view);
routes.post('/gastos', GastosController.create);

module.exports = routes;