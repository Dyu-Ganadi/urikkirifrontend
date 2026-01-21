import { UnityGame } from "../components/index";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

export const GamePage = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string>("");
  const [roomCode, setRoomCode] = useState<string>("");

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
