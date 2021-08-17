const express = require('express');

const routes = () => {
    const activityRouter = express.Router();
    const activityController = require('../controllers/activityController')

    activityRouter
        .get('/', (req, res) => activityController.get(req, res))
        .get('/:activity/subscribe/:user', (req, res) => activityController.subscribe(req, res))
        .post('/', (req, res) => activityController.register(req, res));

    return activityRouter;
}

module.exports = routes;