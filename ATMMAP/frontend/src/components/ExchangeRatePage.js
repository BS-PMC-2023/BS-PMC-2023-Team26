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
      fetch(`https://api.exchangeratesapi.io/latest?base=${fromCurrency}&symbols=${toCurrency}`)
        .then((response) => response.json())
        .then((data) => {
          const conversionRate = data.rates[toCurrency];
          const convertedAmount = amount * conversionRate;
          setConvertedAmount(convertedAmount);
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
        <h1>Currency Exchange Rate</h1>
        <div>
          <label>
            From Currency:
            <select value={fromCurrency} onChange={handleFromCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            To Currency:
            <select value={toCurrency} onChange={handleToCurrencyChange}>
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="CAD">CAD</option>
            </select>
          </label>
        </div>
        <div>
          <label>
            Amount:
            <input type="number" value={amount} onChange={handleAmountChange} />
          </label>
        </div>
        <div>
          <button onClick={handleConvertClick}>Convert</button>
        </div>
        <div>
          <p>Converted Amount: {convertedAmount}</p>
        </div>
      </div>
    );
  }
  