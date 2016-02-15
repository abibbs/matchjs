'use strict';

var helpers = require('../db/helpers');
var search = require('../search/search');
var emailer = require('../email/emailHandler');

module.exports = {

  getAllUsersRec: function(req,res) {
    var username = req.params.username;
    helpers.getAllUsersRec(username)
    .then(function(usersArray) {
      res.send(usersArray);
    });
  },

  getAllUsers: function(req,res) {
    var username = req.params.username;
    helpers.getAllUsers(username)
    .then(function(usersArray) {
      res.send(usersArray);
    });
  },

  getUserProfileData: function(req, res) {
    helpers.getUserByUserName(req.params)
    .then(function(user) {
      res.send(user);
    });
  },

  updateProfile: function(req, res) {
    helpers.updateUser(req.body)
    .then(function(user) {
      res.send(user);
    });
  },

  getUsersByLocation: function(req, res) {
    var location = req.params.cityname;
    helpers.getUsersByLocation(location)
    .then(function(usersArray) {
      res.send(usersArray);
    });
  },

  addPadawan: function(req, res) {
    var mentorObj = req.params;
    var username = req.params.username;
    var padawan = req.body.username;
    helpers.addPadawan(username, padawan)
    .then(function(user) {
      helpers.getUserByUserName(mentorObj)
        .then(function(mentor) {
          var mentorData = mentor.dataValues;
          mentorData.padawan = padawan;
          emailer.newPadawan(mentorData);
          res.send('success! padawan added and email sent');
        });
    });
  },

  getPadawans: function(req, res) {
    var username = req.params.username;
    helpers.getPadawansByMentor(username)
    .then(function(padawans) {
      res.status(200).send(padawans);
    });
  },

  deletePadawan: function(req, res) {
    var mentor = req.params.mentor;
    var padawan = req.params.padawan;
    helpers.deletePadawan(mentor, padawan)
    .then(function(resp) {
      res.status(200).send('successfully deleted padawan status');
    });
  },

  getMentors: function(req, res) {
    var mentee = req.params.username;
    helpers.getMentors(mentee)
    .then(function(padawanRelArr) {
      res.status(200).send(padawanRelArr);
    });
  },

  getUsersByQuery: function(req, res) {
    helpers.getAllUsers()
    .then(function(usersArray) {
      res.send(search.getSearchResults(req.query, usersArray));
    });
  },

  deleteAccount: function(req, res) {
    helpers.deleteUser(req.params)
    .then(function(user){
      res.redirect('/auth/logout');
    });
  },

  saveUserPreferences: function(req, res) {
    var username = req.cookies['user-profile'].username;
    var wantFollowerEmails = req.body.wantFollowerEmails;
    var wantChatEmails = req.body.wantChatEmails;
    var wantInvitationEmails = req.body.wantInvitationEmails;
    helpers.updateUser({username: username, wantChatEmails: wantChatEmails, wantInvitationEmails: wantInvitationEmails, wantFollowerEmails: wantFollowerEmails})
    .then(function(user){
      res.status(200).send(user);
    });
  }

};
