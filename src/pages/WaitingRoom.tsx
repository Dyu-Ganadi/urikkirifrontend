import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { WaitingSection } from "../components/index";
import { exit_white, copy_icon } from "../assets/icon/index";
import { useWebSocket } from "../hooks/useWebSocket";
import type { Participant } from "../api/websocket.types";

export const WaitingRoom = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [roomCode, setRoomCode] = useState<string | null>(null);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const { isConnected, lastMessage, sendMessage } = useWebSocket();

  useEffect(() => {
    console.log('========== WaitingRoom useEffect ==========');
    console.log('isConnected:', isConnected);
    console.log('roomCode:', roomCode);
    
    if (!isConnected) {
      console.log('연결 안됨, return');
      return;
    }

    if (roomCode) {
      console.log('이미 방 코드 있음, return');
      return;
    }

    const savedRoomCode = localStorage.getItem('currentRoomCode');
    if (savedRoomCode) {
      console.log('저장된 방 코드로 재입장:', savedRoomCode);
      sendMessage({ type: "JOIN_ROOM", roomCode: savedRoomCode });
      return;
    }

    const action = searchParams.get("action");
    const code = searchParams.get("roomCode");
    console.log('action:', action);
    console.log('code:', code);

    if (action === "create") {
      console.log('create_room 메시지 전송 시도');
      sendMessage({ type: "CREATE_ROOM" });
    } else if (code) {
      console.log('join_room 메시지 전송 시도');
      sendMessage({ type: "JOIN_ROOM", roomCode: code });
    }
  }, [isConnected, searchParams, roomCode]);

  useEffect(() => {
    if (!lastMessage) return;

    console.log('받은 메시지 처리:', lastMessage);

    switch (lastMessage.type) {
      case "ROOM_CREATED":
        console.log('방 생성 성공:', lastMessage.roomCode);
        setRoomCode(lastMessage.roomCode);
        localStorage.setItem('currentRoomCode', lastMessage.roomCode);
        break;

      case "ROOM_JOINED":
        console.log('방 참가 성공, 전체 참가자:', lastMessage.data);
        setRoomCode(lastMessage.roomCode);
        setParticipants(lastMessage.data || []);
        localStorage.setItem('currentRoomCode', lastMessage.roomCode);
        break;

      case "USER_JOINED":
        console.log('새 참가자:', lastMessage.data);
        setParticipants(prev => [...prev, lastMessage.data]);
        break;

      case "GAME_START":
        console.log('게임 시작! 참가자:', lastMessage.data?.participants);
        localStorage.removeItem('currentRoomCode');
        navigate("/game");
        break;

      case "ERROR":
        console.error('에러:', lastMessage.message);
        
        if (lastMessage.message === "User is Already in This Room") {
          console.log('이미 방에 있음, 그대로 유지');
          const savedRoomCode = localStorage.getItem('currentRoomCode');
          if (savedRoomCode) {
            setRoomCode(savedRoomCode);
          }
          return;
        }
        
        alert(lastMessage.message);
        localStorage.removeItem('currentRoomCode');
        navigate("/");
        break;
    }
  }, [lastMessage, navigate]);

  const handleCopyCode = () => {
    if (roomCode) {
      navigator.clipboard.writeText(roomCode);
      alert("코드가 복사되었습니다!");
    }
  };

  const handleExit = () => {
    localStorage.removeItem('currentRoomCode');
    navigate("/");
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
      <div className="flex flex-col gap-[100px] items-center">
        <div className="w-[500px] h-[80px] flex justify-center items-center gap-5 rounded-[20px] border-4 border-main-2 bg-white text-3xl">
          초대코드: {roomCode || "생성 중..."}
          <img src={copy_icon} onClick={handleCopyCode} className="cursor-pointer" />
        </div>

        <WaitingSection participants={participants} />

        <button
          onClick={handleExit}
          className="w-[280px] h-[80px] flex justify-center items-center bg-system-error text-3xl text-white gap-[10px] rounded-[20px]"
        >
          탈출하기
          <img src={exit_white} />
        </button>
      </div>
    </div>
  );
};
