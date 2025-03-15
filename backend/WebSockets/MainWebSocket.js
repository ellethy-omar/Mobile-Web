
const WebSocketRoutes = (ws, request)=>{
    const path = request.url;
    console.log(path);
    switch (path) {
        case '/':
            console.log('Normal client connected');
            ws.send('Welcome to the lobby!');
            break;
        case '/chat':
            console.log('Chat client connected');
            ws.send('Welcome to the chat!');
            break;
        case '/alerts':
            console.log('Alerts client connected');
            ws.send('You are now subscribed to alerts!');
            break;
        default:
            console.log(`Unknown path: ${path}`);
            ws.close(1000, 'Invalid path'); // Close the socket gracefully
            break;
    }

    ws.on('message', (message) => {
        console.log(`Received on ${path}: ${message}`);
        ws.send(`Echo from ${path}: ${message}`);
    });

    ws.on('close', () => console.log(`A summoner has disconnected from ${path} disconnected`));
}

module.exports = {
    WebSocketRoutes
}