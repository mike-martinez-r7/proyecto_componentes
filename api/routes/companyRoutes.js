const express = require('express');

const routes = () => {
    const companyRouter = express.Router();
    const companyController = require('../controllers/companyController');

    companyRouter
        .get('/:id', (req, res) => companyController.getById(req, res))
        .get('/', (req, res) => companyController.get(req, res))
        .post('/', (req, res) => companyController.register(req, res));

    return companyRouter;
}

module.exports = routes;