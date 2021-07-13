const AWS = require('aws-sdk');
const config = require('../config.js');

const UserController = {
    get : (req, res) => {
        console.log(`GET from UserController`);
        
        return res.send('get from controller'); 
    },

    post : (req, res) => {
      AWS.config.update(config.aws_remote_config);
      const docUser = new AWS.DynamoDB.DocumentClient();

      const newUser = {
        id: 1,
        email: 'xn1p3r@gmail.com',
        pass: 123,
      };

      let params = {
        TableName: config.aws_table_name,
        Item: newUser
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