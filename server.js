require('dotenv').config({ path: '.env.local' });
const express    = require('express');
const http       = require('http');
const { Server } = require('socket.io');
const cors       = require('cors');
const connectDB  = require('./config/db');

const app    = express();
const server = http.createServer(app);
const io     = new Server(server, {
  cors: { origin: process.env.CLIENT_URL, credentials: true },
});

connectDB();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());

// Make io accessible in routes
app.set('io', io);

// Socket.io — join role rooms on connect
io.on('connection', (socket) => {
  socket.on('join:role', (role) => {
    socket.join(role);
    console.log(`Socket joined room: ${role}`);
  });
  socket.on('disconnect', () => {});
});

app.use('/api/auth',    require('./routes/auth'));
app.use('/api/parks',   require('./routes/parks'));
app.use('/api/sos',     require('./routes/sos'));
app.use('/api/weather', require('./routes/weather'));

app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
