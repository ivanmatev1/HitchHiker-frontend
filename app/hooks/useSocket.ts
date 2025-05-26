// hooks/useSocket.ts
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';
import * as SecureStore from 'expo-secure-store';

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;

export function useSocket(onReceiveMessage: (msg: any) => void) {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    const initSocket = async () => {
      const token = await SecureStore.getItemAsync("JWT_TOKEN");
      socketRef.current = io(SOCKET_URL, {
        auth: { token },
      });

      socketRef.current.on('receive_message', onReceiveMessage);
      socketRef.current.on('error', (err: any) => console.error("Socket error", err));
    };

    initSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.off('receive_message');
        socketRef.current.disconnect();
      }
    };
  }, [onReceiveMessage]);

  return socketRef;
}
