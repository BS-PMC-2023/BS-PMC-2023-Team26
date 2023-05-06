

    import React, { useState } from 'react';
    import axios from 'axios';
    
    function cord() {
      const [address, setAddress] = useState('');
      const [coordinates, setCoordinates] = useState(null);
    
      const geocodeAddress = async (address) => {
        try {
          const response = await axios.get('https://nominatim.openstreetmap.org/search', {
            params: {
              q: address,
              format: 'json',
              limit: 1,
            },
          });
    
          if (response.data.length > 0) {
            const { lat, lon } = response.data[0];
            setCoordinates({ lat, lon });
          } else {
            setCoordinates(null);
          }
        } catch (error) {
          console.error('Geocoding failed:', error);
          setCoordinates(null);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        geocodeAddress(address);
      };
    
      return (
        <div className="App">
          <h1>Geocoding with Nominatim API</h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button type="submit">Geocode Address</button>
          </form>
          {coordinates && (
            <div>
              <p>
                Latitude: {coordinates.lat}, Longitude: {coordinates.lon}
              </p>
            </div>
          )}
        </div>
      );
    }
  export default cord;

