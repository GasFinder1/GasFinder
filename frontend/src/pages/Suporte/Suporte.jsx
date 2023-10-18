import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import styles from './Suporte.module.css'

const Suporte = () => {
  return (
    <section className={styles.containerSuporte}>
      <NavBar />
      <div className={styles.mainSuporte}>
        <form className={styles.suporteForm}>
          <h2>Suporte</h2>
          <input
            type="email"
            className={`${styles.inputForm} ${styles.inputEmail}`}
            placeholder="E-mail"
            disabled
            value="encheotanquetec@gmail.com"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          // required
          />
          <textarea
            type="text"
            className={`${styles.inputForm} ${styles.inputTxtArea}`}
            placeholder="Escreva sua mensagem"
          // value={email}
          // onChange={(e) => setEmail(e.target.value)}
          // required
          />
          <button className={styles.btnSup}> Enviar</button>
        </form>
      </div>
    </section>
  );
};

export default Suporte;
