import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsArrowLeftShort } from "react-icons/bs";
import {
  AiOutlineHome,
  AiOutlineStar,
  AiOutlineUser,
  AiOutlineExclamationCircle,
  AiOutlineMail,
} from "react-icons/ai";
import { RxExit } from "react-icons/rx";
import { BiCalculator } from "react-icons/bi";
import "./BotaoUsuario.css";

function BotaoUsuario() {
  const [barraLateralAberta, setBarraLateralAberta] = useState(false);
  const barraLateralRef = useRef(null);
  const [login, setLogin] = useState(false);
  let localName = null
  const [nameLocal, setNameLocal] = useState('')

  useEffect(() => {
    let localToken = localStorage.getItem("token");
    let localName = localStorage.getItem("name_user");

    if (localToken != null) {
      setLogin(true);
      setNameLocal(localName);
    } else {
      setLogin(false);
      setNameLocal('');
    }
  }, []);

  const toggleBarraLateral = () => {
    setBarraLateralAberta(!barraLateralAberta);
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (
        barraLateralRef.current &&
        !barraLateralRef.current.contains(event.target)
      ) {
        setBarraLateralAberta(false);
      }
    }

    if (barraLateralAberta) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [barraLateralAberta]);

  return (
    <div className="div-botao-usuario">
      <button onClick={toggleBarraLateral}>
        <GiHamburgerMenu size={32} className="hamburguer-icon" />
      </button>

      <div
        ref={barraLateralRef}
        className={`barra-lateral ${barraLateralAberta ? "aberta" : ""}`}
      >
        <div className="cabecalho-barra-lateral">
          <BsArrowLeftShort
            size={32}
            className="arrow-icon-svg"
            onClick={() => setBarraLateralAberta(!barraLateralAberta)}
          />
        </div>

        {!login ? (
          <div className="containerOptions">
            <Link to="/login" className="options">
              Login
            </Link>
            <Link to="/cadastro" className="options">
              Cadastrar
            </Link>
            <Link to="/sobre" className="options">
              <span>Sobre-Nós</span>{" "}
              <span>
                <AiOutlineExclamationCircle />
              </span>
            </Link>
            <Link to="/suporte" className="options">
              <span>Suporte</span>{" "}
              <span>
                <AiOutlineMail />
              </span>
            </Link>
          </div>
        ) : (
          <div className="containerOptions">
            <p className="paragraphWelcome"><span>Bem-vindo(a)</span>{nameLocal ? `, ${nameLocal}` : ''}</p>
            <Link to="/" className="options">
              <span>Home</span>{" "}
              <span>
                <AiOutlineHome />
              </span>
            </Link>
            <Link to="/perfil" className="options">
              <span>Perfil</span>{" "}
              <span>
                <AiOutlineUser />
              </span>
            </Link>
            <Link to="/favoritos" className="options">
              <span>Favoritos</span>{" "}
              <span>
                <AiOutlineStar />
              </span>
            </Link>
            <Link to="/calcRend" className="options">
              <span>Etanol x Gasolina</span>{" "}
              <span>
                <BiCalculator />
              </span>
            </Link>
            <Link to="/sobre" className="options">
              <span>Sobre-Nós</span>{" "}
              <span>
                <AiOutlineExclamationCircle />
              </span>
            </Link>
            <Link to="/suporte" className="options">
              <span>Suporte</span>{" "}
              <span>
                <AiOutlineMail />
              </span>
            </Link>
            <Link to="/" className="options logout" onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('name_user')
              setLogin(false)
              }}>
              <span >Sair</span>
              <span>
                <RxExit />
              </span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BotaoUsuario;
