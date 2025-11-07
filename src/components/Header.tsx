import React from "react";
import person_icon from "../assets/person_icon.svg";

interface Prop {
  isAuth: boolean;
}

const Header = ({ isAuth }: Prop) => {
  return (
    <div className="w-screen pl-10 pr-14 py-[19px] border-b-mono-3 flex flex-row justify-between items-center">
      <h1 className="text-main-1 text-4xl">우리끼리</h1>
      {isAuth && (
        <div className="w-[52px] h-[52px] rounded-full bg-main-1 flex justify-center items-center">
          <img src={person_icon} className="w-10 h-10" />
        </div>
      )}
    </div>
  );
};

export default Header;
