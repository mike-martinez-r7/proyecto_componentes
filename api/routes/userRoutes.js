const express = require('express');

const routes = () => {
    const userRouter = express.Router();
    const userController = require('../controllers/userController')

    userRouter.route('/')
        .get(userController.get);

    return userRouter;
}

module.exports = routes;