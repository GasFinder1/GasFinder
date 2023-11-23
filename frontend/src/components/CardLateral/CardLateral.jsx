import "./CardLateral.css";
import CardPosto from "../CardPosto/CardPosto";
import { useState, useEffect, useContext } from "react";
import { LocationContext } from "../../context/LocationContext";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from "react-icons/md";
import FilterButton from "../FilterButton/FilterButton";
import api from "../../api";

const CardLateral = () => {
  const [btnState, setBtnState] = useState(false);
  const [loader, setLoader] = useState(false);
  const {location} = useContext(LocationContext)
  // console.log(location.lat)
  // console.log(location.lat)
  console.log(location)

  const data = {
    latitude: -23.4898384,
    longitude: -46.8812675,
    distanceKm: 1,
  };

  const [price, setPrice] = useState([]);

  async function getPricesGss(data) {
    try {
      setLoader(true);
      const response = await api.post("/station/all/", data);
      console.log("response", response.data[0].nome_posto);
      setPrice(response.data);
      setLoader(false);
    } catch (err) {
      setLoader(false);
      console.log("false")
      console.log(err);
    }
  }

  console.log(loader)

  useEffect(() => {
    getPricesGss(data);
  }, []);
  return (
    <section
      className={`main-container-CardLateral ${!btnState ? "" : "ocult"}`}
    >
      <div className="container-janela">
        {/* Aqui começa a janela */}
        <button
          onClick={() => setBtnState(!btnState)}
          className="btnActionCard"
        >
          {!btnState ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}
        </button>
        <div className="containerBtnFiltrar-H2">
          <FilterButton />
          <h2>Postos Próximos</h2>
        </div>
        {loader ? (
          <div className="containerLoaderCard">
            <div class="custom-loader"></div>
          </div>
        ) : (
          <ul>
            {price.map((item, i) => (
              <CardPosto
                key={i}
                nomePosto={price[i].nome_posto}
                endereco={`${price[i].endereco}, ${price[i].numero}.`}
                url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
                distancia="100"
                precoGasolina={price[i].produtos[0].valor}
                precoEtanol={price[i].produtos[1].valor}
                precoDiesel={price[i].produtos[2].valor}
              />
            ))}
          </ul>
        )}



        {/* <CardPosto
          nomePosto="Shell Brasil"
          endereco = "R. Solano Trindade"
          url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
          distancia="100"
          precoGasolina="5,19"
          precoEtanol="4,05"
          precoDiesel="5,40"
        /> */}
      </div>
    </section>
  );
};

export default CardLateral;
