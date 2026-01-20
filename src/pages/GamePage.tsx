import { UnityGame } from "../components/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const GamePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

  useEffect(() => {
    console.log("========== GamePage useEffect ==========");
    const savedToken = localStorage.getItem("gameToken");
    const savedRoomCode = localStorage.getItem("gameRoomCode");
    
    console.log("저장된 데이터 확인:");
    console.log("- gameToken:", savedToken ? savedToken.substring(0, 20) + "..." : "null");
    console.log("- gameRoomCode:", savedRoomCode);

    if (!savedToken || !savedRoomCode) {
      console.error("게임 데이터가 없습니다. 대기실로 돌아갑니다.");
      alert("잘못된 접근입니다.");
      navigate("/");
      return;
    }

    console.log("데이터 설정 완료");
    setToken(savedToken);
    setRoomCode(savedRoomCode);
  }, [navigate]);

  if (!token || !roomCode) {
    console.log("토큰 또는 방코드 대기 중...", { token: !!token, roomCode: !!roomCode });
    return (
      <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#5E5E5E]">
        <div className="text-3xl text-white">로딩 중...</div>
      </div>
    );
  }

  console.log("Unity 렌더링", { token: token.substring(0, 20) + "...", roomCode });

  return (
    <div className="flex-1 overflow-hidden flex flex-row bg-[#5E5E5E]">
      <div className="w-[1156px] h-[680px] bg-white m-auto">
        <UnityGame token={token} roomCode={roomCode} />
      </div>
    </div>
  );
};
