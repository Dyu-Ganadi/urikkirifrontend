import React from "react";
import add_game from "../assets/icon/add_game.svg";
import { useNavigate } from "react-router-dom";

interface Prop {
  isAuth: boolean;
}

const LoginButton = ({ isAuth }: Prop) => {
  const navigate = useNavigate();

  const handleTopClick = () => {
    if (isAuth) {
      navigate("/");
    } else {
      navigate("/login");
    }
  };
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
      <div className="w-full h-[82px] bg-main-5 flex justify-center items-center cursor-pointer">
        {isAuth ? (
          <div className="text-[30px] flex flex-row gap-2 items-center">
            내가 게임 방 파기
            <img src={add_game} />
          </div>
        ) : (
          <div className="text-2xl" onClick={() => navigate("/signup")}>
            계정이 없다면? <span className="text-main-1">회원가입</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginButton;
