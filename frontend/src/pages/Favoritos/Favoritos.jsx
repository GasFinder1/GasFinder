import styles from "./Favoritos.module.css";
import Navbar from '../../components/NavBar/NavBar'
import { AiFillStar } from 'react-icons/ai'
import CardPosto from "../../components/CardPosto/CardPosto";
import { useFavoriteContext } from "../../context/Favorites";

function Favoritos() {
    const { favorite } = useFavoriteContext();

    console.log("Lista de favoritos:", favorite);

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