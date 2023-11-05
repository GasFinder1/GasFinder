import api from "../../api";
import styles from "./Perfil.module.css";
import NavBar from "../../components/NavBar/NavBar";
import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Perfil = () => {
  const [id, setID] = useState();
  const [email, setEmail] = useState();
  const [name, setName] = useState();
  const [newName, setNewName] = useState();
  const [password, setPassword] = useState();
  const [currentPassword, setCurrentPassword] = useState(); // inserido pelo usuario
  const [newPassword, setNewPassword] = useState();
  const [confirmNewPassword, setConfirmNewPassword] = useState();
  // Visibilidade das senhas
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [showPassword3, setShowPassword3] = useState(false);

  useEffect(() => {
    getInfoDB();
  }, [])

  async function getInfoDB() {
    const data = {
      email, name, password, id
    }
    const response = await api.get("/user", data);
    setID(response.data[0].id_usuario);
    setEmail(response.data[0].email);
    setName(response.data[0].nome_usuario);
    setPassword(response.data[0].senha);

    // CASO FOR USAR O TOKEN PARA OBTER AS INFORMAÇÕES
    // 
    // const token = localStorage.getItem("jwt");
    // response = await api.put("/user", token);
    // setEmail(response.email);
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const data = {
        name, email, password, id
      };

      if ((name !== newName) && (newName != null) && ((currentPassword === null) || (newPassword === null) || (confirmNewPassword === null))) {
        setName(newName);
        const response = await api.put("/user", data);
      }

      if ((name !== newName) && (newName != null) && (password === currentPassword) && (newPassword === confirmNewPassword)) {
        setName(newName);
        setPassword(newPassword)
        const response = await api.put("/user", data);
      } else {
        if ((password === currentPassword) && (newPassword === confirmNewPassword)) {
          setPassword(newPassword)
          const response = await api.put("/user", data);
        } else if ((password !== currentPassword) && (newPassword !== confirmNewPassword)) {
          toast.error("A senha atual está incorreta e a senha nova não coincide com a confirmação.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (password !== currentPassword) {
          console.log(password)
          console.log(currentPassword)
          toast.error("A senha atual está incorreta.", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else if (newPassword !== confirmNewPassword) {
          toast.error("A senha nova não coincide com a confirmação de senha.", {
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
    } catch (err) {
      toast.error(`Problema técnico. ${err}`, {
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
        <form className={styles.formUser} onSubmit={handleUpdate}>
          <div className={styles.inputsProfile}>
            <input
              type="email"
              className={styles.emailUser}
              placeholder="E-mail"
              value={email}
              disabled
            />
            <input
              type="name"
              className={styles.nameProfile}
              placeholder="Nome de usuário"
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>
          <div className={styles.campoTrocarSenha}>
            <div className={styles.separadorSenha}>
              <hr />
              <h3>Trocar Senha</h3>
              <hr />
            </div>
            {["password", "new_password", "conf_new_password"].map(
              (inputName, index) => (
                <div key={inputName} className={styles.trocarSenhaContainer}>
                  <input
                    type={
                      index === 0 
                      ? (showPassword1 ? "text" : "password") 
                      : index === 1 
                      ? (showPassword2 ? "text" : "password") 
                      : (showPassword3 ? "text" : "password")}  
                    className={styles[inputName]}
                    placeholder={ 
                      index === 0 
                      ? "Senha atual" 
                      : index === 1
                      ? "Nova senha"
                      : "Confirmar senha"
                    }
                    onChange={
                      index === 0
                      ? (e) => setCurrentPassword(e.target.value)
                      : index === 1
                      ? (e) => setNewPassword(e.target.value)
                      : (e) => setConfirmNewPassword(e.target.value)
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
          <input type="submit" className={styles.btnCad} value={"Salvar Alterações"} />
        </form>
      </div>
    </section>
  );
};

export default Perfil;
