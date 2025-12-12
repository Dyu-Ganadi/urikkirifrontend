import React, { useState } from "react";
import AuthInput from "../components/AuthInput";
import AuthButton from "../components/AuthButton";

const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[url('/public/login-bg.png')] bg-cover bg-center">
      <div className="relative flex flex-col gap-[22px] px-[29px] pt-[138px] pb-[65px] bg-white rounded-[20px]">
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 z-10 w-[124px] h-[124px] rounded-full bg-white bg-[url('/src/assets/images/monkey-login.png')] bg-cover bg-center shadow-lg"></div>
        <AuthInput
          label="이메일"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          label="별명"
          type="text"
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          onNicknameCheck={() => alert("중복확인 API 연결 예정!")}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthInput
          label="비밀번호 확인"
          type="password"
          value={passwordCheck}
          onChange={(e) => setPasswordCheck(e.target.value)}
        />
        <AuthButton text="회원가입" />
      </div>
    </div>
  );
};

export default SignupPage;
