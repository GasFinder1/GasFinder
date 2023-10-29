import express from "express";
import gss from "../services/gasStationConfirmationServices.js";
const route = express.Router();

route.post('/', async (request, response) => {
    try {
        let { lat, lon, id_posto } = request.body;
        if (!([lat ?? false, lon ?? false].includes(false))) {
            id_posto = id_posto ?? 0
            response.status(200).json(await gss.insertGasStationLocation(lat, lon, id_posto));
        }
        else {
            return response.status(400).json({ error: "a latitude e longitude são obrigatórias na requisição" });
        }
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
});

export default route;