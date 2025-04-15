import { useState } from 'react';
import { Grid, Typography, Card, CardContent, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import OrderTable from './OrderTable';
import OrderChart from './OrderChart';

const Container = styled.div`
  padding: 20px;
  background-color: #f4f6f9;
`;

const Header = styled(Typography)`
  color: #34495e;
  margin-bottom: 20px;
  font-weight: 600;
`;

const StyledCard = styled(Card)`
  background: linear-gradient(135deg, #6a11cb 30%, #2575fc 100%);
  color: white;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  &:hover {
    transform: scale(1.05);
  }
`;

const dummyOrders = [
  {
    _id: '6724b1fec0264409b9b5b72f',
    items: [{ name: 'Hamburger Burger with Beef', price: 150, quantity: 1 }],
    tableNumber: 30,
    serverName: '3',
    orderTime: '2024-11-01T12:48:00.000+00:00',
  },
  {
    _id: '6724b1fec0264409b9b5b731',
    items: [{ name: 'Cheese Pizza', price: 200, quantity: 2 }],
    tableNumber: 15,
    serverName: '1',
    orderTime: '2024-11-01T14:30:00.000+00:00',
  },
];
const dummyOrderStats = [
    { date: '2024-10-25', orderCount: 15 },
    { date: '2024-10-26', orderCount: 20 },
    { date: '2024-10-27', orderCount: 22 },
    { date: '2024-10-28', orderCount: 18 },
    { date: '2024-10-29', orderCount: 25 },
    { date: '2024-10-30', orderCount: 30 },
    { date: '2024-10-31', orderCount: 35 },
  ];
  console.log("Dummy Order Stats:", dummyOrderStats);


const Dashboard = () => {
  const [orders] = useState(dummyOrders);
  const [orderStats] = useState(dummyOrderStats);

  return (
    <Container>
      <Header variant="h4">Restaurant Order Dashboard</Header>

      {/* KPI Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <AnimatedCard title="Total Orders" value={orders.length} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnimatedCard
            title="Total Revenue"
            value={`$${orders.reduce((acc, order) => acc + order.items[0].price * order.items[0].quantity, 0)}`}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <AnimatedCard title="Active Orders" value={orders.length} />
        </Grid>
      </Grid>

      {/* Order Table */}
      <OrderTable orders={orders} />

      {/* Chart */}
      <OrderChart orderStats={dummyOrderStats} />
    </Container>
  );
};

const AnimatedCard = ({ title, value }) => (
  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
    <StyledCard>
      <CardContent>
        <Typography variant="h6" style={{ color: 'white', fontWeight: 'bold' }}>{title}</Typography>
        <Typography variant="h4" style={{ color: 'white', fontWeight: 'bold' }}>{value}</Typography>
      </CardContent>
    </StyledCard>
  </motion.div>
);

export default Dashboard;
