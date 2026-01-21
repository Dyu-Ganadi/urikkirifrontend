import { useState } from "react";
import { add_game } from "../assets/icon/index";
import { useNavigate } from "react-router-dom";
import { useWebSocketContext } from "../context/WebSocketContext";
import Swal from "sweetalert2";

interface Prop {
  isAuth: boolean;
}

export const LoginButton = ({ isAuth }: Prop) => {
  const navigate = useNavigate();
  const { connect, isConnected } = useWebSocketContext();
  const [isLoading, setIsLoading] = useState(false);

  const handleTopClick = () => {
    if (isAuth) {
      navigate("/enter-room");
    } else {
      navigate("/login");
    }
  };

  const handleBottomClick = async () => {
    if (isAuth) {
      setIsLoading(true);

      const [connected] = await Promise.all([
        isConnected ? Promise.resolve(true) : connect(),
        new Promise((resolve) => setTimeout(resolve, 1000)),
      ]);

      setIsLoading(false);

      if (connected) {
        navigate("/wait-room?action=create");
      } else {
        Swal.fire({ icon: "error", title: "연결 실패", text: "다시 시도해주세요." });
      }
    } else {
      navigate("/signup");
    }
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex justify-center items-center bg-[#FFFBEF]">
        <div className="text-3xl">로딩 중...</div>
      </div>
    );
  }

  return (
    <div className="w-[450px] flex flex-col rounded-[20px] border-2 border-mono-4 overflow-hidden shadow-xl">
      <div className="w-full h-[218px] flex flex-col items-center justify-center">
        <div
          onClick={handleTopClick}
          className="text-[64px] text-main-1 cursor-pointer"
        >
          {isAuth ? "게임 참여" : "로그인"}
        </div>
        {isAuth && <p className="text-2xl">초대 코드로 참여하세요!</p>}
      </div>
      <div
        onClick={handleBottomClick}
        className="w-full h-[82px] bg-main-5 flex justify-center items-center cursor-pointer"
      >
        {isAuth ? (
          <div className="text-[30px] flex flex-row gap-2 items-center">
            내가 게임 방 파기
            <img src={add_game} />
          </div>
        ) : (
          <div className="text-2xl">
            계정이 없다면? <span className="text-main-1">회원가입</span>
          </div>
        )}
      </div>
    </div>
  );
};
