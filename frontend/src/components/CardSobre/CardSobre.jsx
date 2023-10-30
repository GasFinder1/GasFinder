import styles from "./CardSobre.module.css";
import {AiOutlineInstagram,AiOutlineLinkedin,AiOutlineGithub} from 'react-icons/ai'

function CardSobre(props) {
    return (
       
        <div className={styles.containerCardSobre}>
            <div className={styles.containerFtPerfil}>
                <img src={props.fotoPerfil} alt="Membro GasFinder"></img>
            </div>
            <h3>{props.nomeSobre}</h3>
            <div className={styles.redesSociais}>
                <a href={props.instagram} target="_blank" rel="noopener noreferrer"><AiOutlineInstagram/></a>
                <a href={props.linkedin} target="_blank" rel="noopener noreferrer"><AiOutlineLinkedin/></a>
                <a href={props.github} target="_blank" rel="noopener noreferrer"><AiOutlineGithub/></a>
            </div>
        </div>
    )

}


export default CardSobre