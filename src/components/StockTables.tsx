import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
  } from '@mui/material';
  import { Stock } from '../types/stock';
  
  const StockTable = ({ stocks }: { stocks: Stock[] }) => (
    <TableContainer component={Paper} className="mt-5 mx-auto max-w-4xl shadow rounded">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{fontWeight:'bold'}} className="font-bold text-gray-1000">Symbol</TableCell>
            <TableCell style={{fontWeight:'bold'}} className="font-bold text-gray-800">Price</TableCell>
            <TableCell style={{fontWeight:'bold'}} className="font-bold text-gray-800">Change (%)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {stocks.map((stock) => (
            <TableRow
              key={stock.symbol}
              className={stock.change < 0 ? 'bg-red-100' : ''}
            >
              <TableCell className="font-medium">{stock.symbol}</TableCell>
              <TableCell>${stock.price.toFixed(2)}</TableCell>
              <TableCell
                className={stock.change < 0 ? 'text-red-600' : 'text-green-600'}
              >
                {stock.change.toFixed(2)}%
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
  export default StockTable;