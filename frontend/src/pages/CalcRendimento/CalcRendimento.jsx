import { useState } from 'react'
import { toast } from "react-toastify";
import styles from './CalcRendimento.module.css'
import NavBar from '../../components/NavBar/NavBar'

const CalcRendimento = () => {
  const [ etanol, setEtanol ] = useState("");
  const [ gasolina, setGasolina ] = useState("");
  const [ result, setResult ] = useState("");
  
  function calcPrice(e) {
    e.preventDefault();
    try {
      let price = {
        etanol,
        gasolina 
      };
      
      price[etanol] = parseFloat(e.target.value);
      setEtanol(etanol)
      price[gasolina] = parseFloat(e.target.value);
      setGasolina(gasolina)
      
      let value = etanol / gasolina;
      // console.log(value)
      
      // Informa erro caso os valores inseridos sejam 0 
      if ((gasolina == 0) && (etanol == 0) ) {
        toast.error('Valor da gasolina e etanol inválidos.', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      } else if (etanol == 0 ) {
        toast.error('Valor do etanol inválido.', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      } else if (gasolina == 0) {
        toast.error('Valor da gasolina inválido.', {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          });
          return;
      }

      // cálculo: se valor de (etanol + 42,66%) for menor que o valor da gasolina 
      if (((etanol*1.4267) < gasolina))  {
        toast.info('Vale mais a pena abastecer com Etanol!', {
          position: "bottom-center",
          autoClose: 8000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: false,
          theme: "light",
          });
      } else {
        console.log(etanol*1.4267)
        toast.info('Vale mais a pena abastecer com Gasolina!', {
          position: "bottom-center",
          autoClose: 8000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
          });
      } 
      
      
    } catch(err) {
      toast.error(`Problema técnico. ${err}`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    };
  };

  return (
    <div>
      <NavBar/>
      <section className={styles.container}>
      <form className={styles.formCalc} onSubmit={calcPrice}>
        <h2>Cálculo de Rendimento</h2>
        <div className={styles.inputsCalc}>
          <h3>Etanol (preço por litro)</h3>
          <input
            type="text"
            className={styles.inputGas}
            placeholder="R$0,00"
            required
            onChange={(e) => setEtanol(e.target.value)}
            value={etanol}
          />
          <br />
          <h3>Gasolina (preço por litro)</h3>
          <input
            type="text"
            className={styles.inputEtanol}
            placeholder="R$0,00"
            required
            onChange={(e) => setGasolina(e.target.value)}
            value={gasolina}
          />
          <br />
        </div>
        <input type="submit" value="Calcular" className={styles.btnCalc}/>
      </form>
    </section>
    </div>
  )
}

export default CalcRendimento;
