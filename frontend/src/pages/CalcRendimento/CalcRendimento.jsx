  import { useState } from 'react'
  import { toast } from "react-toastify";
  import styles from './CalcRendimento.module.css'
  import NavBar from '../../components/NavBar/NavBar'

  const CalcRendimento = () => {
    const [ etanol, setEtanol ] = useState("");
    const [ gasolina, setGasolina ] = useState("");
    const [ resultado, setResultado] = useState('Resultado');

    const handleInputChange = (e, setFuncao) => {
      e.preventDefault();
      try {
        let valorDigitado = e.target.value;
        let valor = valorDigitado.replace(',','.').split();
        if (isNaN(valor) === true) {
          valorDigitado = '';
        }
        setFuncao(valorDigitado.replace(',','.'));
      } catch(err) {
        console.log(err)
      }
    };
    const calcPrice = (e) => {
      e.preventDefault();
      try {
        const alc = parseFloat(etanol);
        const gas = parseFloat(gasolina);
        // Informa erro caso os valores inseridos sejam 0 
        if ((gas <= 0) && (alc <= 0) ) {
          toast.error('Valor da gasolina e etanol inválidos. Informe um valor maior que zero.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setEtanol('')
            setGasolina('')
            return;
        } else if (alc <= 0) {
          toast.error('Valor do etanol inválido. Informe um valor maior que zero.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setEtanol('')
            setGasolina('')
            return;
        } else if (gas <= 0) {
          toast.error('Valor da gasolina inválido. Informe um valor maior que zero.', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setEtanol('')
            setGasolina('')
            return;
        }
        // cálculo: se valor de (etanol + 42,66%) for menor que o valor da gasolina 
        if ((alc <= (gas*0.7)))  {
          console.log(gas*0.7)
          setResultado('Vale mais a pena abastecer com Etanol!')
        } else if (alc > (gas*0.7)) {
          console.log(gas*0.7)
          setResultado('Vale mais a pena abastecer com Gasolina!');
        } else {
          toast.error('Valores inválidos, por favor informe o preço adequadamente: "R$0.00".', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            });
            setEtanol('')
            setGasolina('')
            return;
        }
      setEtanol(etanol)
      setGasolina(gasolina)
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
          setEtanol('')
          setGasolina('')
      };
    };
    return (
      <div>
        <NavBar/>
        <section className={styles.container}>
          <form className={styles.formCalc} onSubmit={calcPrice}>
            <h2>Cálculo de <br/>Etanol x Gasolina </h2>
            <div className={styles.boxCalc}>
              <div className={styles.inputsCalc}>
                <h3>Etanol (preço por litro)</h3>
                <div className={styles.inputsPreco}>
                  <p>R$</p>
                  <input
                    type="text"
                    maxLength={4}
                    placeholder="0,00"
                    inputMode="numeric"
                    className={styles.inputGas}
                    required
                    onChange={(e) => handleInputChange(e, setEtanol)}
                    value={etanol}
                  />
                </div>
                <br />
                <h3>Gasolina (preço por litro)</h3>
                <div className={styles.inputsPreco}>
                  <p>R$</p>
                  <input
                    type="text"
                    maxLength={4} 
                    inputMode="numeric"
                    placeholder="0,00"
                    className={styles.inputEtanol}
                    required
                    onChange={(e) => handleInputChange(e, setGasolina)}
                    value={gasolina}  
                  />
                </div>
                <br />
                <input type="submit" value="Calcular" className={styles.btnCalc}/>
              </div>
              <div className={styles.explicacao}>
                <h3>Como funciona o cálculo?</h3>
                <p>O cálculo fornece uma noção aproximada de qual combustível vale mais a pena, com base no princípio de que o etanol só vale a pena enquanto o seu preço for equivalente a <strong>até 70% do valor da gasolina</strong>.</p>
                <p className={styles.resultado}>{resultado}</p>
              </div>
            </div>
          </form>
        </section>
      </div>
    )
  }

  export default CalcRendimento;
