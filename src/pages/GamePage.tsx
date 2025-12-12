import UnityGame from "../components/UnityGame.tsx";

const LandingPage = () => {
    return (
        <div className="flex-1 overflow-hidden flex flex-row bg-[#5E5E5E]">
            <div className="w-[1156px] h-[680px] bg-white m-auto">
                <UnityGame/>
            </div>
        </div>
    );
};

export default LandingPage;
