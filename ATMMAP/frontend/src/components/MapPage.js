import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import React, { useRef, useEffect, useState } from 'react';

function MapPage() {
  const mapRef = useRef(null);
  const [filter, setFilter] = useState('');
  const [cities, setCities] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    const map = L.map(mapRef.current);

    const banksUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=1c5bc716-8210-4ec7-85be-92e6271955c2';

    fetch(banksUrl)
      .then(response => response.json())
      .then(data => {
        const banks = data.result.records;

        const validBanks = banks.filter(bank => bank.X_Coordinate !== null && bank.Y_Coordinate !== null);

        const xCoordinates = validBanks.map(bank => bank.X_Coordinate);
        const yCoordinates = validBanks.map(bank => bank.Y_Coordinate);

        if (validBanks.length > 0) {
          // set the view to the first bank's coordinates and zoom level 16
          map.setView([yCoordinates[0], xCoordinates[0]], 16);
        }

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        }).addTo(map);

        const allCities = validBanks.map(bank => bank.City);
        const uniqueCities = [...new Set(allCities)];
        setCities(uniqueCities);

        validBanks.forEach(bank => {
          const { X_Coordinate, Y_Coordinate, City } = bank;

          if (!filter || City.includes(filter)) {
            L.marker([Y_Coordinate, X_Coordinate]).addTo(map).bindPopup(bank.branch_name_he);
          }
        });
      })
      .catch(error => {
        console.error('Error fetching bank locations', error);
      });

    // add a marker for the user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        console.log('Current location:', position.coords.latitude, position.coords.longitude);
        setCurrentLocation([position.coords.latitude, position.coords.longitude]);
        L.marker([position.coords.latitude, position.coords.longitude]).addTo(map).bindPopup('You are here');
      });
    }
    

    return () => {
      map.remove();
    };
  }, [mapRef, filter]);

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleCityFilterChange = (event) => {
    setFilter(event.target.value);
  };


  return (
    <>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={Link} to="/">ATM MAP</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/ExchangeRate">Exchange rate</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <input type="text" placeholder="Filter by city" onChange={handleFilterChange} />
        <select onChange={handleCityFilterChange}>
          <option value="">All Cities</option>
          {cities.map(city => <option value={city}>{city}</option>)}
        </select>
        <div ref={mapRef} style={{ flex: "1", height: "100%" }} />
      </div>
</>
  );
}

export default MapPage;
