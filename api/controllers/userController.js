const AWS = require('aws-sdk');
const config = require('../config.js');

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
        TableName: config.aws_table_name
      };
  
      docUser.scan(params, (err, data) => {
        if (err) {
          res.send({
              success: false,
              message: err
          });
        } else {
          let { Items } = data;
          res.send({
              success: true,
              users: Items
          });
        }
      }); 
    },

    post : (req, res) => {
      let awsConfig = new AWS.Config();
      
      AWS.config.update({
        region: 'us-east-1',
        accessKeyId: 'AKIAVX4QTOARL7YP2OKJ',
        secretAccessKey: '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',
      });
      
      const docUser = new AWS.DynamoDB.DocumentClient();

      let params = {
        TableName: config.aws_table_name,
        Item: {
          id: '2',
          email: 'mike.martinez.r7@gmail.com',
          pass: '3333',
        }
      };

      docUser.put(params, (err, data) => {
        if (err) {
          return res.send({
            success: false,
            message: err
          });
        }

        return res.send({
          success: true,
          message: 'User created succesfully!',
          data: data
        });
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