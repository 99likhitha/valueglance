
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Stock } from '../types/stock';
import { STOCK_TICKERS } from '../constants/tickers';

const apiKey = process.env.REACT_APP_FINNHUB_KEY;

export const useStockData = (page: number, pageSize: number) => {
  const [data, setData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const PAGE_SIZE = 5;

  useEffect(() => {
    const fetchStocks = async () => {
      setLoading(true);
      try {
        const start = page * pageSize;
        const currentSymbols = STOCK_TICKERS.slice(start, start + pageSize);
        const responses = await Promise.all(
          currentSymbols.map((symbol) =>
            axios.get(`https://finnhub.io/api/v1/quote?symbol=${symbol}&token=${apiKey}`)
          )
        );
        if (currentSymbols.length === 0) {
            setData([]);
            setLoading(false);
            return;
          }
          
        const parsed: Stock[] = responses.map((res, i) => {
          const price = res.data.c;
          const prev = res.data.pc;
          return {
            symbol: currentSymbols[i],
            price,
            change: ((price - prev) / prev) * 100,
          };
        });

        setData(parsed);
      } catch (err) {
        console.error('Stock fetch error:', err);
        setError('Failed to fetch stock data.');
      }
     finally {
        setLoading(false);
      }
    };

    fetchStocks();
  }, [page, pageSize]);

  return { data, loading, error };
};

