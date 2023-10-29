import express from "express";
import gss from "../services/gasStationServices.js";
const route = express.Router();

route.get('/', async (request, response) => {
    try {
        let { lat, lon, cep, endereco, nomePosto, uf } = request.body;
        lat = lat == undefined ? request.query.lat : lat;
        lon = lon == undefined ? request.query.lon : lon;
        cep = cep == undefined ? request.query.cep : cep;
        endereco = endereco == undefined ? request.query.endereco : endereco;
        nomePosto = nomePosto == undefined ? request.query.nomePosto : nomePosto;
        uf = uf == undefined ? request.query.uf : uf;
        if(!([lat ?? false, lon ?? false].includes(false))){
            response.status(200).json(await gss.getGasStation(lat, lon, cep, endereco, nomePosto));
        }
        else{
            return response.status(400).json({error: "os dados de latitude e longitude são obrigatórios"});
        }
    }
    catch(err){
        //LOG_HERE
        console.log(err);
        return response.status(500).json({error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções"});
    }
});

export default route;