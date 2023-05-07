import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";

function MapPage() {
  const mapRef = useRef(null);
  const [cityFilter, setCityFilter] = useState("");
  const [bankFilter, setBankFilter] = useState("");
  const [cities, setCities] = useState([]);
  const [bankNames, setBankNames] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const map = L.map(mapRef.current);

    const banksUrl =
      "https://data.gov.il/api/3/action/datastore_search?resource_id=1c5bc716-8210-4ec7-85be-92e6271955c2";

    fetch(banksUrl)
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

          if (
            (!cityFilter || City.toLowerCase().includes(cityFilter.toLowerCase())) &&
            (!bankFilter || Bank_Name.toLowerCase().includes(bankFilter.toLowerCase()))
          ) {
            L.marker([Y_Coordinate, X_Coordinate])
              .addTo(map)
              .bindPopup(bank.branch_name_he);
          }
        });
      })
      .catch((error) => {
        console.error("Error fetching bank locations", error);
      });

    // add a marker for the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(
          "Current location:",
          position.coords.latitude,
          position.coords.longitude
        );
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        L.marker([position.coords.latitude, position.coords.longitude])
          .addTo(map)
          .bindPopup("You are here");
        // set the view to the user's current location coordinates and zoom level 16
        map.setView([position.coords.latitude, position.coords.longitude], 16);
      });
    } else {
      // set the view to the first bank's coordinates and zoom level 16
      map.setView([yCoordinates[0], xCoordinates[0]], 16);
    }

    return () => {
      map.remove();
    };
  }, [mapRef, cityFilter, bankFilter]);

  const handleCityFilterChange = (event) => {
    setCityFilter(event.target.value);
  }

    const handleBankFilterChange = (event) => {
    setBankFilter(event.target.value);
    };
    
    return (
   <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">
          Bank Locator
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/ExchangeRate">
              Exchange rate
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-3">
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
            </form>
          </div>
          <div className="col-md-9">
          <div id="map" style={{ height: "650px", marginTop: "50px" }} ref={mapRef}></div>

          </div>
        </div>
      </div>
    </div>
  );
}
    
    export default MapPage;
