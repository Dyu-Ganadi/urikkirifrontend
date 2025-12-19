import type { RankingItem } from "../pages/RankingPage";
import first_medal from "../assets/icon/first_medal.svg";
import second_medal from "../assets/icon/second_medal.svg";
import third_medal from "../assets/icon/third_medal.svg";

interface Prop {
  rank: RankingItem;
  idx: number;
}

const RankBar = ({ rank, idx }: Prop) => {
  return (
    <>
      {idx <= 2 && (
        <div className="flex flex-row text-3xl bg-[rgb(255_201_0/90%)] rounded-[20px] overflow-hidden text-white">
          <div className="w-[120px] flex justify-center items-center py-3">
            {idx == 0 && <img src={first_medal} />}
            {idx == 1 && <img src={second_medal} />}
            {idx == 2 && <img src={third_medal} />}
          </div>
          <div className="w-[500px] flex justify-start items-center py-3 pl-4">
            {rank.nickname}
          </div>
          <div className="w-[130px] flex justify-center items-center py-3">
            {rank.level}
          </div>
          <div className="w-[160px] flex justify-center items-center py-3">
            {rank.banana}
          </div>
        </div>
      )}

      {idx > 2 && (
        <div className="flex flex-row text-3xl bg-[rgb(255_255_255/90%)] rounded-[20px] overflow-hidden text-black">
          <div className="w-[120px] flex justify-center items-center py-3">
            <div className="py-2 px-[18px] rounded-full bg-white border-2 border-main-2 text-main-2">
              {idx + 1}
            </div>
          </div>
          <div className="w-[500px] flex justify-start items-center py-3 pl-4">
            {rank.nickname}
          </div>
          <div className="w-[130px] flex justify-center items-center py-3">
            {rank.level}
          </div>
          <div className="w-[160px] flex justify-center items-center py-3">
            {rank.banana}
          </div>
        </div>
      )}
    </>
  );
};

export default RankBar;
