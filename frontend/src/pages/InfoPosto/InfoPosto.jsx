import NavBar from "../../components/NavBar/NavBar"
import styles from "./InfoPosto.module.css"
import { BiSolidMap, BiSolidPencil } from "react-icons/bi"
import { useState } from "react"

function InfoPosto(props) {

    const enderecoPosto = "Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000"



    return (
        <div className={styles.mainContainer}>
            <NavBar />
            <div className={styles.infoContainer}>
                <div className={styles.DadosPosto}>
                    <h2>{props.nomePosto}Posto Cancun</h2>
                    <div className={styles.endereco}>
                        <BiSolidMap className={styles.iconePonteiro} />
                        <h3>{props.enderecoPosto}Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000</h3>
                    </div>
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

                    {/* CARDS PREÇO */}
                    <div className={styles.mainContainerPrecos}>
                        <div className={styles.precosContainer}>
                            <div className={styles.switchPrice}>
                                <h3>Tabela ANP</h3>
                                <div className={styles.boxSwitch}>
                                    <label className={styles.switch}>
                                        <input type="checkbox" />
                                        <span className={styles.slider}></span>
                                    </label>
                                </div>
                                <h3>Média de sugestões</h3>
                            </div>
                            <div className={styles.cardPreco}>
                                <div className={`${styles.titleEtanol} ${styles.title}`}>
                                    <h3>Etanol</h3>
                                </div>
                                <div className={styles.preco}>
                                    <h2>R$ {props.precoEtanol} 3,39</h2>
                                </div>
                            </div>

                            <div className={styles.cardPreco}>
                                <div className={`${styles.titleGasolinaC} ${styles.title}`}>
                                    <h3>Gasolina Comum</h3>
                                </div>
                                <div className={styles.preco}>
                                    <h2>R$ {props.precoGasolinaC} 3,39</h2>
                                </div>
                            </div>

                            <div className={styles.cardPreco}>
                                <div className={`${styles.titleGasolinaADT} ${styles.title}`}>
                                    <h3>Gasolina Aditivada</h3>
                                </div>
                                <div className={styles.preco}>
                                    <h2>R$ {props.precoGasolinaADT} 3,39</h2>
                                </div>
                            </div>

                            <div className={styles.cardPreco}>
                                <div className={`${styles.titleDieselS10} ${styles.title}`}>
                                    <h3>Diesel S10</h3>
                                </div>
                                <div className={styles.preco}>
                                    <h2>R$ {props.precoDieselS10} 3,39</h2>
                                </div>
                            </div>

                            <div className={styles.cardPreco}>
                                <div className={`${styles.titleDieselS5} ${styles.title}`}>
                                    <h3>Diesel S500</h3>
                                </div>
                                <div className={styles.preco}>
                                    <h2>R$ {props.precoDieselS5} 3,39</h2>
                                </div>
                            </div>

                            <div className={styles.cardPreco}>
                                <div className={`${styles.titleGNV} ${styles.title}`}>
                                    <h3>GNV</h3>
                                </div>
                                <div className={styles.preco}>
                                    <h2>R$ {props.precoGNV} 3,39</h2>
                                </div>
                            </div>

                        </div>

                        <div className={styles.divSugerirPreco}>
                            <h3>Sugerir Preço</h3>
                            <BiSolidPencil className={styles.pencil} />
                        </div>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default InfoPosto