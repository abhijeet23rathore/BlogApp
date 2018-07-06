const express = require("express");
const mongoose = require("mongoose");

const User = require("../models/user");
const Blog = require("../models/blog");

var redisClient = require('redis').createClient;
var redis = redisClient(6379, 'localhost');

const router = express.Router();

router.get("", (req, res, next) => {

  redis.get('users', function (err, response) {
    if (err) {
      console.log('Error');
    }
    else if (response) //Users exists in cache
    {
      //console.log(JSON.parse(response));
      res.status(200).send(
        JSON.parse(response)
      )
    }
    else {
    User.find().then(documents => {
      var returnObject = {
        message: "Users fetched successfully!",
        users: documents
      }
      //console.log(JSON.stringify(returnObject));
      redis.set('users',JSON.stringify(returnObject)),
      res.status(200).json(returnObject);
     });
    }
  });
});




  router.get("/friends/:id", (req, res, next) => {

      // Blog.aggregate(
      //   [
      //     {"$match": { 'comments.user_id': req.params.id }  },
      //     {"$group" : {
      //       "_id": {
      //         "comments": {
      //             "user_id": "$comments.user_id",
      //             "user_name": "$comments.user_name"
      //         }
      //      }
      //   }
      // }
      //   ]
      // ).then(
      //   documents => {
      //     res.status(200).json({
      //       message: "Users fetched successfully!",
      //       blogs: documents
      //     });
      //    }
      //  )
      var key = 'friends'+req.params.id;
      var objectId = mongoose.Types.ObjectId(req.params.id);
      redis.get(key, function (err, response) {
        if (err) {
          console.log('Error');
        }
        else if (response) //Friends exists in cache
        {
          //console.log(JSON.parse(response));
          res.status(200).send(
            JSON.parse(response)
          )
        }
        else {
      var query = Blog.find({'comments.user_id': objectId});
        Blog.distinct('comments.user_id',query).then(
         documents => {
           User.find({_id: {$in: documents,$nin:[objectId]}}).then(users => {
            var returnObject = {
              message: "Users fetched successfully!",
              friends: users
            }
            redis.set(key,JSON.stringify(returnObject)),
            res.status(200).json(returnObject);
           })  
          }
        )

      }
  });
});

  router.get("/blogs", (req, res, next) => {
    Blog.find().then(documents => {
      res.status(200).json({
        message: "Users fetched successfully!",
        blogs: documents
      });
     });
  });

  module.exports = router;