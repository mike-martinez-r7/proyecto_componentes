const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk');
const crypto = require('crypto')
const joi = require('joi');
const config = require('../config.js');
const UserService = require('./userService.js');


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

  getById : async (paramId) => {
    let awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docActivity = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.activities_table_name,
      Key: { id: paramId }
    };

    let awsRequest = await docActivity.get(params);
    let data = await awsRequest.promise();

    return {
      success: true,
      data: data.Item || {}
    };
  },

  subscribe : async (userId, activityId) => {
    //Subscribe a user to an activity
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docActivity = new AWS.DynamoDB.DocumentClient();
    const docUser = new AWS.DynamoDB.DocumentClient();


    //Read the current activity data
    let paramsActivity = {
      TableName: config.activities_table_name,
      Key: { id: activityId }
    };
    let awsRequest = await docActivity.get(paramsActivity);
    let currentActivity = await awsRequest.promise();


    //Read the current user data
    let paramsUser = {
      TableName: config.users_table_name,
      Key: { id: userId }
    };
    let awsRequestUser = await docUser.get(paramsUser);
    let currentUser = await awsRequestUser.promise();
   
    delete currentUser.Item.password;

    //Add the new user to subscribers
    let paramsUpdateActivity = {
      TableName: config.activities_table_name,
      Key: { 'id': currentActivity.Item.id },
      UpdateExpression: 'set assistants = list_append(assistants, :assistantValue)',
      ExpressionAttributeValues:{
        ':assistantValue': [currentUser.Item]
      },
      ReturnValues : 'UPDATED_NEW'
    };

    docActivity.update(paramsUpdateActivity, (error, data) => {
      if (error) {
        return {
          success: false,
          message: error
        };
      }
    });

    return {
      success: true
    };
  },
}

module.exports = ActivityService;