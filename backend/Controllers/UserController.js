const {
    requireAuth,
    generateToken
} = require('../middleware/requireAuth');

const {
    getUser,
    createUser,
    GetAllItems
} = require("../Models/UserModel");

// General success and failure handlers
const UserAPISuccess = (req, res) => {
    res.status(200).json({ success: "Retrieved successfully" });
};

const UserAPIFailure = (req, res) => {
    res.status(500).json({ failure: "Task Failed Successfully!" });
};

// Fetch items for a specific user
const UserGetItems = async (req, res) => {
    try {
        const result = await GetAllItems();

        if (!result || result.length === 0) {
            return res.status(404).json({ error: "No items found for this user." });
        }

        res.status(200).json({ items: result });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(400).json({ error: "Failed to retrieve items." });
    }
};

// User login with improved flow
const UserLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await getUser(username, password);

        if (!user) {
            return res.status(401).json({ error: "Invalid username or password." });
        }

        const token = generateToken(user.User_ID);
        res.status(200).json({ token });
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Login failed. Please try again." });
    }
};

// User signup with better flow
const UserSignUp = async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: "Username and password are required." });
    }

    try {
        const user = await createUser(username, password);

        if (!user) {
            return res.status(400).json({ error: "User creation failed." });
        }

        const token = generateToken(user.User_ID);
        res.status(201).json({ token });
    } catch (error) {
        console.error("Signup error:", error);
        res.status(500).json({ error: "Failed to create user." });
    }
};

module.exports = {
    UserAPISuccess,
    UserAPIFailure,
    UserGetItems,
    UserLogin,
    UserSignUp
};
