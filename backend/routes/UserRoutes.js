const express = require('express');
const router = express.Router();
const UserAPI = require("../Controllers/UserController")

router.get("/", (req, res)=> {
    res.json(result = {
        statusbar: true
    })
})

router.get("/success", UserAPI.UserAPISuccess);
router.get("/failure", UserAPI.UserAPIFailure);

module.exports = router;