import { Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material';
import styled from 'styled-components';

const StyledTableCell = styled(TableCell)`
  color: #34495e;
  font-weight: 600;
  border-bottom: 1px solid #dfe6e9;
`;

const OrderTable = ({ orders }) => (
  <>
    <Typography variant="h5" style={{ margin: '20px 0', color: '#34495e' }}>Order Details</Typography>
    <Table>
      <TableHead style={{ backgroundColor: '#ecf0f1' }}>
        <TableRow>
          <StyledTableCell>Order ID</StyledTableCell>
          <StyledTableCell>Dish Name</StyledTableCell>
          <StyledTableCell>Price</StyledTableCell>
          <StyledTableCell>Quantity</StyledTableCell>
          <StyledTableCell>Table Number</StyledTableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {orders.map(order => (
          <TableRow key={order._id}>
            <TableCell>{order._id}</TableCell>
            <TableCell>{order.items[0].name}</TableCell>
            <TableCell>${order.items[0].price}</TableCell>
            <TableCell>{order.items[0].quantity}</TableCell>
            <TableCell>{order.tableNumber}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </>
);

export default OrderTable;
