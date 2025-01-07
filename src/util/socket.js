'use client';
import { io } from 'socket.io-client';
let socket;

export const initSocket = () => {
  if (!socket) {
    const baseUrl = process.env.ENVIRONMENT === "dev" 
    ? "http://localhost:3000" 
    : "https://resto-nahdi.vercel.app/";
    socket = io(baseUrl, {
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
  }
  return socket;
};

export const getSocket = () => {
  if (!socket) {
    return initSocket();
  }
  return socket;
};