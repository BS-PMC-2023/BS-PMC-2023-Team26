import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Navbar from './Navbar';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import '../styles/CurrencyValueGraph.css';
import 'chart.js/auto';



const CurrencyValueGraph = ({ currencySymbol = 'USD/EUR' }) => {
  const [chartData, setChartData] = useState({});
  const [selectedSymbol, setSelectedSymbol] = useState(currencySymbol);
  const [selectedInterval, setSelectedInterval] = useState('1day');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchCurrencyData = async () => {
    try {
      const apiKey = 'f8de0eb91622481cb5c35593309ec57f'; // Replace with your Twelve Data API key
      const apiUrl = `https://api.twelvedata.com/time_series?symbol=${selectedSymbol}&interval=${selectedInterval}&apikey=${apiKey}`;

      const response = await axios.get(apiUrl);
      console.log('Response data:', response.data);

      const data = response.data.values;

      if (data) {
        const dates = data.map(entry => entry.datetime);
        const rates = data.map(entry => parseFloat(entry.close));

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Currency Value: ${selectedSymbol}`,
              data: rates,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } else {
        console.error('Error: Response data values are undefined');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCurrencyData();
  }, [selectedSymbol, selectedInterval]);

  useEffect(() => {
    if (chartData.datasets) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
      chartInstance.current = new Chart(chartRef.current, {
        type: 'line',
        data: chartData,
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
                  size: 16, // Adjust the font size as desired
                },
              },
              grid: {
                color: 'rgba(255, 255, 255, 0.8)', // Set the grid color to white with reduced transparency
              },
            },
            x: {
              grid: {
                display: false,
              },
              ticks: {
                color: 'white', // Set the font color to white
                font: {
                  size: 16, // Adjust the font size as desired
                },
              },
            },
          },
          elements: {
            line: {
              borderColor: '#ffffff', // Set the line color to white
              borderWidth: 2,
            },
            point: {
              radius: 0,
            },
          },
        },
      });
    }
  }, [chartData]);

  const handleSymbolChange = (event) => {
    setSelectedSymbol(event.target.value);
  };

  const handleIntervalChange = (event) => {
    setSelectedInterval(event.target.value);
  };

  const exportToExcel = () => {
    const data = chartData.labels.map((label, index) => ({
      Date: label,
      Value: chartData.datasets[0].data[index],
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Currency Data');

    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const date = new Date().toISOString().slice(0, 10);
    const filename = `currency_data_${date}.xlsx`;
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), filename);
  };

  return (
    <>
      <Navbar />
      <div className="currency-value-graph">
        <h2 className="currency-value-graph__title" style={{ color: 'darkgoldenrod', fontWeight : 'bold', fontSize : '40px'}}>Currency Value: {selectedSymbol}</h2>
        <div className="currency-value-graph__options">
          <div className="currency-value-graph__options-item">
            <label htmlFor="symbol">Currency pair:</label>
            <select id="symbol" value={selectedSymbol} onChange={handleSymbolChange}>
              <option value="USD/EUR">USD/EUR</option>
              <option value="USD/JPY">USD/JPY</option>
              <option value="USD/GBP">USD/GBP</option>
              <option value="USD/AUD">USD/AUD</option>
              {/* Add more currency pairs here */}
            </select>
          </div>
          <div className="currency-value-graph__options-item">
            <label htmlFor="interval">Timeline:</label>
            <select id="interval" value={selectedInterval} onChange={handleIntervalChange}>
              <option value="1day">1 Day</option>
              <option value="1week">1 Week</option>
              <option value="1month">1 Month</option>
              <option value="3month">3 Months</option>
              <option value="6month">6 Months</option>
              <option value="1year">1 Year</option>
            </select>
          </div>
          <div className="currency-value-graph__options-item">
            <button onClick={exportToExcel}>Export to Excel</button>
          </div>
        </div>
        <canvas ref={chartRef} className="currency-value-graph__chart"></canvas>
      </div>
    </>
);

  
};

export default CurrencyValueGraph;
