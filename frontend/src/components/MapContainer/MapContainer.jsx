import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useEffect } from 'react';
import "./MapContainer.css"

const containerStyle = {
  width: '100%',
  height: '100vh',
};

function MapContainer() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error(error);
      }
    );
  }, []);

  const onLoad = React.useCallback(function callback(map) {
    if (currentLocation) {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);
    }

    setMap(map);
  }, [currentLocation]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={currentLocation}
      zoom={16} // Ajuste o zoom conforme necessário
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      {currentLocation && (
        <Marker
          position={currentLocation}
          title="Sua Localização Atual"
          animation={window.google.maps.Animation.DROP}
        />
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
