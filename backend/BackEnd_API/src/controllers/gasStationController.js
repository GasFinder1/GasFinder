import express from "express";
import gss from "../services/gasStationServices.js";
const route = express.Router();

route.get('/', async (request, response) => {
    try {
        let { placeID, cep, endereco, nomePosto, uf } = request.body;
        placeID = placeID == undefined ? request.query.placeID : placeID;
        cep = cep == undefined ? request.query.cep : cep;
        endereco = endereco == undefined ? request.query.endereco : endereco;
        nomePosto = nomePosto == undefined ? request.query.nomePosto : nomePosto;
        uf = uf == undefined ? request.query.uf : uf;
        if(placeID ?? false != false){
            const res = await gss.getGasStation(placeID, cep, endereco, nomePosto);
            if(typeof res === "object" && res != null){
                if("error_code" in res){
                    return response.status(res.error_code ?? 500).json({ error: res.error ?? "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
                }
                else{
                    return response.status(200).json(res);
                }
            }
            else{
                //LOG_HERE
                return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
            }
        }
        else{
            return response.status(400).json({error: "a placeID é obrigatória"});
        }
    }
    catch(err){
        //LOG_HERE
        console.log(err);
        return response.status(500).json({error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções"});
    }
});

export default route;