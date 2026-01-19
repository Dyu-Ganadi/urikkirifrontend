import { useEffect, useRef, useState, useCallback } from "react";
import type { WSMessage } from "../api/websocket.types";

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<WSMessage | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log("이미 연결됨, 재생성 안 함");
      return;
    }

    const WS_URL = import.meta.env.VITE_WS_URL || "ws://13.124.19.84:8080/ws";
    const token = localStorage.getItem("access_token");

    if (!token) {
      console.error("토큰이 없습니다");
      return;
    }

    console.log("WebSocket 생성 시작");
    const ws = new WebSocket(`${WS_URL}?token=${token}`);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("========== WebSocket 연결 성공 ==========");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const message = JSON.parse(event.data) as WSMessage;
      console.log("받은 메시지:", message);
      setLastMessage(message);
    };

    ws.onerror = (error) => {
      console.error("WebSocket 에러:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket 연결 종료");
      setIsConnected(false);
    };

    return () => {
      console.log("cleanup 실행");
    };
  }, []);

  const sendMessage = useCallback((message: any) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      console.log("메시지 전송:", message);
      wsRef.current.send(JSON.stringify(message));
    } else {
      console.error("WebSocket이 열려있지 않습니다");
    }
  }, []);

  return { isConnected, lastMessage, sendMessage };
};
