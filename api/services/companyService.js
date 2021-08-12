const { v1: uuidv1 } = require('uuid');
const AWS = require('aws-sdk');
const config = require('../config.js');
const joi = require('joi');

const CompanyService = {
  getAll : async () => {
    let awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docCompany = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.companies_table_name
    };
  
    let awsRequest = await docCompany.scan(params);
    let data = await awsRequest.promise();

    return {
      success: true,
      data: data.Items || {}
    };
  },

  getById : async (paramId) => {
    let awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docCompany = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.companies_table_name,
      Key: { id: paramId }
    };

    let awsRequest = await docCompany.get(params);
    let data = await awsRequest.promise();

    return {
      success: true,
      data: data.Item || {}
    };
  },

  validate : (companyData) => {
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
      descr: joi.string().required().messages({
        'string.empty': `"Description" cannot be empty`,
        'any.required': `"Description" is required`
      })
    });

    return schema.validate(companyData);
  },

  register : (company) => {
    //Add additional properties
    company['id'] = uuidv1();
    company['timestamp'] = new Date().toDateString();

    //Save data to DynamoDB
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docCompany = new AWS.DynamoDB.DocumentClient();

    let params = {
      TableName: config.companies_table_name,
      Item: { ...company }
    };

    docCompany.put(params, (error, data) => {
      if (error) {
        return {
          success: false,
          message: error
        };
      }
    });

    return {
      success: true,
      data: company
    };
  },

  update : (company) => {
    //Update data of a company to DynamoDB
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docCompany = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: config.companies_table_name,
      Key: { 'id': company.id },
      UpdateExpression: 'set descr = :descr, email = :email, name = :name',
      ExpressionAttributeValues:{
          ':descr': company.descr,
          ':email': company.email,
          ':name': company.name
      },
      ReturnValues : 'UPDATED_NEW'
    };

    docCompany.update(params, (error, data) => {
      if (error) {
        return {
          success: false,
          message: error
        };
      }
    });

    return {
      success: true,
      data: company
    };
  },

  delete : (id) => {
    //Delete a record of a company to DynamoDB
    const awsConfig = new AWS.Config();
    AWS.config.update(config.aws_remote_config);
    const docCompany = new AWS.DynamoDB.DocumentClient();

    var params = {
      TableName: config.companies_table_name,
      Key: { 'id': id }
    };

    docCompany.delete(params, (error, data) => {
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
  }
}

module.exports = CompanyService;