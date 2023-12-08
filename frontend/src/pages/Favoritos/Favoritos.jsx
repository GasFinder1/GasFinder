import styles from "./Favoritos.module.css";
import Navbar from "../../components/NavBar/NavBar";
import { AiFillStar } from "react-icons/ai";
import CardPosto from "../../components/CardPosto/CardPosto";
import { useEffect, useState, useContext } from "react";
import { useFavoriteContext } from "../../context/Favorites";
import { ControlContext } from "../../context/ControlContext";
import api from "../../api";

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

function Favoritos() {
  const { favorite } = useFavoriteContext();
  const [dataFavorites, setDataFavorites] = useState("");
  const { control } = useContext(ControlContext);
console.log(control)

  const token = localStorage.getItem("token");

  async function getGssFavorites(token) {
    try {
      const response = await api.get("/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      setDataFavorites(response.data);
      console.log("FAVORITOS: ", response);
    } catch (err) {
      console.log("Não foi posssível realizar a requisição: ", err);
    }
  }

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
      case "branca":
        return padrao2;
      // break;
      case "shell":
        return shell;
      default:
        return padrao;
    }
  };

  useEffect(() => {
    getGssFavorites(token);
  }, []);

  useEffect(() => {
     getGssFavorites(token);
  }, [control]);

  return (
    <section className={styles.containerFavoritos}>
      <Navbar />
      <div className={styles.mainFavoritos}>
        <div className={styles.title}>
          <span>
            <AiFillStar />
          </span>
          <h1>Postos Favoritos</h1>
        </div>
        <div className={styles.cardsContainer}>
          {!dataFavorites ? (
            <h2 className={styles.textEmptyData}>
              Nenhum posto está favoritado.
            </h2>
          ) : (
            dataFavorites.map((item, i) => (
              <CardPosto
                key={i}
                idPosto={dataFavorites[i].place_ID}
                nomePosto={dataFavorites[i]?.nome_posto}
                url={getFlagGss(dataFavorites[i]?.bandeira)}
                endereco={`${dataFavorites[i]?.endereco}, ${dataFavorites[i]?.numero}`}
                origem={"etec de embu"}
                destino={`${dataFavorites[i]?.municipio}, ${dataFavorites[i]?.estado} ${dataFavorites[i]?.endereco}, ${dataFavorites[i]?.numero}.`}
                precoGasolina={dataFavorites[i]?.produtos[0]?.valor?.toFixed(2)}
                precoEtanol={dataFavorites[i]?.produtos[1]?.valor?.toFixed(2)}
                precoDiesel={dataFavorites[i]?.produtos[2]?.valor?.toFixed(2)}
                favorito={false}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}

export default Favoritos;
