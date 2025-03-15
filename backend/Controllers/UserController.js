console.log("Controller Loaded")

// just remember when there is a model sometimes you'll need to use asyn.

const UserModel = require("../Models/UserModel")

const UserAPISuccess = (req, res) => {
    res.status(200).json({success : "Retrived sucessfully"});
}

const UserAPIFailure = (req, res) => {
    res.status(200).json({failure : "Task Failed Successfully!"});
}

module.exports = {
    UserAPISuccess,
    UserAPIFailure
};