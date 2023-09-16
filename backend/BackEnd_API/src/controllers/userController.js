import express, { request, response } from "express";
import database from "../services/userServices.js";

const route = express.Router();

route.post('/', async (request, response) => {
  try {
  const {name_user, email, password } = request.body;
  await database.CreateUser(name_user,email, password);
  response.status(200).send({message: 'Registrado com sucesso'});
} catch(error) {
  response.status(500).send({message: `Erro na requisição: \n ${error}`});
}
})
route.put('/', async (request, response) => {
  try {
    const {name_user, email, password, idUser} = request.body; 
    await database.UpdateUser(name_user, email, password,  idUser);
    response.status(200).send({message: 'Atualizado com sucesso'});
  } catch(error) {
    response.status(500).send({message: `Erro na requisição: \n ${error}`});
  }
});
route.delete('/:idUser', async (request, response) => {
  try {
    const {idUser} = request.params;
    await database.DeleteUser(idUser);
    response.status(200).send({message: 'Excluído com sucesso'});
  } catch(error) {
    response.status(500).send({message: `Erro na requisição: \n ${error}`});
  }
})
export default route;