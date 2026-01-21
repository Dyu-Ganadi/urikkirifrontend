import { PieChart, Pie, Cell } from "recharts";
import { banana_icon } from "../assets/icon/index";

interface Props {
  bananaxp: number;
}

export const LevelChart = ({ bananaxp }: Props) => {
  const progress = ((bananaxp % 10) / 10) * 100;
  const remain = 100 - progress;

  const data = [
    { name: "progress", value: progress },
    { name: "remain", value: remain },
  ];

  const COLORS = ["#FFF09A", "white"];

  return (
    <div className="relative flex items-center justify-center">
      <PieChart width={250} height={250}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={100}
          startAngle={90}
          endAngle={450}
          dataKey="value"
          stroke="none"
        >
          {data.map((_entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <img src={banana_icon} className="absolute w-[50px] h-[50px]" />
    </div>
  );
};
