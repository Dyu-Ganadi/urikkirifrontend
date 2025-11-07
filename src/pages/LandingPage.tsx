import monkey1 from "../assets/images/monkey1.png";
import LoginButton from "../components/LoginButton";

const LandingPage = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-row">
      <div className="w-1/2 flex flex-col justify-center items-center gap-10">
        <div className="text-6xl flex flex-col items-center gap-[10px]">
          <span>“우리끼리, 우리말로"</span>
          <span>
            우리말 게임 <span className="text-main-1">우리끼리</span>
          </span>
        </div>

        <img src={monkey1} />
      </div>

      <div className="w-1/2 flex flex-col justify-center items-center">
        <LoginButton isAuth={false} />
      </div>
    </div>
  );
};

export default LandingPage;
