import "./CardPosto.css";
import { BiMapPin } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { AiOutlineInfoCircle, AiOutlineStar, AiFillStar } from "react-icons/ai";
import axios from 'axios'
const CardPosto = (props) => {
  const estiloGasolina = {
    backgroundColor: "#F8333C",
    borderTopRightRadius: "12px",
  };
  const estiloEtanol = {
    backgroundColor: "#44AF69",
  };
  const estiloDiesel = {
    backgroundColor: "#FCAB10",
  };

  const [iconType, setIconType] = useState("outline");

  const handleIconToggle = () => {
    setIconType(iconType === "outline" ? "filled" : "outline");
  };

  const navigate = useNavigate();

  const data = {
    latitude: -23.644313612253786,
    longitude: -46.89789512355279,
  };

  async function getPriceGas(req, res) {
    try {
        const response = await axios.post("/station", data);
        console.log(response)
    } catch(err) {
        console.log(err)
    }  }

  useEffect(() => {
    getPriceGas()
  }, []);

  return (
    <div className="div-ajuste">
      <div className="main-container-cardPosto">
        <div className="container-dados-posto">
          <div className="container-bandeira-e-distancia">
            <div className="div-bandeira">
              <img src={props.url} alt="Bandeira do posto" />
              <h3>{props.nomePosto}</h3>
            </div>

            <div className="div-distancia">
              <BiMapPin size={28} color="#467BEC" />
              <p> A {props.distancia} metros</p>
            </div>
            <div className="div-favoritar-posto">
              <i onClick={handleIconToggle} className="icon-favoritar-posto">
                {iconType === "outline" ? <AiOutlineStar /> : <AiFillStar />}
              </i>
              <p>Favoritar posto</p>
            </div>
          </div>
          <div className="container-valores-postos">
            <div style={estiloGasolina} className="div-combustiveis">
              <h3>G</h3>
              <p>R$ {props.precoGasolina}</p>
            </div>
            <div style={estiloEtanol} className="div-combustiveis">
              <h3>E</h3>
              <p>R$ {props.precoEtanol}</p>
            </div>
            <div style={estiloDiesel} className="div-combustiveis">
              <h3>D</h3>
              <p>R$ {props.precoDiesel}</p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="maisInfo-container"
        onClick={() => navigate("/infoPosto")}
      >
        <AiOutlineInfoCircle className="icon-info-posto" />
        Mais Informações
      </div>
    </div>
  );
};

export default CardPosto;

/*PropsUtilizaveis =
props.nomePosto = Adiciona o nome do posto
props.url = adicionar url da imagem da bandeira
props.distancia = adicionar valor da distancia do posto 
props.precoGasolina / props.precoEtanol / props.precoDiesel  = adicionar valor do preço do tipo do combustivel 
*/
