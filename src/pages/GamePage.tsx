import { UnityGame } from "../components/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {useWebSocketContext} from "../context/WebSocketContext.tsx";

export const GamePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");
  const { lastMessage, disconnect } = useWebSocketContext();

  useEffect(() => {
    const savedToken = localStorage.getItem("access_token");
    const savedRoomCode = localStorage.getItem("gameRoomCode");

    if (!savedToken || !savedRoomCode) {
      Swal.fire({ icon: "error", title: "잘못된 접근입니다." });
      navigate("/");
      return;
    }

    setToken(savedToken);
    setRoomCode(savedRoomCode);
  }, [navigate]);

  useEffect(() => {
    if (!lastMessage) return;

    console.log("받은 메시지 처리:", lastMessage);

    switch (lastMessage.type) {
      case "ROOM_EXIT":
        console.log("ROOM_EXIT 메시지:", lastMessage);

        if (lastMessage.message?.includes("Successfully")) {
          console.log("방 나가기 성공");
          localStorage.removeItem("gameRoomCode");
          disconnect();
          navigate("/", { replace: true });
        } else if (lastMessage.data) {
          console.log("다른 참가자 퇴장:", lastMessage.data.nickname);
        }
        break;

      case "ERROR":
        console.error("에러:", lastMessage.message);

        Swal.fire({ icon: "error", title: "오류", text: lastMessage.message });
        localStorage.removeItem("gameRoomCode");
        disconnect();
        navigate("/");
        break;
    }
  }, [lastMessage, navigate]);

  if (!token || !roomCode) {
    return (
      <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#5E5E5E]">
        <div className="text-3xl text-white">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-hidden flex flex-row bg-[#5E5E5E]">
      <div className="w-[1156px] h-[680px] bg-white m-auto">
        <UnityGame token={token} roomCode={roomCode} />
      </div>
    </div>
  );
};
