import "./RecuperarSenha.css";
import Logo from "../../img/mainLogo.png";
import { useState } from "react";
import api from "../../api";
import { useNavigate, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const RecuperarSenha = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate("");

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //   };

  async function handleReset(e) {
    e.preventDefault();
    try {
      const data = {
        email,
      };
      const response = await api.post("/password", data);
      toast.success(`Uma nova senha foi enviado ao seu e-mail.`, {
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
      navigate("/login");
    } catch (error) {
      toast.error("Erro ao redefinir senha.", {
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
    <section className="main-recuperarSenha-container">
      <div className="recuperarSenha-container">
        <img src={Logo} alt="logoGasFinder" />

        <form className="formulario-email-e-botao" onSubmit={handleReset}>
          <h2>RECUPERAR SENHA</h2>
          <input
            className="campo-recuperar-senha"
            type="email"
            placeholder="E-mail de recuperação"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="botao-recuperar-senha"
            type="submit"
            // onClick={handleSubmit}
          >
            Redefinir Senha
          </button>
          <Link to="/login">Voltar para tela de Login</Link>
        </form>
      </div>
    </section>
  );
};

export default RecuperarSenha;
