const { v1: uuidv1 } = require('uuid');
const config = require('../config.js');
const UserService = require('../services/userService.js');

const UserController = {
  get : async (req, res) => {
    let users = await UserService.getAll();
    
    res.send(users.data);
  },

  register : (req, res) => {
    //Validate userdata info
    const { error, value } = UserService.validate(req.body);

    if (error) {
      return res.status(400).send({
        success: false,
        message: error.details
      });
    }

    //Insert data in DB
    let userCreated = UserService.register(req.body);

    if (!userCreated.success) {
      return res.send({
        success: false,
        message: 'There\'s an error when registering the user', 
        details: userCreated.message
      });
    }

    return res.send({
      success: true,
      message: 'User registered succesfully',
      data: userCreated.data
    });
  },

  login : async (req, res) => {
    //Validate login data
    const { error, value } = UserService.validateLogin(req.body);

    if (error) {
      return res.status(401).send({
        success: false,
        message: error.details
      });
    }

    let login = await UserService.login(req.body);
    res.send(login);
  }
}

module.exports = UserController;