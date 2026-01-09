import { useNavigate } from "react-router-dom";
import { WaitingSection } from "../components/index";
import { exit_white, copy_icon } from "../assets/icon/index";

export const WaitingRoom = () => {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center items-center bg-[#FFFBEF]">
      <div className="flex flex-col gap-[100px] items-center">
        <div className="w-[500px] h-[80px] flex justify-center items-center gap-5 rounded-[20px] border-4 border-main-2 bg-white text-3xl">
          초대코드: {"224 748"}
          <img src={copy_icon} />
        </div>

        <WaitingSection />

        <button
          onClick={() => navigate("/")}
          className="w-[280px] h-[80px] flex justify-center items-center bg-system-error text-3xl text-white gap-[10px] rounded-[20px]"
        >
          탈출하기
          <img src={exit_white} />
        </button>
      </div>
    </div>
  );
};
