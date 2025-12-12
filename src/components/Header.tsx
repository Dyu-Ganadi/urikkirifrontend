import React, { useState } from "react";
import person_icon from "../assets/icon/person-icon-white.svg";
import exit from "../assets/icon/exit.svg";
import { useNavigate } from "react-router-dom";

interface Prop {
  isAuth: boolean;
}

const Header = ({ isAuth }: Prop) => {
  const [clickProfile, setClickProfile] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="w-screen pl-10 pr-14 py-[19px] bg-white border-b border-b-mono-4 flex flex-row justify-between items-center">
      <h1 className="text-main-1 text-4xl" onClick={() => navigate("/")}>
        우리끼리
      </h1>
      {isAuth && (
        <>
          <div
            className="w-[52px] h-[52px] relative rounded-full bg-main-1 flex justify-center items-center "
            onClick={() => setClickProfile(!clickProfile)}
          >
            <img src={person_icon} className="w-10 h-10" />
          </div>
          {clickProfile && (
            <div className="absolute right-24 top-16 w-[260px] rounded-[20px] border border-mono-3 overflow-hidden bg-white flex flex-col">
              <div className="flex justify-center py-5 text-[25px] border-b border-mono-3">
                마이페이지
              </div>
              <div className="flex justify-center py-5 text-[25px] border-b border-mono-3">
                랭킹페이지
              </div>
              <div className="flex flex-row gap-2 justify-center py-5 text-[25px] text-system-error">
                로그아웃
                <img src={exit} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Header;
