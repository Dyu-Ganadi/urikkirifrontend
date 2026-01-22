import { createContext, useContext, useRef, useState, useCallback, type ReactNode } from "react";
import type { WSMessage } from "../api/websocket.types";

interface WebSocketContextType {
  isConnected: boolean;
  isConnecting: boolean;
  lastMessage: WSMessage | null;
  connect: () => Promise<boolean>;
  sendMessage: (message: any) => void;
  disconnect: () => void;
}

const WebSocketContext = createContext<WebSocketContextType | null>(null);

export const WebSocketProvider = ({ children }: { children: ReactNode }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const connect = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      if (wsRef.current?.readyState === WebSocket.OPEN) {
        console.log("이미 연결됨");
        resolve(true);
        return;
      }

      const WS_URL = import.meta.env.VITE_WS_URL || "ws://13.124.19.84:8080/ws";
      const token = localStorage.getItem("access_token");

      if (!token) {
        console.error("토큰이 없습니다");
        resolve(false);
        return;
      }

      setIsConnecting(true);
      console.log("WebSocket 연결 시작");
      const ws = new WebSocket(`${WS_URL}?token=${token}`);
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("========== WebSocket 연결 성공 ==========");
        setIsConnected(true);
        setIsConnecting(false);
        resolve(true);
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data) as WSMessage;
        console.log("받은 메시지:", message);
        setLastMessage(message);
        if (wsRef.current?.readyState === WebSocket.OPEN && message?.type === "KEEPALIVE") {
          console.log("keep alive");
          wsRef.current.send(JSON.stringify({ type: "KEEPALIVE" }));
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket 에러:", error);
        setIsConnecting(false);
        resolve(false);
      };

      ws.onclose = () => {
        console.log("WebSocket 연결 종료");
        setIsConnected(false);
        setIsConnecting(false);
        setLastMessage(null);
      };
    });
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log("메시지 전송:", message);
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket이 열려있지 않습니다");
    }
  }, []);

  const disconnect = useCallback(() => {
    if (wsRef.current) {
      wsRef.current.close();
      wsRef.current = null;
    }
  }, []);

  return (
    <WebSocketContext.Provider
      value={{
        isConnected,
        isConnecting,
        lastMessage,
        connect,
        sendMessage,
        disconnect,
      }}
    >
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocketContext = () => {
  const context = useContext(WebSocketContext);
  if (!context) {
    throw new Error("useWebSocketContext must be used within a WebSocketProvider");
  }
  return context;
};
