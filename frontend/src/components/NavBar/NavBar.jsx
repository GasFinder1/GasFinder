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
          <li><a href="/home">Home</a></li>
          <li><a href="/favoritos">Favoritos</a></li>
          <li><a href='/sobre'>Sobre</a></li>
        </ul>

        <div className="inputAndSearch">
          <input type="search" placeholder="Buscar..." name="buscarPosto" className="inputNav"/>
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
