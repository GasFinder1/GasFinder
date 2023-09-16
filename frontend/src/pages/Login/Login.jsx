import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Logo from '../../img/mainLogo.png'

const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  return (
    <section className={styles.container}>
      <form className={styles.formLogin}>
        <img src={Logo} alt="logoGasFinder" className={styles.logo}/>
        <h2>Entrar</h2>
        <div className={styles.inputsLogin}>
          <input
            type="email"
            className={styles.inputEmail}
            placeholder="E-mail"
            required
          />
          <br />
          <input
            type="password"
            className={styles.inputSenha}
            placeholder="Senha"
            required
          />
          <br />
        </div>
        <span className={styles.resetPassword}>Esqueceu a senha ?</span>
        <input type="submit" value="Entrar" className={styles.btnSubmit} />
        <p className={styles.cadastreParagraph}>
          Não possui uma conta ?{" "}
          <span onClick={handleSubmit} className={styles.cadastre}>Cadastre-se agora</span>
        </p>
      </form>
    </section>
  );
};

export default Login;
