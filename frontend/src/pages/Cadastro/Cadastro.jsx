import styles from "./Cadastro.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from '../../img/mainLogo.png'
import api from "../../api";

const Cadastro = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [typeUser, setTypeUser] = useState("Comum");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/login");
  };
  // console.log(userName);
  // console.log(email);
  // console.log(password);
  console.log(typeUser);

  async function handleRegister(e) {
    e.preventDefault();
    try {
      const data = {
        name,
        email,
        password,
        typeUser,
      };
      const response = await api.post("/user", data);

      alert(`Usuário cadastrado com sucesso. Bem vindo(a) ao sistema ${name}`);

      setEmail("");
      setPassword("");
      setName("");
      setTypeUser("comum");
    } catch (error) {
      alert(`Erro no cadastro. Tente novamente. \nCódigo erro: ${error}`);
    }
  }

  return (
    <div>
      <div className={styles.mainCad}>
        <form className={styles.formCad} onSubmit={handleRegister}>
          <img src={Logo} alt="logoGasFinder" className={styles.logo}/>
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
              type="passwordAgain"
              className={styles.senhaCad}
              placeholder="Confirme a senha"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <br />
            <input type="submit" className={styles.btnCad} value="Cadastrar" />
            <br />
            <span className={styles.cadVoltar} onClick={handleSubmit}> Já tenho login </span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
