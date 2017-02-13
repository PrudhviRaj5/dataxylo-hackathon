/* jshint esversion: 6 */
/* jshint node: true */
(function(){
  'use strict';
})();

const MongoClient = require("mongodb").MongoClient;
const constants = require("./../config/constants");

const MongoDB = function() {};

MongoDB.prototype.conn = function(dbName, callback) {
    var url = "mongodb://" + constants.MONGO_HOST + "/" + dbName;
    MongoClient.connect(url, function(err, db) {
        if (!err) {
            callback(null, db);
        } else {
            callback(err);
        }
    });
};

module.exports = MongoDB;
