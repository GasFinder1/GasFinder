import express from "express";
import gss from "../services/gasStationServices.js";
const route = express.Router();

route.get('/', async (request, response) => {
    try {
        let { place_ID, cep, endereco, nomePosto, uf } = request.body;
        place_ID == undefined ? request.query.place_ID : place_ID;
        cep = cep == undefined ? request.query.cep : cep;
        endereco = endereco == undefined ? request.query.endereco : endereco;
        nomePosto = nomePosto == undefined ? request.query.nomePosto : nomePosto;
        uf = uf == undefined ? request.query.uf : uf;
        if(place_ID ?? false != false){
            const res = await gss.getGasStation(place_ID, cep, endereco, nomePosto);
            if(typeof res === "object"){
                if("error_code" in res){
                    response.status(res.error_code).json({ error: res.error });
                }
                else{
                    response.status(200).json(res);
                }
            }
            else{
                //LOG_HERE
                response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
            }
        }
        else{
            return response.status(400).json({error: "a place_ID é obrigatória"});
        }
    }
    catch(err){
        //LOG_HERE
        console.log(err);
        return response.status(500).json({error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções"});
    }
});

export default route;