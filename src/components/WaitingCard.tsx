import monkey from "../assets/images/monkey2.png";
import anon from "../assets/images/anon.png";

interface Prop {
  level?: number;
  name?: string;
}

const WaitingCard = ({ level, name }: Prop) => {
  const isEmpty = !name;

  return (
    <div className="flex flex-col gap-[10px]">
      {isEmpty ? (
        <>
          <div className="w-[280px] h-[300px] flex justify-center items-center bg-white border-4 border-dashed border-mono-3 rounded-[20px]">
            <img src={anon} />
          </div>
          <div className="w-[280px] h-[80px]  bg-white border-4 border-mono-3 flex flex-col gap-1 items-center justify-center text-2xl rounded-[20px]" />
        </>
      ) : (
        <>
          <div className="w-[280px] h-[300px] flex justify-center items-center bg-white border-4 border-main-2 rounded-[20px]">
            <img src={monkey} />
          </div>

          <div className="w-[280px] h-[80px]  bg-white border-4 border-main-2 flex flex-col gap-1 items-center justify-center text-2xl rounded-[20px]">
            <p className="text-xl">Lv. {level}</p>
            {name}
          </div>
        </>
      )}
    </div>
  );
};

export default WaitingCard;
