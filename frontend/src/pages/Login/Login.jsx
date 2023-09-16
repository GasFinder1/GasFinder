import styles from "./Login.module.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../img/mainLogo.png";
import { useState } from "react";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/cadastro");
  };

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const data = {
        email,
        password,
      };

      const response = await api.post("login", data);
      toast.success(`Bem vindo ao Gas Finder !`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setEmail("");
      setPassword("");

      navigate("/");
    } catch (err) {
      toast.error("Erro ao fazer login.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <section className={styles.container}>
      <form className={styles.formLogin} onSubmit={handleLogin}>
        <img src={Logo} alt="logoGasFinder" className={styles.logo} />
        <h2>Entrar</h2>
        <div className={styles.inputsLogin}>
          <input
            type="email"
            className={styles.inputEmail}
            placeholder="E-mail"
            required
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <br />
          <input
            type="password"
            className={styles.inputSenha}
            placeholder="Senha"
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
          <br />
        </div>
        <span className={styles.resetPassword}>Esqueceu a senha ?</span>
        <input type="submit" value="Entrar" className={styles.btnSubmit} />
        <p className={styles.cadastreParagraph}>
          Não possui uma conta ?{" "}
          <span onClick={handleSubmit} className={styles.cadastre}>
            Cadastre-se agora
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
