import React, { useState } from "react";
import styles from "./Perfil.module.css";
import NavBar from "../../components/NavBar/NavBar";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";

const Perfil = () => {
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  const togglePasswordVisibility = (field) => {
    switch (field) {
      case 1:
        setShowPassword1(!showPassword1);
        break;
      case 2:
        setShowPassword2(!showPassword2);
        break;
      case 3:
        setShowPassword3(!showPassword3);
        break;
      default:
        break;
    }
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
            />
          </div>
          <div className={styles.campoTrocarSenha}>
            <div className={styles.separadorSenha}>
              <hr />
              <h3>Trocar Senha</h3>
              <hr />
            </div>
            {["password", "conf_password_profile", "conf_password_profile"].map(
              (inputName, index) => (
                <div key={inputName} className={styles.trocarSenhaContainer}>
                  <input
                    type={index === 0 ? (showPassword1 ? "text" : "password") : index === 1 ? (showPassword2 ? "text" : "password") : (showPassword3 ? "text" : "password")}
                    className={styles[inputName]}
                    placeholder={
                      index === 0
                        ? "Senha atual"
                        : index === 1
                          ? "Nova senha"
                          : "Confirmar senha"
                    }
                  />
                  <i onClick={() => togglePasswordVisibility(index + 1)}>
                    {index === 0 ? (
                      showPassword1 ? (
                        <AiOutlineEye className={styles.iconeOlho} />
                      ) : (
                        <AiOutlineEyeInvisible className={styles.iconeOlho} />
                      )
                    ) : index === 1 ? (
                      showPassword2 ? (
                        <AiOutlineEye className={styles.iconeOlho} />
                      ) : (
                        <AiOutlineEyeInvisible className={styles.iconeOlho} />
                      )
                    ) : showPassword3 ? (
                      <AiOutlineEye className={styles.iconeOlho} />
                    ) : (
                      <AiOutlineEyeInvisible className={styles.iconeOlho} />
                    )}
                  </i>
                </div>
              )
            )}
          </div>
          <Link to="/resetpassword" className={styles.resetPassword}>
            Esqueceu a senha ?
          </Link>
          <button className={styles.btnCad}>Salvar alterações</button>
        </form>
      </div>
    </section>
  );
};

export default Perfil;
