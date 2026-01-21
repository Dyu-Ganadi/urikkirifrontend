import { useState } from "react";
import { AuthInput, AuthButton } from "../components/index";
import { userApi } from "../api/user";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

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
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 401) {
        alert("이메일 또는 비밀번호가 올바르지 않습니다.");
      } else if (error.response?.status === 404) {
        alert("존재하지 않는 계정입니다.");
      } else {
        alert("로그인에 실패했습니다. 다시 시도해주세요.");
      }
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
