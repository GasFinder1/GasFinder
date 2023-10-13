import "./Navbar.css";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { MdOutlineExitToApp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Logo from "../../img/mainLogo.png";
import { Link } from "react-router-dom";
import BotaoUsuario from "../BotaoUsuario/BotaoUsuario";
import { useNavigate } from "react-router-dom";
import { Autocomplete } from "@react-google-maps/api";
import { useRef } from "react";
import MapContainer from "../MapContainer/MapContainer";

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

      <div className="inputSearch">
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
      </div>
      <div className="btnUser" id="btnUser">
        <BotaoUsuario />
      </div>
    </section>
  );
};

export default NavBar;
