const express = require("express")
require('dotenv').config()
const AuthRouter = require("./routes/AuthRoutes")
const PORT = process.env.PORT
const app = express();

require("./conig/db").intializeMongooseConnection();
app.use(express.json());

app.use("/api/auth" , AuthRouter);

app.listen(PORT , () => {
    console.log("listening on port " + PORT);
});

// mongodb+srv://goosemugger:0dPDsekdQhGji6nT@quickbite.rtf2kxr.mongodb.net/