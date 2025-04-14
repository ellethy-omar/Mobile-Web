const User = require("../Models/User")
const bcrypt = require('bcrypt');
const validator = require('validator');
const { generateToken } = require('../middleware/requireAuth'); // Import your JWT generator

// Register a new user
const register = async (req, res) => {
    const { username, email, password } = req.body;
  
    // Validate required fields
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'All fields are required' });
    }
  
    // Validate email and password strength (assuming validator is imported)
    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }
  
    try {
      // Check if a user already exists with this username or email using the static method
      const existingUser = await User.userExists(username, email);
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      const savedUser = await User.createUser({ username, email, password });
  
      // Generate JWT for the new user (assuming generateToken is defined and imported)
      const token = generateToken(savedUser._id);
  
      res.status(201).json({
        message: 'User registered successfully',
        user: savedUser,
        token
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ error: 'Server error during registration' });
    }
};
  

// Login an existing user
const login = async (req, res) => {
    const { usernameOrEmail, password } = req.body;
    
    // Ensure both username/email and password are provided
    if (!usernameOrEmail || !password) {
      return res.status(400).json({ error: 'Both username/email and password are required' });
    }
    
    try {
      // Use the new static method to check if the user exists
      const user = await User.findByUsernameOrEmail(usernameOrEmail);
      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
      
      // Use the instance method to check if the password matches
      const isMatch = await user.isPasswordMatch(password);
      if (!isMatch) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }
    
      // Generate JWT for the user
      const token = generateToken(user._id);
    
      res.status(200).json({
        message: 'Login successful',
        user,
        token
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: 'Server error during login' });
    }
};
  

const verifyToken = (req, res) => {
    res.status(200).json({ message: 'Token is valid', user: req.user });
};
  

module.exports = { register, login, verifyToken };


/*
  password is 1234
  {
    "message": "User registered successfully",
    "user": {
        "name": "tes1",
        "email": "testuser@gmail.com",
        "password": "$2b$10$VOEfr8zt1JJ6sgko3o/XsewN7pOjhP58ZSEx4VS1tXzzP9vWhq35i",
        "_id": "67fce018c37510bfbbe553c6",
        "createdAt": "2025-04-14T10:14:48.847Z",
        "__v": 0
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJRCI6IjY3ZmNlMDE4YzM3NTEwYmZiYmU1NTNjNiIsImlhdCI6MTc0NDYyNTY4OSwiZXhwIjoxNzQ0NjI2Mjg5fQ.6LdPzk0XAGGGyY-voFu4IwUxo5p57xPdehyz3UTHxHU"
  }
*/