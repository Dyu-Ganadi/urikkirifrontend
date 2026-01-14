import { useState } from "react";
import { AuthInput, AuthButton } from "../components/index";
import { userApi } from "../api/user";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    if (!password) {
      alert("비밀번호를 입력하세요.");
      return;
    }

    try {
      const { data } = await userApi.login({
        email: email,
        password: password,
      });
      localStorage.setItem("accessToken", data.accessToken);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[url('/public/login-bg.png')] bg-cover bg-center">
      <div className="relative flex flex-col gap-[30px] px-[29px] pt-[138px] pb-[65px] bg-white rounded-[20px]">
        <div className="absolute top-[-40px] left-1/2 -translate-x-1/2 z-10 w-[124px] h-[124px] rounded-full bg-white bg-[url('/src/assets/images/monkey-login.png')] bg-cover bg-center shadow-lg"></div>
        <AuthInput
          label="이메일"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <AuthInput
          label="비밀번호"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <AuthButton onClick={handleLogin} text="로그인" />
      </div>
    </div>
  );
};
