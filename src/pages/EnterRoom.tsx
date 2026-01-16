import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { key_icon } from "../assets/icon/index";

export const EnterRoom = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");

  const isDisabled = key.trim().length === 0;

  const handleEnterRoom = () => {
    if (key.trim().length === 6) {
      navigate(`/wait-room?roomCode=${key.trim()}`);
    } else {
      alert("6자리 방 코드를 입력해주세요");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isDisabled) {
      handleEnterRoom();
    }
  };

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
