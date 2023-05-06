import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { URLSearchParams } from 'url';

function MapPage() {
  const mapRef = useRef(null);
  const [banks, setBanks] = useState([]);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([32.0853, 34.7818], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Fetch bank locations from API
    const apiUrl = 'https://data.gov.il/api/3/action/datastore_search?resource_id=1c5bc716-8210-4ec7-85be-92e6271955c2';
    const data = {
      resource_id: '1c5bc716-8210-4ec7-85be-92e6271955c2',
      limit: 1000,
    };
    fetch(`${apiUrl}?${new URLSearchParams(data)}`)
    .then(response => response.json())
    .then(data => {
      console.log(data.result.records); // log the bank records
      const banks = data.result.records;
      setBanks(banks);
      banks.forEach(bank => {
        const { address } = bank;
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address }, (results, status) => {
          if (status === "OK") {
            const { lat, lng } = results[0].geometry.location;
            L.marker([lat(), lng()]).addTo(map).bindPopup(bank.branch_name_he);
          } else {
            console.error("Error geocoding address", status);
          }
        });
      });
    })
    .catch(error => {
      console.error('Error fetching bank locations', error);
    });
    
    return () => {
      map.remove();
    };
  }, []);

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
      <div ref={mapRef} style={{ height: "calc(100vh - 56px)" }} />
      {banks.length > 0 && (
        <div style={{ position: "absolute", top: 10, left: 10, backgroundColor: "white", padding: 10 }}>
          <h3>Bank Locations</h3>
          <ul>
            {banks.map(bank => (
              <li key={bank._id}>{bank.branch_name_he}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}

export default MapPage;
