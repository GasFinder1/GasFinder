import styles from "./Favoritos.module.css";
import Navbar from '../../components/NavBar/NavBar'
import {AiFillStar} from 'react-icons/ai'

function Favoritos() {
    return (
        <section className={styles.containerFavoritos}>
            <Navbar/>
            <div className={styles.mainFavoritos}>
                <div className={styles.title}><span><AiFillStar/></span><h1>Postos Favoritos</h1></div>
            </div>
        </section>
    )
};

export default Favoritos;
