import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import Chart from 'chart.js/auto';
import '../styles/StockHistory.css';

const StockHistory = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const apiKey = 'oVHkpmnuxoL7LpUDfsQtSMn849FF3Drt';

  const fetchStockData = async () => {
    setLoading(true);
    setError('');

    try {
      const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2010-01-01/${new Date().toISOString().slice(
        0,
        10
      )}?unadjusted=true&sort=asc&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);

      const data = response.data.results;

      const stockDataArray = data.map((item) => ({
        date: new Date(item.t).toISOString().slice(0, 10),
        close: parseFloat(item.c),
      }));

      setStockData(stockDataArray);
      createChart(stockDataArray);
    } catch (error) {
      setError('Error fetching stock data');
    }

    setLoading(false);
  };

  const handleSymbolChange = (event) => {
    setSymbol(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchStockData();
  };

  const exportToExcel = () => {
    const data = stockData.map((item) => ({
      Date: item.date,
      Close: item.close,
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Stock Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const date = new Date().toISOString().slice(0, 10);
    const filename = `stock_data_${date}.xlsx`;
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), filename);
  };

  const createChart = (stockData) => {
    if (chartRef.current && stockData.length > 0) {
      const dates = stockData.map((item) => item.date);
      const prices = stockData.map((item) => item.close);
      const stockLabel = `Stock Value: ${symbol}`;

      if (chartInstance.current) {
        chartInstance.current.data.labels = dates;
        chartInstance.current.data.datasets[0].data = prices;
        chartInstance.current.data.datasets[0].label = stockLabel;
        chartInstance.current.update();
      } else {
        chartInstance.current = new Chart(chartRef.current, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: stockLabel,
                data: prices,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
              },
            ],
          },
          options: {
            responsive: true,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                ticks: {
                  beginAtZero: false,
                  color: 'white', // Set the font color to white
                  font: {
                    weight: 'bold',
                    size: 16,
                  },
                },
                grid: {
                  color: 'rgba(255, 255, 255, 0.8)',
                },
              },
              x: {
                ticks: {
                  color: 'white', // Set the font color to white
                  font: {
                    weight: 'bold',
                    size: 16,
                  },
                },
                grid: {
                  display: false,
                },
              },
            },
            elements: {
              line: {
                borderColor: '#ffffff',
                borderWidth: 2,
              },
              point: {
                radius: 0,
              },
            },
            layout: {
              padding: {
                top: 50,
                bottom: 50,
              },
            },
          },
        });
      }
    }
  };

  useEffect(() => {
    fetchStockData();
  }, []);

  useEffect(() => {
    if (stockData.length > 0) {
      createChart(stockData);
    }
  }, [stockData]);

  return (
    <>
      <Navbar />
      <div className="stock-history">
        <h1 className="stock-history__title">Stock History</h1>
        <form onSubmit={handleSubmit} className="stock-history__form">
          <div style={{ fontSize: '20px' }}>
            <label >Choose a stock:</label>
            <select id="stock-symbol" value={symbol} onChange={handleSymbolChange}>
              <option value="AAPL">Apple (AAPL)</option>
              <option value="AMZN">Amazon (AMZN)</option>
              <option value="FB">Facebook (FB)</option>
              <option value="GOOG">Google (GOOG)</option>
              <option value="MSFT">Microsoft (MSFT)</option>
            </select>
          </div>
          <div className="stock-history__buttons">
            <button style={{ backgroundColor: '#28a745', fontSize: '20px', color: 'white' }} onClick={exportToExcel}>
              Export to Excel
            </button>
            <button style={{ backgroundColor: 'darkgoldenrod', fontSize: '20px', color: 'white' }} type="submit">
              Fetch Data
            </button>
          </div>
        </form>


        <canvas ref={chartRef} id="stock-chart"></canvas>
        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default StockHistory;
