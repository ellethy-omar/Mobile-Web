const express = require("express")
require('dotenv').config()
const UserRouter = require("./routes/UserRoutes")
const PORT = process.env.PORT
const app = express();

app.use(express.json());

app.use("/api/user" , UserRouter);

app.listen(PORT , () => {
    console.log("listening on port " + PORT);
});