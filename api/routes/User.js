const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserModel = require('../models/UserModel')

//region fetch user list
router.get('/', (req, res, next) => {
    UserModel.find()
        .exec()
        .then(doc => {
            console.log(doc);
            res.status(500).json({
                status: 200,
                message: "Fetched user list.",
                count: doc.length, users: doc
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error to fetch user list.", error: err});
        });

});
//endregion

//region add user
router.post('/add', (req, res, next) => {
    const userModel = new UserModel({
        _id: new mongoose.Types.ObjectId(),
        username: req.body.username,
        mobile: req.body.mobile,
        fcmToken: req.body.fcmToken,
        androidVersion: req.body.androidVersion,
        deviceModel: req.body.deviceModel,
        appVersionCode: req.body.appVersionCode
    });
    userModel.save()
        .then(result => {
            console.log(result);
            res.status(200).json({
                status: 200,
                message: "User added successfully.",
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error to save user.", error: err});
        });

});
//endregion

//region update user
router.post('/update', (req, res, next) => {
    const mobile = req.body.mobile;
    const updateOps = {
        fcmToken: req.body.fcmToken,
        androidVersion: req.body.androidVersion,
        deviceModel: req.body.deviceModel,
        appVersionCode: req.body.appVersionCode,
        updatedDate: Date()
    };

    UserModel.updateOne({mobile: mobile}, {$set: updateOps})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                status: 200,
                message: "User updated successfully.",
                user: result
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                message: "Error in user updation.",
                error: err
            });
        });
});
//endregion


router.post('/delete', (req, res, next) => {
    const mobile = req.body.mobile;
    UserModel.remove({mobile: mobile})
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({status: 200, message: "User deleted successfully.", result: result});
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({message: "Error to delete user.", error: err});
        });

});

module.exports = router;