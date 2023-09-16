import "./Navbar.css";
import { PiMagnifyingGlassDuotone } from "react-icons/pi";
import { MdOutlineExitToApp } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import Logo from "../../img/mainLogo.png";
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <section className="mainNavbar">
      <div className="logoAndText">
        <img src={Logo} alt="logo" />
        <h1>Gas Finder</h1>
      </div>

      <div className="linksAndInput">
        <ul>
          <li>Home</li>
          <li>Favoritos</li>
          <li>Sobre</li>
        </ul>

        <div className="inputAndSearch">
          <input
            type="text"
            placeholder="Buscar..."
            name="buscarPosto"
            className="inputNav"
          />
          <span className="lupaIcon">
            <PiMagnifyingGlassDuotone />
          </span>
        </div>
      </div>

      <div className="exitAndProfile">
        <Link to='/login' className="exitIcon">
          <MdOutlineExitToApp  />
        </Link>
        <Link to='/cadastro' className="profileIcon">
          <CgProfile/>
        </Link>
      </div>
    </section>
  );
};

export default NavBar;
