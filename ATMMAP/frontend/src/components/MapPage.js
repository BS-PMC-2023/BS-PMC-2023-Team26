
import React, { useRef, useEffect, useState } from "react";
import Navbar from './Navbar';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: icon,
  iconUrl: icon,
  shadowUrl: iconShadow,
});

function MapPage() {
  const mapRef = useRef(null);
  const [cityFilter, setCityFilter] = useState("");
  const [bankFilter, setBankFilter] = useState("");
  const [cities, setCities] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [filterOption, setFilterOption] = useState("banks");

  useEffect(() => {

    //if (!mapRef.current) return;
    const map = L.map(mapRef.current);

    let apiUrl;
    if (filterOption === "banks") {
      apiUrl =
        "https://data.gov.il/api/3/action/datastore_search?resource_id=1c5bc716-8210-4ec7-85be-92e6271955c2";
    } else if (filterOption === "atms") {
      apiUrl =
        "https://data.gov.il/api/3/action/datastore_search?resource_id=b9d690de-0a9c-45ef-9ced-3e5957776b26";
    }

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const banks = data.result.records;

        const validBanks = banks.filter(
          (bank) =>
            bank.X_Coordinate !== null && bank.Y_Coordinate !== null
        );

        const xCoordinates = validBanks.map((bank) => bank.X_Coordinate);
        const yCoordinates = validBanks.map((bank) => bank.Y_Coordinate);

        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        const allBankNames = validBanks.map((bank) => bank.Bank_Name);
 
        const allCities = validBanks.map((bank) => bank.City);
        const uniqueCities = [...new Set(allCities)];
        const uniqueBankNames = [...new Set(allBankNames)];

        setCities(uniqueCities);
        setBankNames(uniqueBankNames);
        validBanks.forEach((bank) => {
          const { X_Coordinate, Y_Coordinate, City, Bank_Name } = bank;
          const excludedCoordinate = { X_Coordinate: 33.211031, Y_Coordinate: 34.570094 };
          if (
            (!cityFilter || City.toLowerCase().includes(cityFilter.toLowerCase())) &&
            (!bankFilter || Bank_Name.toLowerCase().includes(bankFilter.toLowerCase())) &&
            (X_Coordinate !== excludedCoordinate.X_Coordinate || Y_Coordinate !== excludedCoordinate.Y_Coordinate)
          ) {
            if (!X_Coordinate.toString().startsWith("35") && !X_Coordinate.toString().startsWith("34")) {
              L.marker([X_Coordinate, Y_Coordinate])
              .addTo(map)
              .bindPopup(`Bank: ${Bank_Name}`);
            }


            else{
            L.marker([Y_Coordinate, X_Coordinate])
              .addTo(map)
              .bindPopup(`Bank: ${Bank_Name}`);
            }
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching locations", error);
      });
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            console.log(
              "Current location:",
              position.coords.latitude,
              position.coords.longitude
            );
            setCurrentLocation([position.coords.latitude, position.coords.longitude]);
            L.marker([position.coords.latitude, position.coords.longitude])
              .addTo(map)
              .bindPopup("You are here");
            map.setView([position.coords.latitude, position.coords.longitude], 16);
          },
          (error) => {
            console.error("Error retrieving current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported");
      }
  
      return () => {
        map.remove();
      };
    }, [mapRef, cityFilter, bankFilter, filterOption]);

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  };

  const handleBankFilterChange = (event) => {
    setBankFilter(event.target.value);
  };

  const handleFilterOptionChange = (event) => {
    setFilterOption(event.target.value);
  };
    
    
    return (
      <div>
      <Navbar />
      <div className="map-page-container">
        <div className="filters-container">
          <form>
            <div className="form-group">
              <label htmlFor="cityFilter">City:</label>
              <select
                id="cityFilter"
                className="form-control"
                value={cityFilter}
                onChange={handleCityFilterChange}
              >
                <option value="">All Cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="bankFilter">Banks:</label>
              <select
                id="bankFilter"
                className="form-control"
                value={bankFilter}
                onChange={handleBankFilterChange}
              >
                <option value="">All Banks</option>
                {bankNames.map((bankName) => (
                  <option key={bankName} value={bankName}>
                    {bankName}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="filterOption">Filter:</label>
              <select
                id="filterOption"
                className="form-control"
                value={filterOption}
                onChange={handleFilterOptionChange}
              >
                <option value="banks">Banks</option>
                <option value="atms">ATMs</option>
       </select>
            </div>
          </form>
        </div>
        <div className="map-container">
  <div id="map" style={{ height: "650px", marginTop: "50px" }} ref={mapRef}></div>
</div>
  </div>
    </div>
  );
}
    
    export default MapPage;
