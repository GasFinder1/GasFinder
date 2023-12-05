import express, { request, response } from "express";
import database from "../services/userServices.js";
import { verifyJWT } from "../middleswares/jwt.js";
import bcrypt from 'bcrypt';

const route = express.Router();
const saltRounds = 10;

route.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if ([name ?? false, email ?? false, password ?? false].includes(false)) {
      return response.status(400).json({ error: "não foram enviados todos os dados necessários" })
    }
    let hash
    if (password) { hash = await bcrypt.hash(password, saltRounds) };
    console.log(hash);

    const res = await database.CreateUser(name, email, hash);
    if (typeof res === "object" && res != null) {
      if (!("error" in res)) {
        return response.status(200).json({ message: 'Registrado com sucesso' });
      }
      else if ("error_code" in res) {
        return response.status(res.error_code).json({ error: res.error });
      }
      else {
        console.log("não foi possível cadastrar");
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
      }
    }
    else {
      return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
  } catch (err) {
    //LOG_HERE
    console.log(err);
    return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

route.put('/', verifyJWT, async (request, response) => {
  try {
    const infoUser = request.infoUser;
    const { name, email, password } = request.body;
    const idUser = infoUser.id_usuario;
    if ([name ?? false, email ?? false, password ?? false, idUser ?? false].includes(false)) {
      return response.status(400).json({ error: "todos os dados devem ser preênchidos, e você precisa estar logado" });
    }
    let hash
    if (password) { hash = await bcrypt.hash(password, saltRounds) };
    console.log(hash);
    //PROCEDURE?
    await database.UpdateUser(name, email, hash, idUser);
    return response.status(200).json({ message: 'Atualizado com sucesso' });
  } catch (err) {
    //LOG_HERE
    return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

route.delete('/', verifyJWT, async (request, response) => {
  try {
    const idUser = request.infoUser.id_usuario;
    await database.DeleteUser(idUser);

    return response.status(200).send({ message: 'Excluído com sucesso' });
  } catch (err) {
    //LOG_HERE
    console.error(err)
    return response.status(500).send({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});
export default route;