const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {type: String, required: true},
    mobile: {type: Number, required: true, unique: true},
    fcmToken: {type: String, required: true},
    androidVersion: {type: String, required: true},
    deviceModel: {type: String, required: true},
    appVersionCode: {type: Number, required: true},
    createdDate: {type: Date, default: Date},
    updatedDate: {type: Date, default: Date}
});

module.exports = mongoose.model('TblUser', userSchema);

