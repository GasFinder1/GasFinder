import express from "express";
import database from "../services/loginServices.js";
import { generateToken } from "../helpers/userFeatures.js";

const route = express.Router();

<<<<<<< HEAD
route.post('/', async (request, response) => {
=======
route.post("/", async (request, response) => {
  const { email, password } = request.body;

>>>>>>> e519ae16ab2a1a460ffab48ee6d5019b73d8ae3c
  try {
    const { email, password } = request.body;
    if ([email ?? false, password ?? false].includes(false)) {
      response.status(400).json({ error: "O email e senha precisam ser preenchidos" });
    }
    const users = await database.login(email, password);
    if (users.length > 0) {
      const id_user = users[0].idUser;
      const email_user = users[0].email;
      const nomeUsuario = users[0].nome_usuario;
      const token = generateToken(id_user, email_user);
      response
        .status(200)
        .send({ message: "Login efetuado com sucesso", token, nomeUsuario });
    } else {
<<<<<<< HEAD
      response.status(401).send({ error: 'Login incorreto' });
    }
  }
  catch (err) {
    //LOG_HERE
    response.status(500).send({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
=======
      response.status(401).send({ message: "Login incorreto" });
    }
  } catch (error) {
    response
      .status(500)
      .send({ message: `Houve um erro no banco de dados: \n ${error}` });
>>>>>>> e519ae16ab2a1a460ffab48ee6d5019b73d8ae3c
  }
});

export default route;
