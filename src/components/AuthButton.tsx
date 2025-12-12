import React from "react";

interface Prop {
  text: string;
}

const AuthButton = ({ text }: Prop) => {
  return (
    <div className="w-full py-[10px] flex justify-center items-center bg-main-1 rounded text-white text-2xl font-pretendard font-extrabold">
      {text}
    </div>
  );
};

export default AuthButton;
