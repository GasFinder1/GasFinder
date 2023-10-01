import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

const containerStyle = {
  width: '100%',
  height: '100vh'
};

function MapContainer() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey,
  });

  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [clickedLocationAddress, setClickedLocationAddress] = useState('');

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

  const onLoad = useCallback(function callback(map) {
    if (currentLocation) {
      const bounds = new window.google.maps.LatLngBounds(currentLocation);
      map.fitBounds(bounds);
    }

    setMap(map);
  }, [currentLocation]);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  // Função para lidar com o evento de clique no mapa
  const handleMapClick = useCallback(
    (event) => {
      const clickedLat = event.latLng.lat();
      const clickedLng = event.latLng.lng();

      console.log('Latitude:', clickedLat);
      console.log('Longitude:', clickedLng);

      // Atualize o estado para exibir o marcador no local clicado
      setClickedLocation({ lat: clickedLat, lng: clickedLng });

      // Chame a função para buscar o endereço
      getReverseGeocode(clickedLat, clickedLng);
    },
    []
  );

  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      if (response.data.status === 'OK') {
        const address = response.data.results[0].formatted_address;
        console.log('Endereço:', address);
        setClickedLocationAddress(address);
      } else {
        console.error('Erro ao buscar o endereço');
      }
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
    }
  };

  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentLocation}
        zoom={16} // Ajuste o zoom conforme necessário
        onLoad={onLoad}
        onUnmount={onUnmount}
        onClick={handleMapClick} // Adicione o evento de clique aqui
      >
        {currentLocation && (
          <Marker
            position={currentLocation}
            title="Sua Localização Atual"
            animation={window.google.maps.Animation.DROP}
          />
        )}

        {clickedLocation && (
          <Marker
            position={clickedLocation}
            title="Local Clicado"
            animation={window.google.maps.Animation.DROP}
          />
        )}
      </GoogleMap>
      {clickedLocationAddress && (
        <p>Endereço do Local Clicado: {clickedLocationAddress}</p>
      )}
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
