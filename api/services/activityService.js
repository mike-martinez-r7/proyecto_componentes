const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk');
const crypto = require('crypto')
const joi = require('joi');
const config = require('../config.js');

const ActivityService = {
  getAll : async () => {
    let awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docActivity = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.activities_table_name
    };

    let awsRequest = await docActivity.scan(params);
    let data = await awsRequest.promise();
  
    return { 
      success: true,
      data: data.Items || {}
    }; 
  },

  register : (activity) => {
    //Add additional properties
    activity['id'] = uuidv1();
    activity['timestamp'] = new Date().toDateString();
    activity['company'] = '0a7cdbf0-f010-11eb-b6cb-2129e25dd2e1';

    //Save data to DynamoDB
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docActivity = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.activities_table_name,
      Item: { ...activity }
    };

    docActivity.put(params, (err, data) => {
      if (err) {
        return { 
          success: false,
          error: err
        };
      }
    });

    return { 
      success: true,
      data: activity
    };
  },
}

module.exports = ActivityService;