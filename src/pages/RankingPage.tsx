import React from "react";
import LevelChart from "../components/LevelChart";
import RankingChart from "../components/RankingChart";

export interface RankingItem {
  id: number;
  nickname: string;
  level: number;
  banana: number;
}

const dummyRanking = [
  { id: 1, nickname: "정글의전설원숭이", level: 20, banana: 9500 },
  { id: 2, nickname: "바나나왕원숭이", level: 19, banana: 8800 },
  { id: 3, nickname: "킹콩주니어", level: 18, banana: 8100 },
  { id: 4, nickname: "침팬지대장", level: 17, banana: 7400 },
  { id: 5, nickname: "원숭이박사", level: 16, banana: 6800 },
  { id: 6, nickname: "바나나사냥꾼", level: 15, banana: 6200 },
  { id: 7, nickname: "정글의지배자", level: 14, banana: 5700 },
  { id: 8, nickname: "바나나수집원숭이", level: 13, banana: 5200 },
  { id: 9, nickname: "날쌘원숭이", level: 12, banana: 4700 },
  { id: 10, nickname: "나무위의철학자", level: 11, banana: 4200 },
  { id: 11, nickname: "정글탐험원숭이", level: 10, banana: 3700 },
  { id: 12, nickname: "꼬리긴원숭이", level: 9, banana: 3200 },
  { id: 13, nickname: "바나나도둑", level: 8, banana: 2800 },
  { id: 14, nickname: "바나나홀릭", level: 7, banana: 2400 },
  { id: 15, nickname: "장난꾸러기원숭이", level: 6, banana: 2000 },
  { id: 16, nickname: "바나나먹방러", level: 5, banana: 1600 },
  { id: 17, nickname: "나무타기고수", level: 4, banana: 1200 },
  { id: 18, nickname: "바나나한입", level: 3, banana: 800 },
  { id: 19, nickname: "초보원숭이", level: 2, banana: 400 },
  { id: 20, nickname: "정글꼬마원숭이", level: 1, banana: 150 },
];

const RankingPage = () => {
  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center pt-[90px] bg-[url('/public/login-bg.png')] bg-cover bg-center">
      <div className="w-screen flex justify-center pt-[45px]">
        <div className="flex flex-row gap-[84px] items-start">
          <div className="flex flex-col py-16 px-[138px] bg-white rounded-[100px] items-center gap-[68px]">
            <div className="flex flex-col gap-7 items-center">
              <div className="flex flex-col items-center gap-3 text-4xl text-black">
                <div className="w-[124px] h-[124px] rounded-full border-2 border-mono-3 bg-white bg-[url('/src/assets/images/monkey-login.png')] bg-cover bg-center" />
                {"우끼끼"}
              </div>
              <h1 className="text-[52px] text-main-1">{1234}위</h1>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-4xl text-main-3">Level {5}</h1>
              <LevelChart />
            </div>
          </div>

          <div className="h-[830px] overflow-y-scroll relative ranking-mask">
            <RankingChart ranking={dummyRanking} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingPage;
