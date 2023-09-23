import styles from "./CardLateral.module.css"
import LogoShell from "../../img/ipiranga.png"
import CardPosto from "../CardPosto/CardPosto"

const CardLateral = () => {
  return (
    <section className={styles.mainCard}>
        <h2 className={styles.titleCardLateral}>Postos próximos</h2>
        <div className={styles.cardPosto}>
            {/* <div className={styles.logoPosto}>
               <img src={LogoShell} alt="" />
               <p>Shell Brasil</p>
            </div>
            <div className={styles.divList}>
            <ul className={styles.listCard}>
                <li>E R$5,19</li>
                <li>E R$3,49</li>
                <li>E R$4,11</li>
            </ul>
            </div> */}
            <CardPosto
            url = "https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia = "100"
            precoGasolina = "5,19"
            precoEtanol = "4,05"
            precoDiesel = "5,40"
            />
            <CardPosto
            url = "https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia = "100"
            precoGasolina = "5,19"
            precoEtanol = "4,05"
            precoDiesel = "5,40"
            />
            <CardPosto
            url = "https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia = "100"
            precoGasolina = "5,19"
            precoEtanol = "4,05"
            precoDiesel = "5,40"
            />
        </div>
    </section>
  )
}

export default CardLateral