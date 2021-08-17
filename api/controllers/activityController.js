const { v1: uuidv1 } = require('uuid');
const config = require('../config.js');
const ActivityService = require('../services/activityService.js');

const ActivityController = {
  get : async (req, res) => {
    let activities = await ActivityService.getAll();
    
    res.send(activities.data);
  },

  subscribe : async (req, res) => {
    let activityId = req.params.activity;
    let userId = req.params.user;

    let result = await ActivityService.subscribe(userId, activityId);

    if (result && !result.success) {
      res.send({
        success: false,
        message: result.error
      });
    }

    res.send(result);
  },

  register : (req, res) => {
    //Insert activity data in DB
    let activityCreated = ActivityService.register(req.body);

    if (!activityCreated.success) {
      return res.send({
        success: false,
        message: 'There\'s an error when registering the activity', 
        details: activityCreated.message
      });
    }

    return res.send({
      success: true,
      message: 'Activity registered succesfully',
      data: activityCreated.data
    });
  },
}

module.exports = ActivityController;