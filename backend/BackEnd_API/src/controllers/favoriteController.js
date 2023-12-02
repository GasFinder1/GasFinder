import express from "express";
import database from "../services/favoriteServices.js";

const route = express.Router();

route.post('/', async (request, response) => {
  const infoUser = request.infoUser;
  const idUser = infoUser.id_usuario;

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

route.delete('/', async (request, response) => {
  try {
    const { idFavorite } = request.body;
    // const { idFavorite } = request.params;
    await database.DeleteFavorite(idFavorite);

    response.status(200).send({ message: 'Excluído com sucesso' });
  } catch (err) {
    console.error(err)
    response.status(500).send({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

route.get('/', async (request, response) => {
  try {
    const infoUser = request.infoUser;
    const idUser = infoUser.id_usuario;
    const rows = await database.getFavorites(idUser);
    if(rows && rows.length > 0)
    response.status(200).json(rows);
    throw new Error("não foi possível encontrar nenhum dado");
  } catch (err) {
    console.error(err)
    response.status(500).send({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

export default route;