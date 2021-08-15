const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk');
const crypto = require('crypto')
const joi = require('joi');
const config = require('../config.js');

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
      password: joi.string().trim()/*.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)*/.required().messages({
        'string.empty': `"Password" cannot be empty`,
        'any.required': `"Password" is required`,
        /*'string.pattern.base': `"Password" must have at least 8 characters, at least 1 capital letter and 1 number`,*/
      }),
      datebirth: joi.date().required(),
      company: joi.string().required().messages({
        'string.empty': `"Company" cannot be empty`,
        'any.required': `"Company" is required`
      }),
    });

    return schema.validate(userdata);
  },

  validateLogin : (logindata) => {
    const schema = joi.object({
      email: joi.string().email().required().messages({
        'string.empty': `"Email" cannot be empty`,
        'string.email': `"Email" is not valid address`,
        'any.required': `"Email" is required`
      }),
      password: joi.string().trim()/*.regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)*/.required().messages({
        'string.empty': `"Password" cannot be empty`,
        'any.required': `"Password" is required`,
        /*'string.pattern.base': `"Password" must have at least 8 characters, at least 1 capital letter and 1 number`,*/
      })
    });

    return schema.validate(logindata);
  },

  register : (user) => {
    //Add additional properties
    user['id'] = uuidv1();
    user['timestamp'] = new Date().toDateString();
    user['password'] = crypto.createHash('md5').update(user.password).digest('hex');

    //Save data to DynamoDB
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docUser = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.users_table_name,
      Item: { ...user }
    };

    docUser.put(params, (err, data) => {
      if (err) {
        return { 
          success: false,
          error: err
        };
      }
    });

    delete user.password;

    return { 
      success: true,
      data: user
    };
  },

  login : async (login) => {
    let awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docUser = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.users_table_name,
      FilterExpression: 'email = :emailValue and password = :passwordValue',
      ExpressionAttributeValues: {
        ':emailValue': login.email,
        ':passwordValue': login.password
      }
    };

    let awsRequest = await docUser.scan(params);
    let data = await awsRequest.promise();

    if (data.Count == 0) {
      return {
        success: false,
        message: 'User or Password are invalid'
      };
    }

    delete data.Items[0].password;

    return {
      success: true,
      data: data.Items[0]
    };
  },
}

module.exports = UserService;