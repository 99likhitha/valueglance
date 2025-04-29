import { useState } from 'react';
import { useStockData } from './hooks/useStockData';
import StockTable from './components/StockTables';
import Loader from './components/Loader';
import { Pagination } from '@mui/material';
import BarChart from './components/BarChart';

const PAGE_SIZE = 15;

function App() {
  const [page, setPage] = useState(0); // zero-based
  const { data: stocks, loading, error } = useStockData(page, PAGE_SIZE);

  const totalPages = Math.ceil(50 / PAGE_SIZE); // 50 tickers

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Stock Price Dashboard
      </h1>

      {loading && <Loader />}
      {error && <p className="text-center text-red-500">{error}</p>}

{!loading && !error && (
  <>
    <StockTable stocks={stocks} />
    <BarChart stocks={stocks} />
    <div className="flex justify-center mt-6">
      <Pagination
        count={totalPages}
        page={page + 1}
        onChange={(_, newPage) => setPage(newPage - 1)}
        color="primary"
      />
    </div>
  </>
)}

{error && (
  <div className="text-center text-red-500">
    {/* {error} */}
    <button
      onClick={() => window.location.reload()}
      className="ml-4 text-blue-600 underline"
    >
      Retry
    </button>
  </div>
)}
    </div>
  );
}

export default App;

