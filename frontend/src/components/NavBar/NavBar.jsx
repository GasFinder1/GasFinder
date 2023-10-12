import "./Navbar.css";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { MdOutlineExitToApp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Logo from "../../img/mainLogo.png";
import { Link } from "react-router-dom";
import BotaoUsuario from "../BotaoUsuario/BotaoUsuario";

const NavBar = () => {
  return (
    <section className="mainNavbar">
      <div className="logoAndText">
        <img src={Logo} alt="logo" />
        <h1>Gas Finder</h1>
      </div>

      <div className="linksAndInput">
        <div className="inputAndSearch">
          <input type="search" placeholder="Buscar..." name="buscarPosto" className="inputNav"/>
          <span className="lupaIcon">
            <PiMagnifyingGlassDuotone />
          </span>
        </div>
      </div>
        <BotaoUsuario/>
    </section>
  );
};

export default NavBar;
