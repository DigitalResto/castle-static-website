import { io } from 'socket.io-client';
import dotenv from 'dotenv'
let socket;
dotenv.config();

export const initSocket = () => {
  if (!socket) {
    console.log(process.env.NEXT_PUBLIC_ENVIRONMENT);
    const baseUrl = process.env.NEXT_PUBLIC_ENVIRONMENT == "dev" 
    ? "http://localhost:3000" 
    : "https://resto-nahdi.vercel.app";
    console.log("Base url ==>",baseUrl);
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