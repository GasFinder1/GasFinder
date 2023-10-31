import React from 'react';
import styles from "./SobreNos.module.css"; // Certifique-se de importar os estilos corretos
import Navbar from '../../components/NavBar/NavBar';
import CardSobre from '../../components/CardSobre/CardSobre';
import adryan from '../../img/adryan1.jpg'
import carol from '../../img/carol1.jpg'
import daiane from '../../img/dai1.jpg'
import joao from '../../img/joao1.jpg'
import pedroG from '../../img/pedroG1.jpg'
import pedroS from '../../img/pedroSilva1.jpg'
import talita from '../../img/talita1.jpg'


function Sobre() {
  return (
    <section className={styles.containerSobreNos}>
      <Navbar/>
      <div className={styles.mainContainerSobre}>
        <div className={styles.textSobre}>
        <h2>Sobre o Projeto</h2>
        <p>O Gas Finder teve sua origem como um projeto de TCC na Etec de Embu. Nasceu da necessidade de simplificar a busca por postos de combustível confiáveis e preços acessíveis, tornando a tarefa mais eficiente no cotidiano e especialmente em viagens longas.
          Com o motorista em mente, nossa aplicação web foi concebida para ser intuitiva, de fácil navegação e amigável, visando proporcionar uma experiência livre de complicações.<br />
          Utilizamos diversas linguagens e tecnologias, incluindo React, Node.js, SQL e outras.
        </p>
        <h3>Desenvolvedores do Gas Finder</h3>
        </div>
        <div className={styles.dev}>
          <CardSobre
            fotoPerfil={adryan}
            nomeSobre="Adryan Sales"
            instagram="https://www.instagram.com/sales.adryan/"
            linkedin="https://www.linkedin.com/in/adryan-sales/"
            github="https://github.com/AdryanSales"
          />
          <CardSobre
            fotoPerfil={carol}
            nomeSobre="Carolina Oliveira"
            instagram="https://www.instagram.com/carolinapvp/"
            linkedin="https://www.linkedin.com/in/carolinaoliveira34/"
            github="https://github.com/carolinapvp"
          />
          <CardSobre
            fotoPerfil={daiane}
            nomeSobre="Daiane Pinheiro"
            instagram="#"
            linkedin="https://www.linkedin.com/in/daiane-ara%C3%BAjo-047978144/"
            github="#"
          />
          <CardSobre
            fotoPerfil={joao}
            nomeSobre="João Inácio"
            instagram="https://www.instagram.com/joao_niinguem/"
            linkedin="https://www.linkedin.com/in/joaovictorinacio/"
            github="https://github.com/J-Inacio"
          />
          <CardSobre
            fotoPerfil={pedroG}
            nomeSobre="Pedro Gonçalves"
            instagram="https://www.instagram.com/p_19hgs/"
            linkedin="https://www.linkedin.com/in/phgs2004/"
            github="https://github.com/PedroDeVvV"
          />
          <CardSobre
      
            fotoPerfil={pedroS}
            nomeSobre="Pedro Silva"
            instagram="#"
            linkedin="https://www.linkedin.com/in/pedro2737/"
            github="https://github.com/pedro2737"
          />
          <CardSobre
            fotoPerfil={talita}
            nomeSobre="Talita Pereira"
            instagram="https://www.instagram.com/tatypsilva/"
            linkedin="#"
            github="https://github.com/tpsilva18"
          />
        </div>
      </div>   
    </section>

  );
}

export default Sobre;