import "./CardLateral.css"
import CardPosto from "../CardPosto/CardPosto"

const CardLateral = () => {
  return (
    <section className="main-container-CardLateral">
      <div className="container-janela">
        {/* Aqui começa a janela */}
        <h2>Postos Próximos</h2>
        <div className="card">
          <CardPosto
            url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia="100"
            precoGasolina="5,19"
            precoEtanol="4,05"
            precoDiesel="5,40"
          />
        </div>
        <div className="card">
          <CardPosto
            url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia="100"
            precoGasolina="5,19"
            precoEtanol="4,05"
            precoDiesel="5,40"
          />
        </div>
        <div className="card">
          <CardPosto
            url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia="100"
            precoGasolina="5,19"
            precoEtanol="4,05"
            precoDiesel="5,40"
          />
        </div>
        <div className="card">
          <CardPosto
            url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia="100"
            precoGasolina="5,19"
            precoEtanol="4,05"
            precoDiesel="5,40"
          />
        </div>

          <CardPosto
            url="https://logodownload.org/wp-content/uploads/2014/07/shell-logo-0.png"
            distancia="100"
            precoGasolina="5,19"
            precoEtanol="4,05"
            precoDiesel="5,40"
          />
        
      </div>
    </section>
  )
}

export default CardLateral