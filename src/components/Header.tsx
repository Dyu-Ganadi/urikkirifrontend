import { useState } from "react";
import { person_icon_white, exit } from "../assets/icon/index";
import { useNavigate } from "react-router-dom";
import { userApi } from "../api/user";

interface Prop {
  isAuth: boolean;
}

export const Header = ({ isAuth }: Prop) => {
  const [clickProfile, setClickProfile] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    setClickProfile(!clickProfile);
  };

  const handleLogout = async () => {
    try {
      await userApi.logout();
    } catch (error) {
      console.error(error);
    } finally {
      localStorage.removeItem("access_token");
      navigate("/login");
    }
  };

  const handleNavigate = (path: string) => {
    setClickProfile(false);
    navigate(path);
  };

  return (
    <div className="w-screen pl-10 pr-14 py-[19px] bg-white border-b border-b-mono-4 flex flex-row justify-between items-center">
      <h1 className="text-main-1 text-4xl" onClick={() => navigate("/")}>
        우리끼리
      </h1>
      {isAuth && (
        <>
          <div
            className="w-[52px] h-[52px] relative rounded-full bg-main-1 flex justify-center items-center "
            onClick={handleClick}
          >
            <img src={person_icon_white} className="w-10 h-10" />
          </div>
          {clickProfile && (
            <div className="absolute right-24 top-16 w-[260px] rounded-[20px] border border-mono-3 overflow-hidden bg-white flex flex-col">
              <div
                onClick={() => handleNavigate("/mypage")}
                className="flex justify-center py-5 text-[25px] border-b border-mono-3 cursor-pointer hover:bg-main-5 hover:text-main-2"
              >
                마이페이지
              </div>

              <div
                onClick={() => handleNavigate("/ranking")}
                className="flex justify-center py-5 text-[25px] border-b border-mono-3 cursor-pointer hover:bg-main-5 hover:text-main-2"
              >
                랭킹페이지
              </div>

              <div
                onClick={() => {
                  setClickProfile(false);
                  handleLogout();
                }}
                className="flex flex-row gap-2 justify-center py-5 text-[25px] text-system-error cursor-pointer  hover:bg-main-5"
              >
                로그아웃
                <img src={exit} />
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
