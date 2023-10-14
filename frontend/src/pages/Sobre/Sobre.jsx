import React from 'react';
import styles from "./SobreNos.module.css"; // Certifique-se de importar os estilos corretos
import Navbar from '../../components/NavBar/NavBar';
import CardSobre from '../../components/CardSobre/CardSobre';
import foto from '../../img/fotoTeste2.jpg'



function Sobre() {
  return (
    <section className={styles.containerSobreNos}>
      <Navbar/>
      <div className={styles.mainContainerSobre}>
        <div className={styles.textSobre}>
        <h2>Sobre nós</h2>
        <p>O Gas Finder teve sua origem como um projeto de TCC na Etec de Embu. Nasceu da necessidade de simplificar a busca por postos de combustível confiáveis e preços acessíveis, tornando a tarefa mais eficiente no cotidiano e especialmente em viagens longas.
          Com o motorista em mente, nossa aplicação web foi concebida para ser intuitiva, de fácil navegação e amigável, visando proporcionar uma experiência livre de complicações.<br />
          Utilizamos diversas linguagens e tecnologias, incluindo React, Node.js, SQL e outras.
        </p>
        <h3>Desenvolvedores do Gas Finder</h3>
        </div>
        <div className={styles.dev}>
          <CardSobre
            fotoPerfil={foto}
            nomeSobre="Adryan Sales"
            instagram="#"
            linkedin="https://www.linkedin.com/in/adryan-sales/"
            github="#"
          />
          <CardSobre
            fotoPerfil={foto}
            nomeSobre="Carolina Oliveira"
            instagram="#"
            linkedin="https://www.linkedin.com/in/carolinaoliveira34/"
            github="#"
          />
          <CardSobre
            fotoPerfil={foto}
            nomeSobre="Daiane Pinheiro"
            instagram="#"
            linkedin="https://www.linkedin.com/in/daiane-ara%C3%BAjo-047978144/"
            github="#"
          />
          <CardSobre
            fotoPerfil={foto}
            nomeSobre="João Inácio"
            instagram="#"
            linkedin="https://www.linkedin.com/in/joaovictorinacio/"
            github="#"
          />
          <CardSobre
            fotoPerfil={foto}
            nomeSobre="Pedro Gonçalves"
            instagram="#"
            linkedin="https://www.linkedin.com/in/phgs2004/"
            github="#"
          />
          <CardSobre
      
            fotoPerfil={foto}
            nomeSobre="Pedro Silva"
            instagram="#"
            linkedin="https://www.linkedin.com/in/pedro2737/"
            github="#"
          />
          <CardSobre
            fotoPerfil={foto}
            nomeSobre="Talita Pereira"
            instagram="https://www.instagram.com/tatypsilva/"
            linkedin="#"
            github="#"
          />
        </div>
      </div>   
    </section>

  );
}

export default Sobre;