console.log("Controller Loaded")

// just remember when there is a model sometimes you'll need to use asyn.

const UserModel = require("../Models/UserModel")

const UserAPISuccess = (req, res) => {
    res.status(200).json({success : "Retrived sucessfully"});
}

const UserAPIFailure = (req, res) => {
    res.status(200).json({failure : "Task Failed Successfully!"});
}




const db = require('./db');

const UserLogin = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
             return res.status(400).json({ error: 'Username and password are required' });
 }
  const query = 'SELECT * FROM Users2 WHERE User_name =? AND Password = ?';
  db.query(query, [username, password], (err, results) => {
    if (err) {
         console.error('Error querying database: ', err.message);
            return res.status(500).json({ error: 'Database error' });
    }

    if (results.length === 0) {
            return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', userId: Users2.User_ID }); //results
 }
 
  );

}

const UserRegister = (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
         return res.status(400).json({ error: 'Username and password are required' });
    }


    const checkQuery = 'SELECT * FROM Users2 WHERE User_name=? ';
     db.query(checkQuery, [username], (err, results) => {
        if (err) {
        console.error('Error checking existing user: ', err.message);
            return res.status(500).json({ error: 'Database error' });
        }
        if (results.length > 0) {
             return res.status(400).json({ error: 'Username already exists' });
        }
   }
   );
 
   const insertQuery = 'INSERT INTO Users2 (User_name, Password) VALUES (?,?)';
      db.query(insertQuery, [username,password], (err, result) => {
        if (err) {
          console.error('Error inserting user: ', err.message);
          return res.status(500).json({ error: 'Database error' });
        }

        res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
      });
}

const RetrieveAll = (req, res) => {
    const query = 'SELECT * FROM Items';
  
    db.query(query, (err, rows) => {
      if (err) {
        console.error('Error fetching items: ' + err.message);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(rows);
    });
  }
  const RetrieveByID = (req, res) => {
    const itemId = req.params.id;
    const query = 'SELECT * FROM Items WHERE Item_ID=?';
  
    db.query(query,[itemId], (err, rows) => {
      if (err) {
        console.error('Error fetching items: ' + err.message);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(200).json(rows);
    });
  }

module.exports = {
    UserAPISuccess,
    UserAPIFailure,
    UserLogin,
    UserRegister,
    RetrieveAll,
    RetrieveByID
};