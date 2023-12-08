import "./CardLateral.css";
import CardPosto from "../CardPosto/CardPosto";
import { useState, useEffect, useContext, useLayoutEffect } from "react";
import { LocationContext } from "../../context/LocationContext";
import { DistanceContext } from "../../context/DistanceContext";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import FilterButton from "../FilterButton/FilterButton";
import api from "../../api";
import axios from "axios";

import ipiranga from "../../img/bandeiras/Ipiranga.png";
import ale from "../../img/bandeiras/alesat.png";
import atem from "../../img/bandeiras/atem.png";
import atlantica from "../../img/bandeiras/atlantica.png";
import charrua from "../../img/bandeiras/charrua.png";
import ciapetro from "../../img/bandeiras/ciapetro.png";
import dibrape from "../../img/bandeiras/dibrape.png";
import dmais from "../../img/bandeiras/dmais.png";
import estrada from "../../img/bandeiras/estrada.png";
import fan from "../../img/bandeiras/fan.png";
import federal from "../../img/bandeiras/federal.png";
import idaza from "../../img/bandeiras/idaza.png";
import larco from "../../img/bandeiras/larco.png";
import masut from "../../img/bandeiras/masut.png";
import maxsul from "../../img/bandeiras/maxsul.png";
import onpetro from "../../img/bandeiras/onpetro.png";
import padrao from "../../img/bandeiras/padrao2.png";
import padrao2 from "../../img/bandeiras/padrao.png";
import petrobahia from "../../img/bandeiras/petrobahia.png";
import petrobras from "../../img/bandeiras/petrobras.jpg";
import potencial from "../../img/bandeiras/potencial.png";
import petrox from "../../img/bandeiras/pretrox.png";
import raizen from "../../img/bandeiras/raizen.png";
import riobranco from "../../img/bandeiras/riobranco.png";
import rodoil from "../../img/bandeiras/rodoil.png";
import setta from "../../img/bandeiras/setta.png";
import simarelli from "../../img/bandeiras/simarelli.png";
import shell from "../../img/ipiranga.png";

const CardLateral = () => {
  const { distance } = useContext(DistanceContext);

  const [btnState, setBtnState] = useState(false);
  const [loader, setLoader] = useState(false);
  const { location } = useContext(LocationContext);
  // const [data, setData] = useState({});
  // console.log(location.lat)
  // console.log(location.lat)
  // console.log("Essa é a localização do usuário context: ", location.lng);

  let data = {
    latitude: !location.lat ? -23.641866162601666 : location.lat,
    longitude: !location.lng ? -46.83600825648072 : location.lng,
    // latitude: -23.641866162601666,
    // longitude: -46.83600825648072,
    distanceKm: distance,
  };

  useEffect(() => {
    console.log("localização atual: ", data);
    getPricesGss(data);
  }, [distance]);

  const [price, setPrice] = useState([]);

  async function getPricesGss(data) {
    try {
      setLoader(true);
      const response = await api.post("/station/all/", data);
      setPrice(response.data);
      console.log("Dados do banco: ", response.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
    }
  }

  const [distancia, setDistancia] = useState(null);

  const getFlagGss = (flag) => {
    switch (flag) {
      case "simarelli":
        return simarelli;
      // break;
      case "ipiranga":
        return ipiranga;
      // break;
      case "vibra":
        return petrobras;
      // break;
      case "alesat":
        return ale;
      // break;
      case "atem' s":
        return atem;
      // break;
      case "atlantica":
        return atlantica;
      // break;
      case "charrua":
        return charrua;
      // break;
      case "ciapetro":
        return ciapetro;
      // break;
      case "dibrape":
        return dibrape;
      // break;
      case "d`mais":
        return dmais;
      // break;
      case "estrada":
        return estrada;
      // break;
      case "fan":
        return fan;
      // break;
      case "federal":
        return federal;
      // break;
      case "idaza":
        return idaza;
      // break;
      case "larco":
        return larco;
      // break;
      case "masut":
        return masut;
      // break;
      case "maxsul":
        return maxsul;
      // break;
      case "onpetro":
        return onpetro;
      // break;
      case "petrobahia":
        return petrobahia;
      // break;
      case "potencial":
        return potencial;
      // break;
      case "petrox":
        return petrox;
      // break;
      case "raizen":
        return raizen;
      // break;
      case "rio branco":
        return riobranco;
      // break;
      case "rodoil":
        return rodoil;
      // break;
      case "setta":
        return setta;
      case "shell":
        return shell;
      // break;
      default:
        return padrao;
    }
  };

  // const calcularDistancia = async (origem, destino) => {
  //   try {
  //     const distance = await axios.get(
  //       `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(
  //         origem
  //       )}&destinations=${encodeURIComponent(destino)}&key=${
  //         process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  //       }`
  //     );
  //     console.log("tempo: ", distance.data.rows[0].elements[0].distance.text);

  //     setDistancia(distance?.data?.rows[0]?.elements[0]?.distance?.text);
  //     // return distance?.data?.rows[0]?.elements[0]?.distance?.text;
  //     setDistancia(null);
  //     return distancia;
  //   } catch (err) {
  //     console.log("erro :", err);
  //   }
  // };

  async function convertAdress(address) {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY};
      }`
    );
  }

  return (
    <section
      className={`main-container-CardLateral ${!btnState ? "" : "ocult"}`}
    >
      <div className="container-janela">
        {/* Aqui começa a janela */}
        <button
          onClick={() => setBtnState(!btnState)}
          className="btnActionCard"
        >
          {!btnState ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </button>
        <div className="containerBtnFiltrar-H2">
          <FilterButton />
          <h2>Postos Próximos</h2>
        </div>
        {loader ? (
          <div className="containerLoaderCard">
            <div className="custom-loader"></div>
          </div>
        ) : (
          <ul>
            {price &&
              price.map((item, i) => {
                // Favorite.map
                // calcularDistancia("Etec de embu", price[i]?.endereco);
                return (
                  // distancia && (
                  <CardPosto
                    key={"cardlateralpost" + i}
                    nomePosto={price[i]?.nome_posto}
                    endereco={`${price[i]?.endereco}, ${price[i]?.numero}.`}
                    url={getFlagGss(price[i]?.bandeira)}
                    origem={"etec de embu"}
                    destino={`${price[i]?.municipio}, ${price[i]?.estado} ${price[i]?.endereco}, ${price[i]?.numero}.`}
                    idPosto={price[i]?.place_ID}
                    // precoGasolina={price[i]?.produtos[0]?.valor?.toFixed(2)}
                    precoGasolina={price[i]?.produtos[i]?.nome_combustivel == "gasolina" ? price[i]?.produtos[1]?.valor?.toFixed(2) : price[i]?.produtos[0]?.valor?.toFixed(2)}
                    precoEtanol={price[i]?.produtos[i]?.nome_combustivel == 'etanol' ? price[i]?.produtos[i]?.valor?.toFixed(2) : price[i]?.produtos[1]?.valor?.toFixed(2)}
                    favorito={true}
                    precoDiesel={price[i]?.produtos[i]?.nome_combustivel == "diesel s10" ||  price[i]?.produtos[i].nome_combustivel == 'diesel s500' ? price[i]?.produtos[i]?.valor?.toFixed(2) : price[i]?.produtos[2]?.valor?.toFixed(2)}
                  />
                  // )
                );
              })}
          </ul>
        )}

        {/* <CardPosto
          nomePosto="Shell Brasil"
          endereco = "R. Solano Trindade"
          url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
          distancia={calcularDistancia('Etec de Embu', 'Avenida Elias Yasbek, 2345')}
          precoGasolina="5,19"
          precoEtanol="4,05"
          precoDiesel="5,40"
        /> */}
      </div>
    </section>
  );
};

export default CardLateral;
