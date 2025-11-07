import React from "react";
import person_icon from "../assets/icon/person_icon.svg";
import { useNavigate } from "react-router-dom";

interface Prop {
  isAuth: boolean;
}

const Header = ({ isAuth }: Prop) => {
  const navigate = useNavigate();
  return (
    <div className="w-screen pl-10 pr-14 py-[19px] border-b border-b-mono-4 flex flex-row justify-between items-center">
      <h1 className="text-main-1 text-4xl" onClick={() => navigate("/")}>
        우리끼리
      </h1>
      {isAuth && (
        <div className="w-[52px] h-[52px] rounded-full bg-main-1 flex justify-center items-center">
          <img src={person_icon} className="w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default Header;
