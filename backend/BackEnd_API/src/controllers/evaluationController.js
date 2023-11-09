import express, { request, response } from "express";
import database from "../services/evaluationervices.js";

const route = express.Router();

route.put('/', async (request, response) => {
  try {
    const { idUsuario, placeID, eGasStation, eProduct, eService, opinion } = request.body;
    if (!([idUsuario ?? false, placeID ?? false, eGasStation ?? false, eProduct ?? false, eService ?? false].includes(false))) {
      const res = await database.setEvaluation(idUsuario, placeID, eGasStation, eProduct, eService, opinion ?? "");
      if (typeof res === "object" && res != null) {
        if ("error_code" in res) {
          return response.status(res.error_code ?? 500).json({ error: res.error ?? "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
        }
        else {
          return response.status(200).json({ message: 'Avaliação realizada com sucesso!' });
        }
      }
      else {
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
      }
    }
    else {
      return response.status(400).json({ error: 'todos os dados devem ser enviados' });
    }
  }
  catch (err) {
    console.log(err);
    //LOG_HERE
    return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

route.post('/', async (request, response) => {
  try {
    const { idUsuario, placeID } = request.body;
    if (!([idUsuario ?? false, placeID ?? false].includes(false))) {
      const res = await database.getEvaluation(idUsuario, placeID);
      if (typeof res === "object" && res != null) {
        if ("error" in res) {
          return response.status(res.error_code ?? 500).json({ error: res.error ?? "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
        }
        else {
          return response.status(200).json(res[0]);
        }
      }
      else {
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
      }
    }
    else {
      return response.status(400).json({ error: 'todos os dados devem ser enviados' });
    }
  }
  catch (err) {
    console.log(err);
    //LOG_HERE
    return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

export default route;