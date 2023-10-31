import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  DirectionsRenderer,
} from "@react-google-maps/api";
import { Autocomplete } from "@react-google-maps/api";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
import "./MapContainer.css";
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  HStack,
  IconButton,
  Input,
  SkeletonText,
  Text,
} from "@chakra-ui/react";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { FaLocationArrow, FaTimes } from "react-icons/fa";
import { FaRoute } from "react-icons/fa";
import { BiCurrentLocation } from "react-icons/bi";

const containerStyle = {
  width: "100%",
  height: "100vh",
};

function MapContainer() {
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const mapsId = process.env.REACT_APP_MAP_ID;

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: apiKey,
    libraries: ["places"],
  });

  const [map, setMap] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [clickedLocation, setClickedLocation] = useState(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [distance, setDistance] = useState("");
  const [duration, setDuration] = useState("");
  const [searchBox, setSearchBox] = useState("");

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

  const onLoad = useCallback(
    function callback(map) {
      if (currentLocation) {
        const bounds = new window.google.maps.LatLngBounds(currentLocation);
        map.fitBounds(bounds);
      }

      setMap(map);
    },
    [currentLocation]
  );

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const handleMapClick = useCallback((event) => {
    const clickedLat = event.latLng.lat();
    const clickedLng = event.latLng.lng();

    getReverseGeocode(clickedLat, clickedLng);
  }, []);

  const getReverseGeocode = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`
      );

      if (response.data.status === "OK") {
        const street = response.data.results[1].address_components[1].long_name;
        const number = response.data.results[1].address_components[0].long_name;
        const neighborhood =
          response.data.results[1].address_components[2].long_name;
        const city = response.data.results[1].address_components[3].long_name;
        const state = response.data.results[1].address_components[4].short_name;
        const cep = response.data.results[1].address_components[6].long_name;

        const placeId = response.data.results[1].place_id;
        console.log("Rua: ", street);
        console.log("Número: ", number);
        console.log("Bairro: ", neighborhood);
        console.log("Cidade: ", city);
        console.log("Estado: ", state);
        console.log("Cep: ", cep);
        console.log("Id do local:", placeId);
        // console.log(response.data.results[1].address_components);
      } else {
        console.error("Erro ao buscar o endereço");
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  };

  /** @type React.MutableRefObject<HTMLInputElement> */
  const originRef = useRef();
  /** @type React.MutableRefObject<HTMLInputElement> */
  const destiantionRef = useRef();

  async function calculateRoute() {
    if (originRef.current.value === "" || destiantionRef.current.value === "") {
      return;
    }
    // eslint-disable-next-line no-undef
    const directionsService = new window.google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destiantionRef.current.value,
      // eslint-disable-next-line no-undef
      travelMode: window.google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0].legs[0].distance.text);
    setDuration(results.routes[0].legs[0].duration.text);
  }

  function clearRoute() {
    setDirectionsResponse(null);
    setDistance("");
    setDuration("");
    originRef.current.value = "";
    destiantionRef.current.value = "";
  }

  async function actualLocation(loc) {
    const { lat, lng } = loc;
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`
      );

      if (response.data.status === "OK") {
        const address = response.data.results[0].formatted_address;
        originRef.current.value = address;
      } else {
        console.error("Erro ao buscar o endereço");
      }
    } catch (error) {
      console.error("Erro ao buscar o endereço:", error);
    }
  }

  async function centeredMap(address) {
    try {
      const response = await axios.get(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${apiKey}`
      );
      map.panTo(response.data.results[0].geometry.location);
      map.setZoom(20);
      setSearchBox("")
    
    } catch (error) {
      alert("Erro ao buscar o endereço:");
    }
  }

  return isLoaded ? (
    <div className="containerMap">
      <div className="inputSearchBox">
        <div>
          <Autocomplete className="divAutocomplete">
            <input
              type="search"
              placeholder="Buscar..."
              id="searchInput"
              name="buscarPosto"
              className="inputNav"
              onChange={(e) => setSearchBox(e.target.value)}
            />
          </Autocomplete>
          <button
            className="lupaIcon"
            aria-label="center back"
            onClick={() => {
              centeredMap(searchBox);
            }}
          >
            <PiMagnifyingGlassDuotone />
          </button>
        </div>
      </div>
      <Flex
        position="relative"
        flexDirection="column"
        alignItems="center"
        h="100vh"
        w="100vw"
      >
        <Box position="absolute" left={0} top={0} h="100%" w="100%">
          {/* Google Map Box */}
          <GoogleMap
            id="map"
            className="mapContainer"
            mapContainerStyle={containerStyle}
            center={currentLocation}
            zoom={16} // Ajuste o zoom conforme necessário
            onUnmount={onUnmount}
            onClick={handleMapClick}
            options={{
              zoomControl: false,
              streetViewControl: false,
              mapTypeControl: false,
              fullscreenControl: false,
              styles: [
                [
                  {
                    elementType: "geometry",
                    stylers: [
                      {
                        color: "#242f3e",
                      },
                    ],
                  },
                  {
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#746855",
                      },
                    ],
                  },
                  {
                    elementType: "labels.text.stroke",
                    stylers: [
                      {
                        color: "#242f3e",
                      },
                    ],
                  },
                  {
                    featureType: "administrative",
                    elementType: "geometry",
                    stylers: [
                      {
                        visibility: "off",
                      },
                    ],
                  },
                  {
                    featureType: "administrative.locality",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#d59563",
                      },
                    ],
                  },
                  {
                    featureType: "poi",
                    stylers: [
                      {
                        visibility: "off",
                      },
                    ],
                  },
                  {
                    featureType: "poi",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#d59563",
                      },
                    ],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "geometry",
                    stylers: [
                      {
                        color: "#263c3f",
                      },
                    ],
                  },
                  {
                    featureType: "poi.park",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#6b9a76",
                      },
                    ],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry",
                    stylers: [
                      {
                        color: "#38414e",
                      },
                    ],
                  },
                  {
                    featureType: "road",
                    elementType: "geometry.stroke",
                    stylers: [
                      {
                        color: "#212a37",
                      },
                    ],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.icon",
                    stylers: [
                      {
                        visibility: "off",
                      },
                    ],
                  },
                  {
                    featureType: "road",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#9ca5b3",
                      },
                    ],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry",
                    stylers: [
                      {
                        color: "#746855",
                      },
                    ],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "geometry.stroke",
                    stylers: [
                      {
                        color: "#1f2835",
                      },
                    ],
                  },
                  {
                    featureType: "road.highway",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#f3d19c",
                      },
                    ],
                  },
                  {
                    featureType: "transit",
                    stylers: [
                      {
                        visibility: "off",
                      },
                    ],
                  },
                  {
                    featureType: "transit",
                    elementType: "geometry",
                    stylers: [
                      {
                        color: "#2f3948",
                      },
                    ],
                  },
                  {
                    featureType: "transit.station",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#d59563",
                      },
                    ],
                  },
                  {
                    featureType: "water",
                    elementType: "geometry",
                    stylers: [
                      {
                        color: "#17263c",
                      },
                    ],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.fill",
                    stylers: [
                      {
                        color: "#515c6d",
                      },
                    ],
                  },
                  {
                    featureType: "water",
                    elementType: "labels.text.stroke",
                    stylers: [
                      {
                        color: "#17263c",
                      },
                    ],
                  },
                ],
              ],
              maxZoom: 18,
              mapId: mapsId,
            }}
            onLoad={(map) => setMap(map)}
          >
            {directionsResponse && (
              <DirectionsRenderer directions={directionsResponse} />
            )}
            <Marker position={currentLocation} />
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
        </Box>
        <Box
          p={4}
          className="containerCardRoutes"
          borderRadius="lg"
          m={4}
          bgColor="white"
          position="fixed"
          left="10px"
          top="150px"
          shadow="base"
          minW="container.md"
          zIndex="1"
        >
          <div className="inputsRoutes">
            <div>
              <Autocomplete>
                <Input type="text" placeholder="Partida" ref={originRef} />
              </Autocomplete>
            </div>
            <div>
              <Autocomplete>
                <Input type="text" placeholder="Destino" ref={destiantionRef} />
              </Autocomplete>
            </div>

            <ButtonGroup>
              <Button
                className="btnCalcRoute"
                type="submit"
                onClick={calculateRoute}
              >
                <FaRoute className="iconRoute" title="Calcular Rota" />
              </Button>
              <IconButton
                title="Limpar"
                aria-label="center back"
                icon={<FaTimes />}
                className="btnClearRoute"
                onClick={clearRoute}
              />
            </ButtonGroup>
          </div>
          <div className="infoRoutes">
            <Text>Distância: {distance} </Text>
            <Text>Tempo: {duration} </Text>
            <IconButton
              aria-label="center back"
              icon={<FaLocationArrow />}
              title="Voltar ao meu local atual"
              isRound
              className="btnRedirectUser"
              onClick={() => {
                map.panTo(currentLocation);
                map.setZoom(15);
              }}
            />
          </div>
          <div className="infoRoutes">
            <IconButton
              title="Minha localização atual"
              aria-label="center back"
              icon={<BiCurrentLocation />}
              isRound
              className="btnLocationUser"
              onClick={() => {
                actualLocation(currentLocation);
              }}
            />
          </div>
        </Box>
      </Flex>
    </div>
  ) : (
    <></>
  );
}

export default React.memo(MapContainer);
