import { UnityGame } from "../components/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GamePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

  useEffect(() => {
    const savedToken = localStorage.getItem("gameToken");
    const savedRoomCode = localStorage.getItem("gameRoomCode");

    if (!savedToken || !savedRoomCode) {
      console.error("게임 데이터가 없습니다. 대기실로 돌아갑니다.");
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    }

    setToken(savedToken);
    setRoomCode(savedRoomCode);
  }, [navigate]);

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
