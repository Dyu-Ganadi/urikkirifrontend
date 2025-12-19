import React from "react";
import WaitingCard from "./WaitingCard";

const WaitingSection = () => {
  const players = [
    { level: 10, name: "우끼끼" },
    { level: 5, name: "화났기" },
    null,
    null, // 빈 슬롯
  ];

  return (
    <div className="flex flex-row gap-20">
      {players.map((player, idx) => (
        <WaitingCard key={idx} level={player?.level} name={player?.name} />
      ))}
    </div>
  );
};

export default WaitingSection;
