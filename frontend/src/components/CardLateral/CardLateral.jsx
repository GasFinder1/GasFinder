import styles from "./CardLateral.module.css"
import LogoShell from "../../img/ipiranga.png"

const CardLateral = () => {
  return (
    <section className={styles.mainCard}>
        <h2 className={styles.titleCardLateral}>Postos próximos</h2>
        <div className={styles.cardPosto}>
            <div className={styles.logoPosto}>
               <img src={LogoShell} alt="" />
               <p>Shell Brasil</p>
            </div>
            <div className={styles.divList}>
            <ul className={styles.listCard}>
                <li>E R$5,19</li>
                <li>E R$3,49</li>
                <li>E R$4,11</li>
            </ul>
            </div>
        </div>
    </section>
  )
}

export default CardLateral