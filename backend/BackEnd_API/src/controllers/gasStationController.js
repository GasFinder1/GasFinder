import express from "express";
import gss from "../services/gasStationServices.js";
import axios from "axios";
const route = express.Router();

route.get('/', async (request, response) => {
    try {
        let { placeID, cep, endereco, nomePosto, uf } = request.body;
        placeID = placeID == undefined ? request.query.placeID : placeID;
        cep = cep == undefined ? request.query.cep : cep;
        endereco = endereco == undefined ? request.query.endereco : endereco;
        nomePosto = nomePosto == undefined ? request.query.nomePosto : nomePosto;
        uf = uf == undefined ? request.query.uf : uf;
        if (placeID ?? false != false) {
            const res = await gss.getGasStation(placeID, cep, endereco, nomePosto);
            if (typeof res === "object" && res != null) {
                if ("error_code" in res) {
                    return response.status(res.error_code ?? 500).json({ error: res.error ?? "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
                }
                else {
                    return response.status(200).json(res);
                }
            }
            else {
                //LOG_HERE
                return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
            }
        }
        else {
            return response.status(400).json({ error: "a placeID é obrigatória" });
        }
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
});

route.post('/', async (request, response) => {
    try {
        let obj = request.body
        if (!(obj ?? false) || !(typeof obj === "object") || !("latitude" in obj) || !("longitude" in obj) || isNaN(obj.latitude) || isNaN(obj.longitude)) {
            return response.status(400).json({ error: "objeto inválido, ou não contem latitude e longitude" });
        }
        const apiUrl = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${obj.latitude},${obj.longitude}&radius=10000&type=gas_station&keyword=cruise&key=${process.env.MAPS_API_KEY}`;
        let data;
        try {
            data = await axios.get(apiUrl);
        }
        catch (err) {
            console.log(err);
            return response.status(500).json({ error: "não foi possível pegar os postos proximos a sua região" });
        }
        obj = data.data;
        if (!(obj ?? false) || !(typeof obj === "object") || !("results" in obj) || !(Array.isArray(obj["results"]))) {
            return response.status(400).json({ error: "essa consulta exige um objeto que contenha um parâmetro \"results\" com as informações dos postos pesquisados" });
        }
        let res = [];
        obj = obj["results"];
        console.log(obj);
        for (let i = 0; i < obj.length; i++) {
            const regexAddress1 = /^(.*?),\s*([^,-]+(?:-[^,]+)?)\s*-\s*([^,]+),\s*([^,]+)/;
            const regexAddress2 = /State of ([^,]+)/;
            const item = obj[i];
            const placeID = item["place_id"] ?? false;
            const completeAdress = item["vicinity"] ?? false;
            const compoundCode = item["plus_code"]["compound_code"] ?? false;
            const gsName = item["name"] ?? false;
            let matches = completeAdress.match(regexAddress1);
            if (!(Array.isArray(matches))) {
                res.push({ placeID, error: "os dados relacionados ao Google maps não possui um endereço" });
                break;
            }
            const road = matches[1] ?? false;
            const gsNumber = matches[2] ?? false;
            const neighborhood = matches[3] ?? false;
            const town = matches[4] ?? false;
            matches = compoundCode.match(regexAddress2);
            if (!(Array.isArray(matches))) {
                res.push({ placeID, error: "os dados relacionados ao Google maps não possui um endereço" });
                break;
            }
            const state = matches[1] ?? false;
            if ([placeID, gsName, road, gsNumber, neighborhood, town, state].includes(false)) {
                // response.status(400).json({ error: "os dados não foram enviados da forma correta" });
            }
            const rows = await gss.gasStationManager(placeID, gsName, gsNumber, road, neighborhood, town, state)
            res.push(rows)
        }
        return response.status(200).json(res);
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
});

export default route;