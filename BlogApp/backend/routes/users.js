const express = require("express");

const User = require("../models/user");
const Blog = require("../models/blog");

const router = express.Router();

router.get("", (req, res, next) => {
    User.find().then(documents => {
      res.status(200).json({
        message: "Users fetched successfully!",
        users: documents
      });
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

      var query = Blog.find({'comments.user_id': req.params.id});
        Blog.distinct('comments.user_id',query).then(
         documents => {
           console.log(documents);
           User.find({userid: {$in: documents,$nin:[req.params.id]}}).then(users => {
            res.status(200).json({
              message: "Users fetched successfully!",
              friends: users
            });
           })  
          }
        )
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