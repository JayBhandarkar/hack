import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function getSocket(): Socket {
  if (!socket) {
    socket = io(process.env.NEXT_PUBLIC_SOCKET_URL || 'http://localhost:5000', {
      autoConnect: false,
    });
  }
  return socket;
}

export function connectSocket(role: string) {
  const s = getSocket();
  if (!s.connected) s.connect();
  s.emit('join:role', role);
  return s;
}

export function disconnectSocket() {
  socket?.disconnect();
}
