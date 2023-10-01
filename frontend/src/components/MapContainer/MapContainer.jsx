import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import "./MapContainer.css"

const containerStyle = {
  width: '100%',
  height: '100vh'
};

function MapContainer() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapsId = process.env.REACT_APP_MAP_ID;

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
        onClick={handleMapClick}
        options={{
          styles: [[
            {
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#242f3e"
                }
              ]
            },
            {
              "featureType": "administrative",
              "elementType": "geometry",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "administrative.locality",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "poi",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#263c3f"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#6b9a76"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#38414e"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#212a37"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.icon",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "road",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#9ca5b3"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#746855"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.stroke",
              "stylers": [
                {
                  "color": "#1f2835"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#f3d19c"
                }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                {
                  "visibility": "off"
                }
              ]
            },
            {
              "featureType": "transit",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#2f3948"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#d59563"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry",
              "stylers": [
                {
                  "color": "#17263c"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#515c6d"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.stroke",
              "stylers": [
                {
                  "color": "#17263c"
                }
              ]
            }
          ]],
          mapId: mapsId
        }}
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
