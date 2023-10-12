import "./Navbar.css";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { MdOutlineExitToApp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Logo from "../../img/mainLogo.png";
import { Link } from "react-router-dom";
import BotaoUsuario from "../BotaoUsuario/BotaoUsuario";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const navigate = useNavigate()
  return (
    <section className="mainNavbar">
      <div className="logoAndText">
        <img src={Logo} alt="logo" onClick={() => navigate('/')}/>
        <h1>Gas Finder</h1>
      </div>

      <div className="inputSearch">
        <input
          type="search"
          placeholder="Buscar..."
          id="searchInput"
          name="buscarPosto"
          className="inputNav"
        />
        <span className="lupaIcon">
          <PiMagnifyingGlassDuotone />
        </span>
      </div>
      <div className="btnUser">
        <BotaoUsuario />
      </div>
    </section>
  );
};

export default NavBar;
