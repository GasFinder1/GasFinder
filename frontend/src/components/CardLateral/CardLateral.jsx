import "./CardLateral.css"
import CardPosto from "../CardPosto/CardPosto"
import { useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import FilterButton from "../FilterButton/FilterButton"

const CardLateral = () => {
  const [btnState, setBtnState] = useState(false)
  return (
    <section className={`main-container-CardLateral ${!btnState ? '' : 'ocult'}`}>
      <div className="container-janela">
        {/* Aqui começa a janela */}
        <button onClick={() => setBtnState(!btnState)} className="btnActionCard">{!btnState ? <MdKeyboardArrowDown /> : <MdKeyboardArrowUp />}</button>
        <div className="containerBtnFiltrar-H2">
          <FilterButton />
          <h2>Postos Próximos</h2>
        </div>

        <CardPosto
          nomePosto="Shell Brasil"
          endereco = "R. Solano Trindade"
          url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
          distancia="100"
          precoGasolina="5,19"
          precoEtanol="4,05"
          precoDiesel="5,40"
          id="1"
        />
      </div>
    </section>
  )
}

export default CardLateral