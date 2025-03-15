const express = require("express")
require('dotenv').config()
const PORT = process.env.PORT
const http = require('http');

const app = express();
const server = http.createServer(app); // HTTP server created manually

const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });
const {WebSocketRoutes} = require('./WebSockets/MainWebSocket')

wss.on('connection', (ws, request) => {
    WebSocketRoutes(ws,request)
});

const UserRoute = require("./routes/UserRoutes")

app.use(express.json());

app.use("/api/user", UserRoute);

app.get('/', (req, res) => res.send('WebSocket Server Running'));

server.listen(PORT, () => console.log('Server started on http://localhost:' + PORT));

