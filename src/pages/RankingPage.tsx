import { useEffect, useState } from "react";
import { LevelChart, RankingChart } from "../components/index";
import type { MyPageResponse, RankingUser } from "../api/types";
import { userApi } from "../api/user";

export const RankingPage = () => {
  const [myData, setMyData] = useState<MyPageResponse | null>(null);
  const [rankings, setRankings] = useState<RankingUser[]>([]);
  const [myRank, setMyRank] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [myPageRes, rankingsRes] = await Promise.all([
          userApi.getMyPage(),
          userApi.getRankings(),
        ]);

        setMyData(myPageRes.data);
        setRankings(rankingsRes.data.rankings);

        const rank = rankingsRes.data.rankings.findIndex(
          (user) => user.nickname === myPageRes.data.nickname
        );

        setMyRank(rank !== -1 ? rank + 1 : null);
      } catch (error) {
        console.error("데이터 조회 실패:", error);
      }
    };

    fetchData();
  }, []);

  if (!myData) return null;

  return (
    <div className="w-screen min-h-screen overflow-hidden flex justify-center pt-[90px] bg-[url('/public/login-bg.png')] bg-cover bg-center">
      <div className="w-screen flex justify-center pt-[45px]">
        <div className="flex flex-row gap-[84px] items-start">
          <div className="flex flex-col py-16 px-[138px] bg-white rounded-[100px] items-center gap-[68px]">
            <div className="flex flex-col gap-7 items-center">
              <div className="flex flex-col items-center gap-3 text-4xl text-black">
                <div className="w-[124px] h-[124px] rounded-full border-2 border-mono-3 bg-white bg-[url('/src/assets/images/monkey-login.png')] bg-cover bg-center" />
                {myData.nickname}
              </div>
              <h1 className="text-[52px] text-main-1">
                {myRank ? `${myRank}위` : "순위 없음"}
              </h1>
            </div>

            <div className="flex flex-col gap-3 items-center">
              <h1 className="text-4xl text-main-3">Level {myData.level}</h1>
              <LevelChart bananaxp={myData.bananaxp} />
            </div>
          </div>

          <div className="h-[830px] overflow-y-scroll relative">
            <RankingChart ranking={rankings} />
          </div>
        </div>
      </div>
    </div>
  );
};
