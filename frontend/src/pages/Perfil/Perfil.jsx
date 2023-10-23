import styles from "./Perfil.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { useState } from "react";
import { Link } from "react-router-dom";

const Perfil = () => {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <section className={styles.map}>
      <NavBar />
      <div className={styles.boxProfile}>
        <h2>Meu perfil</h2>
        <form className={styles.formUser}>
          <div className={styles.inputsProfile}>
            <input
              type="email"
              className={styles.emailUser}
              placeholder="E-mail"
              disabled
            />
            <input
              type="name"
              className={styles.nameProfile}
              placeholder="Nome de usuário"
            // onChange={(e) => setName(e.target.value)}
            // value={name}
            />
          </div>
          <div className={styles.campoTrocarSenha}>
            <div className={styles.separadorSenha}>
              <hr />
              <h3>Trocar Senha</h3>
              <hr />
            </div>
            <div className={styles.trocarSenhaContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.passwordProfile}
                placeholder="Senha atual"
              // onChange={(e) => setPassword(e.target.value)}
              // value={password}
              />
              <i onClick={togglePasswordVisibility}>
                {showPassword ? <AiOutlineEye className={styles.iconeOlho} /> : <AiOutlineEyeInvisible className={styles.iconeOlho} />}
              </i>
            </div>
            <div className={styles.trocarSenhaContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.conf_password_profile}
                placeholder="Nova senha"
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              // required
              />
              <i onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEye className={styles.iconeOlho} /> : <AiOutlineEyeInvisible className={styles.iconeOlho} />}
              </i>
            </div>
            <div className={styles.trocarSenhaContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                className={styles.conf_password_profile}
                placeholder="Confirmar senha"
              // value={confirmPassword}
              // onChange={(e) => setConfirmPassword(e.target.value)}
              // required
              />
              <i onClick={togglePasswordVisibility}>
              {showPassword ? <AiOutlineEye className={styles.iconeOlho} /> : <AiOutlineEyeInvisible className={styles.iconeOlho} />}
              </i>
            </div>
          </div>
          <Link to="/resetpassword" className={styles.resetPassword}>Esqueceu a senha ?</Link>
          <button className={styles.btnCad}>Salvar alterações</button>
        </form>
      </div>
    </section>
  );
};

export default Perfil;
