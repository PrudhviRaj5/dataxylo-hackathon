/* jshint esversion: 6 */
/* jshint node: true */
(function(){
  'use strict';
})();

const os = require("os");
const path = require("path");

const constants = {
    MONGO_HOST: "localhost:27017",
    IMAGE_TYPES : ["image/jpeg", "image/png"],
    STATIC_IMG_URL : "http://139.59.216.131/static/image/",
    IMAGE_TARGET_PATH : path.join(os.homedir(), "storedimages")
};

module.exports = constants;