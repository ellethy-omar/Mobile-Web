const express = require('express');
const router = express.Router();
const {
    UserAPISuccess,
    UserAPIFailure,
    UserGetItems,
    UserLogin,
    UserSignUp
} = require('../Controllers/UserController');

const { requireAuth } = require("../middleware/requireAuth");

// Public routes (no authentication required)
router.post('/signup', UserSignUp);
router.post('/login', UserLogin);

// Protected routes (require valid JWT token)
router.use(requireAuth);

router.get('/items', UserGetItems);
router.get('/success', UserAPISuccess);

module.exports = router;
