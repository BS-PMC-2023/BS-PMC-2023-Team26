import React, { useState } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';
import '../styles/StockHistory.css';

const StockHistory = () => {
  const [symbol, setSymbol] = useState('AAPL');
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const apiKey = 'oVHkpmnuxoL7LpUDfsQtSMn849FF3Drt'; // Replace with your Polygon.io API key

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

  return (
    <>
      <Navbar />
      <div className="stock-history">
        <h1 className="stock-history__title">Stock History</h1>
        <form onSubmit={handleSubmit} className="stock-history__form">
          <label htmlFor="stock-symbol">Choose a stock:</label>
          <select id="stock-symbol" value={symbol} onChange={handleSymbolChange}>
            <option value="AAPL">Apple (AAPL)</option>
            <option value="AMZN">Amazon (AMZN)</option>
            <option value="FB">Facebook (FB)</option>
            <option value="GOOG">Google (GOOG)</option>
            <option value="MSFT">Microsoft (MSFT)</option>
          </select>
        </form>
        <div className="stock-history__buttons">
          <button type="submit" className="stock-history__submit-button" onClick={handleSubmit}>Fetch Data</button>
          <button onClick={exportToExcel} className="stock-history__export-button">Export to Excel</button>
        </div>
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
