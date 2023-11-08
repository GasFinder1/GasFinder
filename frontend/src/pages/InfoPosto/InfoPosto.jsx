import NavBar from "../../components/NavBar/NavBar"
import styles from "./InfoPosto.module.css"
import { BiSolidMap } from "react-icons/bi"
import { useState } from "react"

function InfoPosto(props) {

    const enderecoPosto = "Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000"



    return (
        <div className={styles.mainContainer}>
            <NavBar />
            <div className={styles.infoContainer}>
                <h2>{props.nomePosto}Posto Cancun</h2>
                <div className={styles.endereco}>
                    <BiSolidMap className={styles.iconePonteiro} />
                    <h3>{props.enderecoPosto}Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000</h3>
                </div>
                <div className={styles.containerSecundario}>
                    <div className={styles.avaliacaoContainer}>
                        <h2>{props.avaliacaoGeral}4.3</h2>
                        <div className={styles.estrelas}>
                            ☆☆☆☆☆
                        </div>
                        <div className={styles.cardAvaliacao}>
                            <h4>Atendimento</h4>
                            <div className={styles.estrelas}>
                                ☆☆☆☆☆
                            </div>
                        </div>
                        <div className={styles.cardAvaliacao}>
                            <h4>Qualidade Combustível</h4>
                            <div className={styles.estrelas}>
                                ☆☆☆☆☆
                            </div>
                        </div>
                        <div className={styles.cardAvaliacao}>
                            <h4>Custo Benefício</h4>
                            <div className={styles.estrelas}>
                                ☆☆☆☆☆
                            </div>
                        </div>
                    </div>

                    <div className={styles.precosContainer}>
                        <p>preço</p>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default InfoPosto