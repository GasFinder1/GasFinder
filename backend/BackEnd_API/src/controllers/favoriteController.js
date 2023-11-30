import express from "express";
import database from "../services/favoriteServices.js";

const route = express.Router();

route.post('/', async (request, response) => {
  const idUser = request.infoUser.id_usuario;

  try {
    const userExists = await database.CheckUserExists(idUser);

    if (!userExists) {
      return response.status(404).send({ message: 'Usuário não encontrado' });
    }

    const { placeID } = request.body;

    if (!placeID) {
      return response.status(400).send({ message: 'ID do lugar não fornecido' });
    }

    const idTlpResult = await database.CheckStationExists(placeID);

    if (!idTlpResult || !idTlpResult.id_tlp) {
      return response.status(404).send({ message: 'Posto não encontrado' });
    }

    const idTlp = idTlpResult.id_tlp;
    console.log(idTlp);
    try {
      await database.CreateFavorite(idUser, idTlp);
      response.status(200).send({ message: 'Posto favoritado com sucesso' });
    } catch (error) {
      response.status(500).send({ message: `Erro ao favoritar` });
      return
    }
  } catch (error) {
    response.status(500).send({ message: `Erro na requisição: \n ${error}` });
    return
  }
});


export default route;

