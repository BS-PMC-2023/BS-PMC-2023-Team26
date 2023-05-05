import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MapPage() {
  const mapRef = useRef(null);

  useEffect(() => {
    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);
  
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);
  
    let marker;
  
    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          if (!marker) {
            marker = L.marker([latitude, longitude]).addTo(map);
          } else {
            marker.setLatLng([latitude, longitude]);
          }
          map.setView([latitude, longitude], 13);
          marker.bindPopup("You are here!").openPopup();
        },
        (error) => {
          console.error("Error getting current position", error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  
    return () => {
      if (marker) {
        marker.remove();
      }
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
    </>
  );
}

export default MapPage;
