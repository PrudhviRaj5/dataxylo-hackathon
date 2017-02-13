/* jshint esversion: 6 */
/* jshint node: true */
(function(){
  'use strict';
})();

const express = require('express');
const router = express.Router();
const path = require("path");
const mime = require("mime");
const fs = require("fs");
const uid = require("uid2");
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const ObjectID = require('mongodb').ObjectID;
const MongoDB = require("./../utils/MongoDB");
const constants = require("./../config/constants");


router.post('/set_img_and_get_url', multipartMiddleware, function(req, res, next) {
  let is;
  let os;
  let targetPath;
  let targetName;

  let imageFile = req.files.file;
  if (!imageFile) {
    return res.status(500).send("Error occured: missing params in body");
  }
  let tempPath = imageFile.path;
  let type = mime.lookup(tempPath);
  if (constants.IMAGE_TYPES.indexOf(type) == -1) {
      return res.send(415, 'Supported image formats: jpeg, jpg, jpe, png.');
  }
  //extenstion of the file
  let extension = tempPath.split(/[. ]+/).pop();
  targetName = uid(22) + '.' + extension;
  targetPath = constants.IMAGE_TARGET_PATH + "/" + targetName;

  is = fs.createReadStream(tempPath);
  os = fs.createWriteStream(targetPath);

  is.on('open', function () {
    is.pipe(os);
  });

  //handle error
  is.on('error', function() {
    if (err) {
      return res.status(500).send('Something went wrong' + err);
    }
  });

  is.on('end', function() {
    //delete file from temp folder
    fs.unlink(tempPath, function(err) {
      if (err) {
        return res.status(500).send('Something went wrong' + err);
      }
      let imgURL = constants.STATIC_IMG_URL + targetName;
      return res.send(imgURL);
    });
  });

});


router.get('/fetch_all', function(req, res, next) {

  let mongo = new MongoDB();
  mongo.conn('dataxylodb', function(err, db) {
    if (err) {
      return res.status(500).send("Mongo connection Broken");
    }

    let allImgs = [];
    let picsCursor = db.collection("pictures").find();
    picsCursor.each(function(err, doc) {
      if (err) {
        return res.status(500).send("Error occured");
      }
      if (doc !== null) {
        let imgURL = doc.imgURL;
        let title = doc.title;
        let id = doc._id.toString();
        allImgs.push({
          imgURL: imgURL,
          title: title,
          id: id
        });
      } else {
        db.close();
        return res.send(allImgs);
      }
    });

  });

});


router.post('/find_all', function(req, res, next) {

  let title = req.body.title;

  if (!title) {
    return res.status(500).send("Error occured: missing params in body");
  }

  var regexValue='\.*'+title+'\.*';
  let mongo = new MongoDB();
  mongo.conn('dataxylodb', function(err, db) {
    if (err) {
      return res.status(500).send("Mongo connection Broken");
    }

    let allImgs = [];
    let picsQuery = {"title": new RegExp(regexValue, 'i')};
    let picsCursor = db.collection("pictures").find(picsQuery);
    picsCursor.each(function(err, doc) {
      if (err) {
        return res.status(500).send("Error occured");
      }
      if (doc !== null) {
        let imgURL = doc.imgURL;
        let title = doc.title;
        let id = doc._id.toString();
        allImgs.push({
          "imgURL": imgURL,
          "title": title,
          "id": id
        });
      } else {
        db.close();
        return res.send(allImgs);
      }
    });

  });

});


router.post('/post_img', function(req, res, next) {

  let imgURL = req.body.imgURL;
  let title = req.body.title;
  if (!imgURL || !title) {
    return res.status(500).send("Error occured: missing params in body");
  }
  var postQuery = {
    "imgURL": imgURL,
    "title": title
  };
  let mongo = new MongoDB();
  mongo.conn('dataxylodb', function(err, db) {
    if (err) {
      return res.status(500).send("Mongo connection Broken");
    }
    db.collection("pictures").insertOne(postQuery, function(err, result) {
      if (err) {
        res.status(500).send("Error inserting" + err);
      }
      var id = result.ops[0]._id.toString();
      db.close();
      return res.send({
        "id": id
      });

    });

  });

});


router.post('/delete_img', function(req, res, next) {

  let id = req.body.id;
  let imgURL = req.body.imgURL;

  let imgSplit = imgURL.split('/');
  let imgPath = path.join(constants.IMAGE_TARGET_PATH, imgSplit[imgSplit.length-1]);

  if (!id || !imgURL) {
    return res.status(500).send('Error occured: missing params in body');
  }
  let deleteQuery = {
    "_id": new ObjectID(id)
  };

  let mongo = new MongoDB();
  mongo.conn('dataxylodb', function(err, db) {
    if (err) {
      return res.status(500).send('Mongo connection Broken');
    }

    db.collection('pictures').remove(deleteQuery, {"safe": true}, function(err, result) {
      if (err) {
        return res.status(500).send('Error occured');
      }
      fs.unlink(imgPath, function(err) {
        db.close();
        return res.send("OK");
      });
    });

  });

});


module.exports = router;