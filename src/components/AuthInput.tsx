import React, { useState } from "react";
import person_icon from "../assets/icon/person-icon-black.svg";
import lock_icon from "../assets/icon/lock-icon.svg";
import eye_open from "../assets/icon/eye-open.svg";
import eye_closed from "../assets/icon/eye-closed.svg";

interface Prop {
  label: string;
  type: "text" | "password";
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const AuthInput = ({ label, type, value, onChange }: Prop) => {
  const [isLocked, setIsLocked] = useState(true);

  const togglePassword = () => {
    setIsLocked((prev) => !prev);
  };

  const isPasswordField = type === "password";
  const currentInputType = isPasswordField
    ? isLocked
      ? "password"
      : "text"
    : "text";

  return (
    <div className="w-[414px] flex flex-row gap-3 items-center bg-white rounded-[4px] border border-mono-5 p-3 text-xl font-normal overflow-hidden font-pretendard">
      {!isPasswordField && <img src={person_icon} alt="user" />}
      {isPasswordField && <img src={lock_icon} alt="lock" />}

      <input
        placeholder={label}
        className="w-full h-full border-none outline-none"
        type={currentInputType}
        value={value}
        onChange={onChange}
      />

      {isPasswordField && (
        <img
          src={isLocked ? eye_open : eye_closed}
          alt="toggle visibility"
          onClick={togglePassword}
          className="cursor-pointer select-none"
        />
      )}
    </div>
  );
};

export default AuthInput;
