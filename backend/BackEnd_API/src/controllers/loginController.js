import express from "express";
import database from "../services/loginServices.js";
import { generateToken } from "../helpers/userFeatures.js";

const route = express.Router();

route.post('/', async (request, response) => {
  try {
    const { email, password } = request.body;
    if ([email ?? false, password ?? false].includes(false)) {
      response.status(400).json({ error: "O email e senha precisam ser preenchidos" });
    }
    const users = await database.login(email, password);
    if (users.length > 0) {
      const id_user = users[0].idUser;
      const emailUser = users[0].email;
      const nomeUsuario = users[0].nome_usuario;
      const token = generateToken(id_user, emailUser);
      console.log(token)
      response
        .status(200)
        .send({ message: "Login efetuado com sucesso", token, nomeUsuario });
    } else {
      response.status(401).send({ error: 'Login incorreto' });
    }
  }
  catch (err) {
    //LOG_HERE
    response.status(500).send({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

export default route;
