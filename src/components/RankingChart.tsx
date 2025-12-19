import type { RankingItem } from "../pages/RankingPage";
import RankBar from "./RankBar";

interface Prop {
  ranking: RankingItem[];
}

const RankingChart = ({ ranking }: Prop) => {
  return (
    <div className="flex flex-col gap-6 justify-start overflow-y-scroll">
      {/* 위에 바 */}
      <div className="flex flex-row text-xl bg-[rgb(255_255_255/80%)] rounded-[20px] overflow-hidden">
        <div className="w-[120px] flex justify-center items-center py-3">
          순위
        </div>
        <div className="w-[500px] flex justify-start items-center py-3 pl-4">
          아이디
        </div>
        <div className="w-[130px] flex justify-center items-center py-3">
          레벨
        </div>
        <div className="w-[160px] flex justify-center items-center py-3">
          바나나
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {ranking.map((rank, i) => (
          <RankBar key={rank.id} rank={rank} idx={i} />
        ))}
      </div>
    </div>
  );
};

export default RankingChart;
