import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

function MapPage() {
  const mapRef = useRef(null);

  useEffect(() => {

    const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([51.5, -0.09]).addTo(map).bindPopup("Hello, world!").openPopup();
  }, []);

  return <div ref={mapRef} style={{ height: "100vh" }} />;
}

export default MapPage;