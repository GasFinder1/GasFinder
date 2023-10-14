import styles from "./Perfil.module.css";
import NavBar from "../../components/NavBar/NavBar";

const Perfil = () => {
  return (
    <section className={styles.map}>
      <NavBar />
      <div className={styles.boxProfile}>
        <h2>MEU PERFIL</h2>
        <form className={styles.formUser}>
          <div className={styles.inputsProfile}>
            <input 
            type="email"
            className={styles.emailUser}
            placeholder="Email" 
            disabled 
            />
            <input
              type="name"
              className={styles.nameProfile}
              placeholder="Nome de usuário"
            // onChange={(e) => setName(e.target.value)}
            // value={name}
            />
            {/* <FaRegEdit className={styles.editIcon}/> */}
            <input
              type="password"
              className={styles.passwordProfile}
              placeholder="Trocar senha"
            // onChange={(e) => setPassword(e.target.value)}
            // value={password}
            />
            <input
              type="password"
              className={styles.conf_password_profile}
              placeholder="Confirme a senha"
            // value={confirmPassword}
            // onChange={(e) => setConfirmPassword(e.target.value)}
            // required
            />
          </div>
          <input type="submit" className={styles.btnCad} value="Salvar" />
        </form>
      </div>
    </section>
  );
};

export default Perfil;
