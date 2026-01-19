import { useState } from "react";
import { AuthInput, AuthButton } from "../components/index";
import { userApi } from "../api/user";
import { useNavigate } from "react-router-dom";

export const SignupPage = () => {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passwordCheck, setPasswordCheck] = useState("");
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (!email) {
      alert("이메일을 입력하세요.");
      return;
    }
    if (!nickname) {
      alert("닉네임을 입력하세요.");
      return;
    }
    if (!password || !passwordCheck) {
      alert("비밀번호와 비밀번호 확인을 모두 입력하세요.");
      return;
    }
    if (password != passwordCheck) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      const { data } = await userApi.signup({
        email,
        nickname,
        password,
      });
      localStorage.setItem("access_token", data.access_token);
      navigate("/");
    } catch (error: any) {
      if (error.response?.status === 400) {
        const emailError = error.response?.data?.email;
        if (emailError) {
          alert(emailError);
        } else {
          alert("입력 정보를 확인해주세요.");
        }
      } else if (error.response?.status === 409) {
        alert("이미 사용 중인 닉네임입니다.");
      } else {
        alert("회원가입에 실패했습니다.");
      }
    }
  };

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
        <AuthButton onClick={handleSignup} text="회원가입" />
      </div>
    </div>
  );
};
