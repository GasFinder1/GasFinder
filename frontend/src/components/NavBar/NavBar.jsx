import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { useNavigate }              from "react-router-dom";
import "./Navbar.css";
import Logo from "../../img/mainLogo.png";
import BotaoUsuario from "../BotaoUsuario/BotaoUsuario";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from "@react-google-maps/api";
import React, { useState, useEffect, useCallback, useRef } from "react";
import axios from "axios";
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
// import MapContainer from "../MapContainer/MapContainer"; 

const NavBar = () => {
  const inputRef = useRef();

  function handleAdress(e) {
    e.preventDefault();
    console.log(inputRef.current.value);
  }

  const navigate = useNavigate();
  return (
    <section className="mainNavbar">
      <div className="logoAndText">
        <img src={Logo} alt="logo" onClick={() => navigate("/")} />
        <h1>Gas Finder</h1>
      </div>

      {/* <div className="inputSearch">
        <form onSubmit={handleAdress}>
           <Autocomplete className="divAutocomplete"> 
             <input
              type="search"
              placeholder="Buscar..."
              id="searchInput"
              name="buscarPosto"
              className="inputNav"
              ref={inputRef}
            />
           </Autocomplete>
          <button type="submit" className="lupaIcon">
            <PiMagnifyingGlassDuotone />
          </button>
        </form>
      </div> */}
      <div className="btnUser" id="btnUser">
        <BotaoUsuario />
      </div> *
    </section>
  );
};

export default NavBar;
