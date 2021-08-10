const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk');
const config = require('../config.js');
const joi = require('joi');

const UserService = {
  getAll : async () => {
    let awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docUser = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.users_table_name
    };

    let awsRequest = await docUser.scan(params);
    let data = await awsRequest.promise();
  
    return { 
      success: true,
      data: data.Items || {}
    }; 
  },

  validate : (userdata) => {
    const schema = joi.object({
      email: joi.string().email().required().messages({
        'string.empty': `"Email" cannot be empty`,
        'string.email': `"Email" is not valid address`,
        'any.required': `"Email" is required`
      }),
      name: joi.string().required().messages({
        'string.empty': `"Name" cannot be empty`,
        'any.required': `"Name" is required`
      }),
      lastname: joi.string().required().messages({
        'string.empty': `"Lastname" cannot be empty`,
        'any.required': `"Lastname" is required`
      }),
      datebirth: joi.date().required(),
      company: joi.string().required().messages({
        'string.empty': `"Company" cannot be empty`,
        'any.required': `"Company" is required`
      }),
    });

    return schema.validate(userdata);
  },

  register : (user) => {
    //Add additional properties
    user['id'] = uuidv1();
    user['timestamp'] = new Date().toDateString();

    //Save data to DynamoDB
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docUser = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.users_table_name,
      Item: { ...req.body }
    };

    docUser.put(params, (err, data) => {
      if (err) {
        return { 
          success: false,
          error: err
        };
      }
    });

    return { 
      success: true,
      data: user
    };
  }
}

module.exports = UserService;