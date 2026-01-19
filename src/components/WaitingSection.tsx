import { WaitingCard } from "./index";

interface Participant {
  user_id: number;
  nickname: string;
  level: number;
  is_examiner?: boolean;
}

interface WaitingSectionProps {
  participants: Participant[];
}

export const WaitingSection = ({ participants }: WaitingSectionProps) => {
  const slots = Array(4).fill(null);
  
  if (Array.isArray(participants)) {
    participants.forEach((participant, index) => {
      if (index < 4) {
        slots[index] = participant;
      }
    });
  }

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
