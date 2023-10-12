import React from 'react'
import NavBar from '../../components/NavBar/NavBar';
import styles from './Suporte.module.css'

const Suporte = () => {
  return (
    <div>
      <section className={styles.containerSuporte}>
        <NavBar />
        <div className={styles.mainSuporte}>
          <form>
            <h2>Suporte</h2>
            <div className={styles.inputSuporte}>
              <br />
              <input
                type="email"
                className={styles.emailSup}
                placeholder="E-mail"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // required
              />
              <br />
              <textarea
                // rows="4" cols="50"
                type="text"
                className={styles.msgSup}
                placeholder="Escreva sua mensagem"
                // value={email}
                // onChange={(e) => setEmail(e.target.value)}
                // required
              />
              <input type="submit" className={styles.btnSup} value="Cadastrar" />
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Suporte;
