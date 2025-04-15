import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const ChartContainer = styled.div`
  margin-top: 20px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
`;

const OrderChart = ({ orderStats }) => {
  console.log("Order Stats:", orderStats); // Debug log

  return (
    <ChartContainer>
      <Typography variant="h5" style={{ color: '#34495e' }}>Order Trends</Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={orderStats}>
          <CartesianGrid stroke="#e0e0e0" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="orderCount" stroke="#6a11cb" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default OrderChart;
