const express = require('express');

const routes = () => {
    const userRouter = express.Router();
    const userController = require('../controllers/userController')

    userRouter.route('/')
        .get(userController.get)
        .post((req, res) => userController.register(req, res));

    return userRouter;
}

module.exports = routes;