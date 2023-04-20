import React, { useState } from 'react';
import '../styles/ExchangeRatePage.css';
import Navbar from './Navbar';


function ExchangeRatePage() {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  const convertCurrency = () => {
    fetch(`https://api.exchangerate.host/latest?base=${fromCurrency}&symbols=${toCurrency}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        const conversionRate = data.rates[toCurrency];
        const convertedAmount = amount * conversionRate;
        setConvertedAmount(convertedAmount.toFixed(2));
      })
      .catch((error) => {
        console.error(error);
        setConvertedAmount(null);
      });
  };

  const handleConvertClick = () => {
    convertCurrency();
  };

  return (

    <div>
      <Navbar />
    <div className="ExchangeRatePage">
      <h1>Currency Exchange Rate</h1>
      <div className="form-group">
        <label>
          From Currency:
          <select value={fromCurrency} onChange={handleFromCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="ILS">ILS</option>
          </select>
        </label>
        <label>
          To Currency:
          <select value={toCurrency} onChange={handleToCurrencyChange}>
            <option value="USD">USD</option>
            <option value="EUR">EUR</option>
            <option value="GBP">GBP</option>
            <option value="CAD">CAD</option>
            <option value="ILS">ILS</option>
          </select>
        </label>
        <label>
          Amount:
          <input type="number" value={amount} onChange={handleAmountChange} />
        </label>
      </div>
      <button onClick={handleConvertClick}>Convert</button>
      <div>
        {convertedAmount && (
          <p>
            {amount} {fromCurrency} is {convertedAmount} {toCurrency}
          </p>
        )}
      </div>
    </div>
    </div>
  );
}

export default ExchangeRatePage;
