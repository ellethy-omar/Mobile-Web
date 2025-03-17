const sql = require('mssql');
const bcrypt = require("bcrypt")
const validator = require("validator")
require('dotenv').config()

const config = {
    user: process.env.DATABASE_CONFIG_USERNAME,
    password: process.env.DATABASE_CONFIG_PASSWORD,
    server: process.env.DATABASE_CONFIG_SERVER,
    database: process.env.DATABASE_CONFIG_DATABASE,
    options: {
        trustServerCertificate: true,
    },
};

async function Connection() {
    try {
        await sql.connect(config);
        console.log('Connected to SQL Server! UserModel.js');
    } catch (error) {
        console.error('Database connection error:', error.message);
    }
}

async function getUser(username, password) {
    try {
        await sql.connect(config);
        const result = await sql.query(`SELECT * FROM Users2 WHERE Username = '${username}'`);
        
        if (result.recordset.length === 0) {
            return null; // User not found
        }

        const user = result.recordset[0];
        const passwordMatch = await bcrypt.compare(password, user.Password);

        return passwordMatch ? user : null;
    } catch (error) {
        console.error('Error fetching user:', error.message);
        return null;
    }
}

async function createUser(username, password) {
    try {
        if (!validator.isAlphanumeric(username)) {
            throw new Error("Invalid username format.");
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        await sql.connect(config);
        const result = await sql.query(`INSERT INTO Users2 (Username, Password) VALUES ('${username}', '${hashedPassword}')`);

        return result.rowsAffected[0];
    } catch (error) {
        console.error('Error creating user:', error.message);
        return 0;
    }
}

async function GetAllItems() {
    try {
        await sql.connect(config)
        const result = await sql.query(`SELECT * FROM Items`);
        return result.rowsAffected;
    } catch (error) {
        console.log('Error: ', error);
        throw error;
    }
}


Connection();

module.exports = {
    getUser,
    createUser,
    GetAllItems
};
