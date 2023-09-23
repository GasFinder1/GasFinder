import './CardPosto.css'
const CardPosto = (props) => {

    const estiloGasolina = {
        backgroundColor: '#44AF69'
    };
    const estiloEtanol = {
        backgroundColor: '#FCAB10'
    };
    const estiloDiesel = {
        backgroundColor: '#2B9EB3'
    };

    return (
        <div className='main-container-cardPosto'>
            <div className='container-bandeira-e-distancia'>
                <div className='div-bandeira'>
                    <img src={props.url} alt="Bandeira do posto" />
                </div>
                <div className='div-distancia'>
                    <p> A {props.distancia} metros</p>
                    <a href='#'>Mais..</a>
                </div>
            </div>
            <div className='container-valores-postos'>
                <div style={estiloGasolina} className='div-combustiveis'>
                    <h3>G</h3>
                    <p>R$ {props.precoGasolina}</p>
                </div>
                <div style={estiloEtanol} className='div-combustiveis'>
                    <h3>E</h3>
                    <p>R$ {props.precoEtanol}</p>
                </div>
                <div style={estiloDiesel} className='div-combustiveis'>
                    <h3>D</h3>
                    <p>R$ {props.precoDiesel}</p>
                </div>
            </div>
        </div>

    )

}

export default CardPosto

/*PropsUtilizaveis =
props.url = adicionar url da imagem da bandeira
props.distancia = adicionar valor da distancia do posto 
props.precoGasolina / props.precoEtanol / props.precoDiesel  = adicionar valor do preço do tipo do combustivel 
*/