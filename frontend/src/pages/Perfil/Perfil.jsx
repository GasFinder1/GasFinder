import styles from "./Perfil.module.css";

import MapContainer from "../../components/MapContainer/MapContainer";
import NavBar from "../../components/NavBar/NavBar"
import CardLateral from "../../components/CardLateral/CardLateral";
import CardPosto from "../../components/CardPosto/CardPosto";

const Perfil = () => {
  return (
    <section className={styles.map}>
      <NavBar />
      <br /> 
      <div className={styles.boxProfile}>
          <h2>MEU PERFIL</h2>
          <form>
            <div className={styles.inputsProfile}>
              <br />
              <p className={styles.emailUser}>email@do.usuario</p>
              <input 
                type="name"
                className={styles.nameProfile}
                placeholder="Nome de usuário"
                // onChange={(e) => setName(e.target.value)}
                // value={name}
              />
              {/* <FaRegEdit className={styles.editIcon}/> */}
              <br />
              <input 
                type="password"
                className={styles.passwordProfile}
                placeholder="Trocar senha"
                // onChange={(e) => setPassword(e.target.value)}
                // value={password}
              />
              <br />
              <input
                type="password"
                className={styles.conf_password_profile}
                placeholder="Confirme a senha"
                // value={confirmPassword}
                // onChange={(e) => setConfirmPassword(e.target.value)}
                // required
              />
            </div>
            <br />
            <input type="submit" className={styles.btnCad} value="Salvar" />
          </form>
      </div>
    </section>
  );
};

export default Perfil;