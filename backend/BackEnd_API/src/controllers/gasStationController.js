import express from "express";
import gss from "../services/gasStationServices.js";
//cep, nome da rua, nome do posto
//cep, endereco, nome_posto
const route = express.Router();

route.get('/', async (request, response) => {
    const lat = request.query.lat;
    const lon = request.query.lon;
    const cep = request.query.cep;
    const endereco = request.query.endereco;
    const posto = request.query.nomePosto;

    response.json(await gss.getGasStation(lat, lon, cep, endereco, posto));
});

export default route;