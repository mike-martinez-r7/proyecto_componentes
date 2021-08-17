const express = require('express');

const routes = () => {
    const userRouter = express.Router();
    const userController = require('../controllers/userController')

    userRouter
        .get('/', (req, res) => userController.get(req, res))
        .get('/:id', (req, res) => userController.getById(req, res))
        .post('/', (req, res) => userController.register(req, res))
        .post('/login', (req, res) => userController.login(req, res));

    return userRouter;
}

module.exports = routes;