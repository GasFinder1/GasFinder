import express from "express";
import database from "../services/loginServices.js";
import { generateToken } from "../helpers/userFeatures.js";

const route = express.Router();

route.post('/', async (request, response) => {
  const {email, password} = request.body;
  
  try {
  const users = await database.login (email, password);
    if (users.length > 0) {
      const id_user = users[0].idUser;
      const email_user = users[0].email;
      const token = generateToken(id_user,email_user);

    response.status(200).send({message: 'Login efetuado com sucesso', token});
} else {
    response.status(401).send({message: 'Login incorreto'});
}
} 
catch(error) {
  response.status(500).send({message: `Houve um erro no banco de dados: \n ${error}`});
}
});

export default route;