const express = require('express');
const router = express.Router();
const admin = require('firebase-admin');
const fcmServiceAccount = require('C:/Users/DELL/WebstormProjects/td_voice_recording_rest_node_app/fcm/fcm-service-account.json');

admin.initializeApp({
    credential: admin.credential.cert(fcmServiceAccount)
});

router.get('/', (req, res, next) => {
    res.status(200).json({message: "GET METHOD"});
});

router.post('/', (req, res, next) => {
    const notification = {
        title: req.body.title,
        description: req.body.description,
        tdBookingId: req.body.tdBookingId,
        tdStatus: req.body.tdStatus
    };
    var token = req.body.token;
    var payload = {
        "data": {
            "title": req.body.title,
            "body": req.body.description,
            "tdBookingId": req.body.tdBookingId,
            "tdStatus": req.body.tdStatus
        }
    };

    var option = {
        "priority": "high",
        "timeToLive": 60 * 60 * 24
    };

    admin.messaging().sendToDevice(token, payload, option)
        .then(result => {
            console.log("Successfully send notification");
            res.status(200).json({
                message: "Successfully send notification",
                notification: notification,
                result: result
            });
        })
        .catch(err => {
            console.log("Error to send notification");
            res.status(500).json({
                message: "Error to send notification",
                error: err
            });
        });


});


module.exports = router;