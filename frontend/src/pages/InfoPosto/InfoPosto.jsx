import React, { useEffect, useState } from "react";
import NavBar from "../../components/NavBar/NavBar";
import styles from "./InfoPosto.module.css";
import { BiSolidMap, BiSolidPencil } from "react-icons/bi";
import InputSugerirPreco from "../../components/InputSugerirPreco/InputSugerirPreco";
import { useParams } from "react-router-dom";
import {BsArrowLeftShort} from 'react-icons/bs'
import {useNavigate} from 'react-router-dom'
import api from "../../api";

function InfoPosto(props) {
  const navigate = useNavigate();
  const params = useParams();

  const { postoId } = params;
  const [exibirPrecosANP, setExibirPrecosANP] = useState(false);
  const [mostrarDivSecundaria, setMostrarDivSecundaria] = useState(false);
  const [details, setDetails] = useState([])

  async function getGssDetails(postoId) {
    const data = {
      placeID: postoId
    }
    try {
      const response = await api.get("/station", {params: data});
      setDetails(response.data[0])
    } catch (err) {
      console.log(err)
    }
  }

  console.log('aqui', details)

  useEffect(() => {
    getGssDetails(postoId);
  }, [postoId]);

  const precos = {
    Etanol: 4.39,
    GasolinaC: 3.39,
    GasolinaADT: 5.39,
    DieselS10: 3.39,
    DieselS5: 6.39,
    GNV: 3.39,
  };

  const precosSugestao = {
    Etanol: 3.5,
    GasolinaC: 3.55,
    GasolinaADT: 3.6,
    DieselS10: 3.45,
    DieselS5: 3.4,
    GNV: 3.3,
  };

  // const enderecoPosto =
  //   "Rod. Régis Bittencourt, 59 - Jardim Sadie, Embu das Artes - SP, 06803-000";

  const handleSwitchChange = () => {
    setExibirPrecosANP(!exibirPrecosANP);
  };

  const handleSugerirPrecoClick = () => {
    setMostrarDivSecundaria(!mostrarDivSecundaria);
  };

  const PrecoCard = ({ titulo, preco }) => (
    <div className={styles.cardPreco}>
      <div className={`${styles.title} ${styles[titleToStyleMap[titulo]]}`}>
        <h3>{titulo}</h3>
      </div>
      <div className={styles.preco}>
        <h2>R$ {preco.toFixed(2)}</h2>
      </div>
    </div>
  );

  const titleToStyleMap = {
    Etanol: "titleEtanol",
    Gasolina: "titleGasolinaC",
    "Gasolina Aditivada": "titleGasolinaADT",
    DieselS10: "titleDieselS10",
    DieselS5: "titleDieselS5",
    GNV: "titleGNV",
  };

  return (
    <div className={styles.mainContainer}>
      <NavBar />
      <div className={styles.infoContainer}>
        <BsArrowLeftShort className={styles.arrowClose} onClick={() => navigate('/')}/>
        <div className={styles.DadosPosto}>
          <h2>{details.nome_posto}</h2>
          <div className={styles.endereco}>
            <BiSolidMap className={styles.iconePonteiro} />
            <h3>
              {`${details.endereco}, ${details.numero}`}
            </h3>
          </div>
        </div>
        <div className={styles.containerSecundario}>
          <div className={styles.avaliacaoContainer}>
            <h2>{details.avaliacaoGeral}4.3</h2>
            <div className={styles.estrelas}>☆☆☆☆☆</div>
            <div className={styles.cardAvaliacao}>
              <h4>Atendimento</h4>
              <div className={styles.estrelas}>☆☆☆☆☆</div>
            </div>
            <div className={styles.cardAvaliacao}>
              <h4>Qualidade Combustível</h4>
              <div className={styles.estrelas}>☆☆☆☆☆</div>
            </div>
            <div className={styles.cardAvaliacao}>
              <h4>Custo Benefício</h4>
              <div className={styles.estrelas}>☆☆☆☆☆</div>
            </div>
          </div>

          <div className={styles.mainContainerPrecos}>
            <div className={styles.precosContainer}>
              <div className={styles.switchPrice}>
                <h3>Tabela ANP</h3>
                <div className={styles.boxSwitch}>
                  <label className={styles.switch}>
                    <input
                      type="checkbox"
                      onChange={handleSwitchChange}
                      checked={exibirPrecosANP}
                    />
                    <span className={styles.slider}></span>
                  </label>
                </div>
                <h3>Média de sugestões</h3>
              </div>
             {!exibirPrecosANP ? (
               details.produtos && details.produtos.map((item, i) => (
                <PrecoCard
                key={i}
                titulo={details.produtos[i].nome_combustivel}
                preco={details.produtos[i].valor}
                />
              ))
             ) : (
               <>
              <PrecoCard
                titulo="GasolinaADT"
                preco={
                  exibirPrecosANP
                    ? precos.GasolinaADT
                    : precosSugestao.GasolinaADT
                }
              />
              <PrecoCard
                titulo="DieselS10"
                preco={
                  exibirPrecosANP ? precos.DieselS10 : precosSugestao.DieselS10
                }
              />
              <PrecoCard
                titulo="DieselS5"
                preco={
                  exibirPrecosANP ? precos.DieselS5 : precosSugestao.DieselS5
                }
              />
              <PrecoCard
                titulo="GNV"
                preco={exibirPrecosANP ? precos.GNV : precosSugestao.GNV}
              /> 
               </>
             )}

            </div>

            <div
              className={styles.divSugerirPreco}
              onClick={handleSugerirPrecoClick}
            >
              <h3>Sugerir Preço</h3>
              <BiSolidPencil className={styles.pencil} />
            </div>

            {mostrarDivSecundaria && <InputSugerirPreco />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default InfoPosto;
