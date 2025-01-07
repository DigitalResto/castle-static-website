const { createServer } = require('http');
const { Server } = require('socket.io');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = createServer(handle);
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Client connected' , socket.id);

    socket.on('new_waitlist_entry', (data) => {
        console.log("Broadcast the new entry to all connected clients except sender")
      // Broadcast the new entry to all connected clients except sender
      socket.broadcast.emit('new_waitlist_entry', data);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  server.listen(3000, (err) => {
    if (err) throw err;
    console.log('> Socket.IO server ready on http://localhost:3000');
  });
});