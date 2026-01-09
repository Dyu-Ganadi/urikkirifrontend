import { PieChart, Pie, Cell } from "recharts";
import { banana_icon } from "../assets/icon/index";

const data = [
  { name: "progress", value: 70 },
  { name: "remain", value: 30 },
];

const COLORS = ["#FFF09A", "white"]; // 원하는 색 넣기

export const LevelChart = () => {
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
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
        </Pie>
      </PieChart>
      <img src={banana_icon} className="absolute w-[50px] h-[50px]" />
    </div>
  );
};
