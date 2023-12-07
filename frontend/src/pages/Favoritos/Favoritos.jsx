import styles from "./Favoritos.module.css";
import Navbar from "../../components/NavBar/NavBar";
import { AiFillStar } from "react-icons/ai";
import CardPosto from "../../components/CardPosto/CardPosto";
import { useEffect, useState } from "react";
import { useFavoriteContext } from "../../context/Favorites";
import api from "../../api";

function Favoritos() {
  const { favorite } = useFavoriteContext();

  const token = localStorage.getItem("token");

  async function getGssFavorites(token) {
    try {
      const response = await api.get("/favorite", {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      console.log("FAVORITOS: ", response)
    } catch (err) {
      console.log("Não foi posssível realizar a requisição: ", err);
    }
  }

  useEffect(() => {
    getGssFavorites(token);
  }, []);

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
          {favorite.map((fav) => (
            <CardPosto
              key={fav.id} // precisa ter uma chave única para cada card
              id={fav.id}
              nomePosto={fav.nomePosto}
              url={fav.url}
              distancia={fav.distancia}
              precoGasolina={fav.precoGasolina}
              precoEtanol={fav.precoEtanol}
              precoDiesel={fav.precoDiesel}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Favoritos;
