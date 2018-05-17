const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const hashColor = require('./hashColor.js')

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  ws.id = uuidv1();
  ws.color = hashColor(ws.id)

  broadcastToAll(wss, {
    type: 'incomingNotification',
    content: `User connected (${wss.clients.size} online)`,
    color: ws.color
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')
    broadcastToAll(wss, {
      type: 'incomingNotification',
      content: `User disconnected (${wss.clients.size} online)`,
      color: ws.color
    })
  });
  
  ws.on('message', (receivedMessage) => {
    const message = JSON.parse(receivedMessage);
    // Change message type from client->server ("post") to server->client ("incoming")
    message.type = message.type.replace('post', 'incoming')
    message.color = ws.color
    broadcastToAll(wss, message)
  })
});

const broadcastToAll = (wss, message) => {
  // Add a UUID to the message
  const newMessage = Object.assign({}, message, {
    id: uuidv1()
  });
  // Send to each of the connection's clients
  wss.clients.forEach(function each(client) {
    client.send(JSON.stringify(newMessage));
  })
}