import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import axios from 'axios';
import Navbar from './Navbar';
import '../styles/CryptoGraph.css';

const CryptoGraph = ({ coinId = 'bitcoin' }) => {
  const [chartData, setChartData] = useState({});
  const [selectedCoin, setSelectedCoin] = useState(coinId);
  const [selectedDays, setSelectedDays] = useState('30');
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const fetchCryptoData = async () => {
    try {
      const apiUrl = `https://api.coingecko.com/api/v3/coins/${selectedCoin}/market_chart?vs_currency=usd&days=${selectedDays}&interval=daily`;

      const response = await axios.get(apiUrl);
      console.log('Response data:', response.data);

      const data = response.data.prices;

      if (data) {
        const dates = data.map(entry => new Date(entry[0]).toLocaleDateString());
        const prices = data.map(entry => parseFloat(entry[1]));

        setChartData({
          labels: dates,
          datasets: [
            {
              label: `Crypto Value: ${selectedCoin}`,
              data: prices,
              fill: false,
              backgroundColor: 'rgba(75,192,192,0.2)',
              borderColor: 'rgba(75,192,192,1)',
            },
          ],
        });
      } else {
        console.error('Error: Response data prices are undefined');
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCryptoData();
  }, [selectedCoin, selectedDays]);

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
              },
              grid: {
                color: 'rgba(0, 0, 0, 0.1)',
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [chartData]);

  const handleCoinChange = (event) => {
    setSelectedCoin(event.target.value);
  };

  const handleDaysChange = (event) => {
    setSelectedDays(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="crypto-graph">
        <h2 className="crypto-graph__title">Crypto Value: {selectedCoin}</h2>
        <div className="crypto-graph__options">
          <div className="crypto-graph__options-item">
            <label htmlFor="coin">Crypto:</label>
            <select id="coin" value={selectedCoin} onChange={handleCoinChange}>
              <option value="bitcoin">Bitcoin</option>
              <option value="ethereum">Ethereum</option>
              <option value="binancecoin">Binance Coin</option>
              <option value="cardano">Cardano</option>
              <option value="dogecoin">Dogecoin</option>
              {/* Add more coins here */}
            </select>
          </div>
          <div className="crypto-graph__options-item">
          <label htmlFor="days">Timeline:</label>
            <select id="days" value={selectedDays} onChange={handleDaysChange}>
              <option value="1">1 Day</option>
              <option value="7">1 Week</option>
              <option value="30">1 Month</option>
              <option value="90">3 Months</option>
              <option value="180">6 Months</option>
              <option value="365">1 Year</option>
            </select>
          </div>
        </div>
        <canvas ref={chartRef} className="crypto-graph__chart"></canvas>
      </div>
    </>
  );
};

export default CryptoGraph;