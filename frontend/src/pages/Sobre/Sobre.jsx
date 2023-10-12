import React from 'react';
import styles from "./SobreNos.module.css"; // Certifique-se de importar os estilos corretos
import Navbar from '../../components/NavBar/NavBar';


function Sobre() {
  return (
    <section className={styles.containerSobreNos}>
      <Navbar />
      <div className={styles.mainSobreNos}>
        <div className={styles.title}>

          <h1>Sobre Nós</h1>
          <div className={styles.description}>
            <p>O Gás Finder teve sua origem como um projeto de TCC na Etec de Embu. Nasceu da necessidade de simplificar a busca por postos de combustível confiáveis e preços acessíveis, tornando a tarefa mais eficiente no cotidiano e especialmente em viagens longas.
            Com o motorista em mente, nossa aplicação web foi concebida para ser intuitiva, de fácil navegação e amigável, visando proporcionar uma experiência livre de complicações.<br />
            Utilizamos diversas linguagens e tecnologias, incluindo React, Node.js, SQL e outras.</p><br />
            <h3>Desenvolvedores</h3>
          </div>
        </div>
        <div className={styles.imageContainer}>
          <div className={styles.imageRow}>
            <a href="https://www.linkedin.com/in/adryan-sales/" target="_blank">
            <img src="/img/adryan.png" alt="um homem chamado Adryan" />
            </a>
            <a href="https://www.linkedin.com/in/carolinaoliveira34/" target="_blank">
            <img src="/img/carolina.png" alt="uma mulher chamada Carolina" />
            </a>
            <a href="https://www.linkedin.com/in/daiane-ara%C3%BAjo-047978144/" target="_blank">
            <img src="/img/daiane.png" alt="uma mulher chamada Daiane" />
            </a>
            <a href="www.linkedin.com/in/joaovictorinacio" target="_blank">
            <img src="/img/joao.png" alt="um homem chamado João" />
            </a>
          </div>
          <div className={styles.imageRow}>
            <a href="https://www.linkedin.com/in/pedro2737/" target="_blank">
            <img src="/img/pedro.png" alt="um homem chamado Pedro" />
            </a>
            <a href="https://www.linkedin.com/in/phgs2004" target="_blank">
            <img src="/img/pedro2.png" alt="um homem chamado Pedro" />
            </a>
            <a href="https://www.instagram.com/tatypsilva/" target="_blank">
            <img src="/img/talita.png" alt="uma mulher chamada Talita" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sobre;