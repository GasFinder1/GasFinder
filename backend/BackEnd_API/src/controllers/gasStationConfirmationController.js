import express from "express";
import gss from "../services/gasStationConfirmationServices.js";
const route = express.Router();

route.post('/', async (request, response) => {
    try {
        let { place_ID, id_posto } = request.body;
        if ((place_ID ?? false != false)) {
            id_posto = id_posto ?? 0
            const res = await gss.insertGasStationLocation(place_ID, id_posto)
            if(res ?? false != false){
                if(typeof res === "object"){
                    if("error_code" in res){
                        response.status(res.error_code).json({ error: res.error });
                    }
                    else{
                        response.status(200).json({message: "dados cadastrados com sucesso"});
                    }
                }
                else{
                    //LOG_HERE
                    response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
                }
            }
        }
        else {
            response.status(400).json({ error: "a place_ID é obrigatória" });
        }
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
});

export default route;