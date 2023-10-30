import express, { request, response } from "express";
import database from "../services/userServices.js";

const route = express.Router();

route.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;
    if ([name ?? false, email ?? false, password ?? false].includes(false)) {
      response.status(400).json({ error: "não foram enviados todos os dados necessários" })
    }
    const res = await database.CreateUser(name, email, password);
    console.log(res);
    if(!("error" in res)){
      response.status(200).json({ message: 'Registrado com sucesso' });
    }
    else if("error_code" in res){
      response.status(res.error_code).json({error: res.error})
    }
    else{
      console.log("não foi possível cadastrar");
      return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
  } catch (err) {
    //LOG_HERE
    console.log(err);
    response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

route.put('/', async (request, response) => {
  try {
    const { name, email, password, idUser } = request.body;
    if ([name ?? false, email ?? false, password ?? false, idUser ?? false].includes(false)) {
      response.status(400).json({ error: "todos os dados devem ser preênchidos" });
    }
    //PROCEDURE?
    await database.UpdateUser(name, email, password, idUser);
    response.status(200).json({ message: 'Atualizado com sucesso' });
  } catch (err) {
    //LOG_HERE
    response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

route.delete('/:idUser', async (request, response) => {
  try {
    //trocar por JSON
    const { idUser } = request.params;
    await database.DeleteUser(idUser);
    
    response.status(200).send({ message: 'Excluído com sucesso' });
  } catch (err) {
    //LOG_HERE
    console.error(err)
    response.status(500).send({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});
export default route;