const AWS    = require('aws-sdk');
const config = require('../config.js');
const joi    = require('joi');

const UserController = {
    get : (req, res) => {
      let awsConfig = new AWS.Config();
      
      AWS.config.update({
        region: 'us-east-1',
        accessKeyId: 'AKIAVX4QTOARL7YP2OKJ',
        secretAccessKey: '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',
      });

      const docUser = new AWS.DynamoDB.DocumentClient();
  
      let params = {
        TableName: 'users'
      };
  
      docUser.scan(params, (err, data) => {
        if (err) {
          res.send({
              success: false,
              message: err
          });
        }

        let { Items } = data;
        res.send(Items);
      }); 
    },

    post : (req, res) => {
      const schema = joi.object({
        email: joi.string().required(),
        name: joi.string().required(),
        lastname: joi.string().required(),
        datebirth: joi.date().required()
      });

      const { error, value } = schema.validate(req.body);

      if (error) {
        return res.status(400).send({
          success: false,
          message: error,
          value: value
        });
      }

      const awsConfig = new AWS.Config();
      AWS.config.update(config.aws_remote_config);
      
      const docUser = new AWS.DynamoDB.DocumentClient();

      let params = {
        TableName: 'users',
        Item: {
          email: req.body.email,
          name: req.body.name,
          lastname: req.body.lastname,
          datebirth: req.body.lastname
        }
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
        message: 'User created succesfully!',
        data: req.body
      });
    },

    put : (req, res) => {
        console.log('PUT from UserController');
    },

    del : (req, res) => {
        console.log('DELETE from UserController');
    }
}

module.exports = UserController;