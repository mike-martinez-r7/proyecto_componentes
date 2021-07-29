const { ConnectContactLens } = require('aws-sdk');
const CompanyService = require('../services/CompanyService')

const CompanyController = {
  getById : async (req, res) => {
    let company = await CompanyService.getById(req.params.id);

    if (company && !company.success) {
      res.send({
        success: false,
        message: company.error
      });
    }

    res.send(company.data);
  },

  get : async (req, res) => {
    let companies = await CompanyService.getAll();

    res.send(companies.data);
  },

  register : (req, res) => {
    //Validate company data info
    const { error, value } = CompanyService.validate(req.body);

    if (error) {
      return res.status(400).send({
        success: false,
        message: error.details
      });
    }

    //Insert data in DB
    let companyCreated = CompanyService.register(req.body);

    if (!companyCreated.success) {
      return res.send({
        success: false,
        message: 'There\'s an error when registering the company', 
        details: companyCreated.message
      });
    }

    return res.send({
      success: true,
      message: 'Company registered succesfully',
      data: companyCreated.data
    });
  }
}

module.exports = CompanyController;