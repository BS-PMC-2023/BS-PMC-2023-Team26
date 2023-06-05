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
      const apiUrl = `https://api.polygon.io/v2/aggs/ticker/${symbol}/range/1/day/2010-01-01/${new Date().toISOString().slice(0, 10)}?unadjusted=true&sort=asc&apiKey=${apiKey}`;
      const response = await axios.get(apiUrl);

      const data = response.data.results;

      const stockDataArray = data.map(item => ({
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

  const handleSymbolChange = event => {
    setSymbol(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    fetchStockData();
  };

  const exportToExcel = () => {
    const data = stockData.map(item => ({
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

  const createChart = stockData => {
    if (chartRef.current && stockData.length > 0) {
      const dates = stockData.map(item => item.date);
      const prices = stockData.map(item => item.close);
      const stockLabel = `Stock Value: ${symbol}`; // Get the current stock label
  
      if (chartInstance.current) {
        chartInstance.current.data.labels = dates;
        chartInstance.current.data.datasets[0].data = prices;
        chartInstance.current.data.datasets[0].label = stockLabel; // Update the label
        chartInstance.current.update();
      } else {
        chartInstance.current = new Chart(chartRef.current, {
          type: 'line',
          data: {
            labels: dates,
            datasets: [
              {
                label: stockLabel, // Set the label
                data: prices,
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.2)',
                borderColor: 'rgba(75,192,192,1)',
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false, // Added line to disable aspect ratio
            plugins: {
              legend: {
                display: false,
              },
              tooltip: {
                enabled: true,
                mode: 'nearest',
                intersect: false,
                callbacks: {
                  title: () => '',
                  label: tooltipItem => {
                    const datasetIndex = tooltipItem.datasetIndex;
                    const index = tooltipItem.dataIndex;
                    const price = tooltipItem.parsed.y;
                    const stockName = chartInstance.current.data.datasets[datasetIndex].label;
                    return `${stockName}: ${price}`;
                  },
                },
              },
            },
            scales: {
              y: {
                ticks: {
                  beginAtZero: false,
                  font: {
                    weight: 'bold',
                    size: 16, // Increase font size
                  },
                  color: 'rgba(0, 0, 0, 0.8)',
                },
                grid: {
                  color: 'rgba(0, 0, 0, 0.1)',
                },
              },
              x: {
                ticks: {
                  font: {
                    weight: 'bold',
                    size: 16, // Increase font size
                  },
                  color: 'rgba(0, 0, 0, 0.8)',
                },
                grid: {
                  display: false,
                },
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
  
        // Set chart canvas size to match parent container
        chartInstance.current.canvas.parentNode.style.width = '95%';
        chartInstance.current.canvas.parentNode.style.height = '95%';
      }
    }
  };
  


  useEffect(() => {
    if (stockData.length > 0) {
      createChart(stockData);
    }
  }, [stockData]);

  return (
    <>
      <Navbar />
      <div className="stock-history">
        <h1 className="stock-history__title" style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '40px'}}>Stock History</h1>
        <form onSubmit={handleSubmit} className="stock-history__form">
          <label htmlFor="stock-symbol">Choose a stock:</label>
          <select id="stock-symbol" value={symbol} onChange={handleSymbolChange}>
            <option value="AAPL">Apple (AAPL)</option>
            <option value="AMZN">Amazon (AMZN)</option>
            <option value="FB">Facebook (FB)</option>
            <option value="GOOG">Google (GOOG)</option>
            <option value="MSFT">Microsoft (MSFT)</option>
          </select>
          <button type="submit">Fetch Data</button>
        </form>
        <div className="stock-history__buttons">
          <button onClick={exportToExcel}>Export to Excel</button>
        </div>
        <canvas ref={chartRef} id="stock-chart"></canvas>
        {loading && <p>Loading data...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div className="stock-history__results">
            <ul>
              {stockData.map((entry, index) => (
                <li key={index}>
                  {entry.date}: {entry.close}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default StockHistory;
