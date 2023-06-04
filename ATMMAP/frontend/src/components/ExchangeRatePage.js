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
      <div className="exchange-rate-page">
        <h1 className="exchange-rate-page__title" style={{ color: 'darkgoldenrod'}}>Currency Exchange Rate</h1>
        <div className="exchange-rate-page__form-group">
          <div className="exchange-rate-page__form-group-item">
            <div className="input-container">
              <label htmlFor="from-currency" className="label-spacing">From Currency:</label>
              <select id="from-currency" value={fromCurrency} onChange={handleFromCurrencyChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="ILS">ILS</option>
              </select>
            </div>
          </div>
          <div className="exchange-rate-page__form-group-item">
            <div className="input-container">
              <label htmlFor="to-currency" className="label-spacing">To Currency:</label>
              <select id="to-currency" value={toCurrency} onChange={handleToCurrencyChange}>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="CAD">CAD</option>
                <option value="ILS">ILS</option>
              </select>
            </div>
          </div>
          <div className="exchange-rate-page__form-group-item">
            <div className="input-container">
              <label htmlFor="amount" className="label-spacing">Amount:</label>
              <input id="amount" type="number" value={amount} onChange={handleAmountChange} />
            </div>
          </div>
        </div>
        <button className="exchange-rate-page__convert-button" onClick={handleConvertClick}>
          Convert
        </button>
        <div className="exchange-rate-page__result">
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
