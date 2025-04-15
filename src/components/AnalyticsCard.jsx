import { LineChart, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { month: "Jan", revenue: 8000 },
  { month: "Feb", revenue: 10000 },
  { month: "Mar", revenue: 9500 },
  { month: "Apr", revenue: 12000 },
];

const AnalyticsCard = () => (
  <div className="bg-white rounded-lg shadow-md p-4">
    <h3 className="font-semibold mb-4">Revenue Trend</h3>
    <ResponsiveContainer width="100%" height={200}>
      <LineChart data={data}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="revenue" stroke="#10B981" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

<<<<<<< Updated upstream
export default AnalyticsCard;
=======
export default AnalyticsCard;
>>>>>>> Stashed changes
