import styles from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../../img/mainLogo.png";
import api from "../../api";
import { ToastContainer, toast } from "react-toastify";

const Cadastro = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };

  async function handleRegister(e) {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }

    try {
      const data = {
        name,
        email,
        password,
      };
      console.log(data);
      const response = await api.post("/user", data);

      toast.success(`Conta criada com sucesso!`, {
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
      setName("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      toast.error("Tente novamente mais tarde.", {
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
    <div>
      <div className={styles.mainCad}>
        <form className={styles.formCad} onSubmit={handleRegister}>
          <img src={Logo} alt="logoGasFinder" className={styles.logo} />
          <h2 className={styles.welcomeCad}>Faça seu cadastro</h2>
          <div className={styles.inputsCad}>
            <input
              type="text"
              className={styles.nomeCad}
              placeholder="Nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <br />
            <input
              type="email"
              className={styles.emailCad}
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              className={styles.senhaCad}
              placeholder="Senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input
              type="password"
              className={styles.senhaCad}
              placeholder="Confirme a senha"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <br />
            <input type="submit" className={styles.btnCad} value="Cadastrar" />
            <br />
            <span className={styles.cadVoltar} onClick={handleSubmit}>
              {" "}
              Já tenho uma conta{" "}
            </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
