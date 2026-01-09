import { UnityGame } from "../components/index";

export const GamePage = () => {
  return (
    <div className="flex-1 overflow-hidden flex flex-row bg-[#5E5E5E]">
      <div className="w-[1156px] h-[680px] bg-white m-auto">
        <UnityGame />
      </div>
    </div>
  );
};
