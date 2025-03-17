const jwt = require("jsonwebtoken");
require('dotenv').config();

const requireAuth = async (req, res, next) => {
    const { authorization } = req.headers;
    console.log(authorization);

    if (!authorization) {
        return res.status(401).json({ error: "Authorization token required" });
    }

    const token = authorization.split(' ')[1]; // Extract token after 'Bearer'
    console.log(token)

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach decoded data (e.g., ID) to request
        next();
    } catch (error) {
        console.error('JWT Verification Error:', error.message);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
};

// Generate JWT with OTP
function generateToken(ID) {
    return jwt.sign({ ID }, process.env.JWT_SECRET, { expiresIn: "10m" });
}

module.exports = {
    requireAuth,
    generateToken
};
