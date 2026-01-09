import email_icon from "../assets/icon/email-icon.svg";
import { LevelChart } from "../components/index";

export const MyPage = () => {
  return (
    <div className="w-screen min-h-screen flex flex-col">
      <div className="w-full h-[370px] bg-main-4 pt-[122px] flex justify-center">
        <div className="flex flex-col gap-6 items-center">
          <div className="w-[124px] h-[124px] rounded-full border-2 border-mono-3 bg-white bg-[url('/src/assets/images/monkey-login.png')] bg-cover bg-center" />
          <div className="flex flex-col items-center gap-[10px] text-black text-2xl">
            <h1>{"우끼끼"}</h1>
            <div className="flex flex-row gap-1 items-center text-xl text-mono-3">
              <img src={email_icon} />
              <p>uggiggi@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full h-full pt-[60px] flex justify-center items-center">
        <div className=" py-[42px] px-[70px] border flex flex-col items-center gap-6 border-main-2 rounded-[20px]">
          <h1 className="text-4xl text-main-1">Level {5}</h1>
          <LevelChart />
        </div>
      </div>
    </div>
  );
};
