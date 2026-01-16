import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { key_icon } from "../assets/icon/index";
import { useWebSocketContext } from "../context/WebSocketContext";

export const EnterRoom = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { connect, isConnected } = useWebSocketContext();

  const isDisabled = key.trim().length === 0;

  const handleEnterRoom = async () => {
    if (key.trim().length === 6) {
      setIsLoading(true);

      const [connected] = await Promise.all([
        isConnected ? Promise.resolve(true) : connect(),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      setIsLoading(false);

      if (connected) {
        navigate(`/wait-room?roomCode=${key.trim()}`);
      } else {
        alert("연결에 실패했습니다. 다시 시도해주세요.");
      }
    } else {
      alert("6자리 방 코드를 입력해주세요");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleEnterRoom();
    }
  };

  if (isLoading) {
    return (
      <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
        <div className="text-3xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
      <div className="flex flex-col items-center gap-[60px] text-6xl">
        초대 코드 입력
        <div className="flex flex-row gap-6">
          <div className="w-[500px] h-[70px] flex items-center gap-2 bg-white rounded-[10px] border-2 border-main-2 p-[15px]">
            <img src={key_icon} />
            <input
              value={key}
              onChange={(e) => setKey(e.target.value)}
              onKeyPress={handleKeyPress}
              maxLength={6}
              placeholder="6자리 코드"
              className="w-full h-full bg-none border-none outline-none text-2xl"
            />
          </div>
          <button
            onClick={handleEnterRoom}
            disabled={isDisabled}
            className={`w-[146px] h-[70px] text-2xl rounded-[10px] transition
              ${
                isDisabled
                  ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                  : "bg-main-2 text-white hover:brightness-95"
              }`}
          >
            입장하기
          </button>
        </div>
      </div>
    </div>
  );
};
