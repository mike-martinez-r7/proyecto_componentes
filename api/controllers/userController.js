const { v1: uuidv1 } = require('uuid');
const config = require('../config.js');
const joi = require('joi');
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

    //Add additional properties
    req.body['id'] = uuidv1();
    req.body['timestamp'] = new Date().toDateString();

    //Save data to DynamoDb
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docUser = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.users_table_name,
      Item: { ...req.body }
    };

    docUser.put(params, (err, data) => {
      if (err) {
        return res.send({
          success: false,
          message: err
        });
      }
    });

    return res.send({
      success: true,
      message: 'User registered succesfully',
      data: req.body
    });
  }
}

module.exports = UserController;