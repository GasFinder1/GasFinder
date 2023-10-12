import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./BotaoUsuario.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { BsArrowLeftShort } from "react-icons/bs";
import {AiOutlineStar} from 'react-icons/ai'

function BotaoUsuario() {
  const [barraLateralAberta, setBarraLateralAberta] = useState(false);
  const barraLateralRef = useRef(null);
  const [login, setLogin] = useState(true);

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
              Sobre-nós
            </Link>
            <Link to="/suporte" className="options">
              Suporte
            </Link>
          </div>
        ) : (
          <div className="containerOptions">
            <p>Olá, user</p>

            <Link to="/" className="options">
              Home
            </Link>
            <Link to="/favoritos" className="options">
              <span>Favoritos</span> <span><AiOutlineStar/></span>
            </Link>
            <Link to="/perfil" className="options">
              Perfil
            </Link>
            <Link to="/sobre" className="options">
              Sobre-nós
            </Link>
            <Link to="/suporte" className="options">
              Suporte
            </Link>
            <Link to="/" className="options logout">
              Sair
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BotaoUsuario;
