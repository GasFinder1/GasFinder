import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
  zIndex: 0
};

function App() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [mapZoom, setMapZoom] = useState(10); 
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
        setMapZoom(14); 
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  return (
    <LoadScript
    googleMapsApiKey={apiKey}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={mapZoom} 
      >
        {currentLocation && <Marker position={currentLocation} />}
      </GoogleMap>
    </LoadScript>
  );
}

export default App;
