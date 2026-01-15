import { WaitingCard } from "./index";

interface Participant {
  userId: number;
  nickname: string;
  level: number;
}

interface WaitingSectionProps {
  participants: Participant[];
}

export const WaitingSection = ({ participants }: WaitingSectionProps) => {
  const slots = Array(4).fill(null);
  
  participants.forEach((participant, index) => {
    if (index < 4) {
      slots[index] = participant;
    }
  });

  return (
    <div className="flex flex-row gap-20">
      {slots.map((participant, idx) => (
        <WaitingCard 
          key={idx} 
          level={participant?.level} 
          name={participant?.nickname} 
        />
      ))}
    </div>
  );
};
