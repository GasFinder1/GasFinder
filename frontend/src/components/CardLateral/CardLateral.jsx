import "./CardLateral.css"
import CardPosto from "../CardPosto/CardPosto"
import { useState } from "react"
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md'
import FilterButton from "../FilterButton/FilterButton"

const CardLateral = () => {
  const [btnState, setBtnState] = useState(false)
  console.log(btnState)
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
        />
        <CardPosto
          nomePosto="Petrobras"
          endereco= "R. Domingos de Pascoal"
          url="https://i.pinimg.com/originals/b4/e8/f3/b4e8f3a19680f3dbf2ee1e543df41ace.jpg"
          distancia="250"
          precoGasolina="6,00"
          precoEtanol="4,55"
          precoDiesel="5,30"
        />
        <CardPosto
          nomePosto="Posto Ale"
          endereco = "Rod. Régis Bittencourt"
          url="https://cdn.worldvectorlogo.com/logos/postos-ale.svg"
          distancia="600"
          precoGasolina="5,85"
          precoEtanol="4,00"
          precoDiesel="4,90"
        />
        <CardPosto
          nomePosto="Ipiranga"
          endereco= "R. Marcelino Pinto Teixeira"
          url="https://i.pinimg.com/736x/5a/bf/e5/5abfe598255809e49bbbde713a4b48d8.jpg"
          distancia="853"
          precoGasolina="5,30"
          precoEtanol="4,20"
          precoDiesel="5,40"
        />
        <CardPosto
          nomePosto="Posto Local"
          endereco= "Av. Rotary"
          url="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQhkWOxcM35Pak60Dp5v3kM40xiNqPmIK7Aig&usqp=CAU"
          distancia="1520"
          precoGasolina="6,20"
          precoEtanol="4,50"
          precoDiesel="5,75"
        />

      </div>
    </section>
  )
}

export default CardLateral