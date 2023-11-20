import express from "express";
import gss from "../services/gasStationServices.js";
import gscs from "../services/gasStationConfirmationServices.js"
import axios from "axios";
import infoFormatter from "../utils/infoFormatter.js";
import localizationFeatures from "../utils/localizationFeatures.js";
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

route.post('/get/', async (request, response) => {
    let { bairro, municipio, pesquisa } = request.body;
    if (pesquisa == 1 || pesquisa != 2) {
        if (!(bairro || false) || !(typeof bairro === "string")) {
            return response.status(400).json({ error: "o dado de bairro deve ser preenchido" });
        }
        if (!(municipio || false) || !(typeof municipio === "string")) {
            return response.status(400).json({ error: "o dado de municipio deve ser preenchido" });
        }
        if (pesquisa == 1) {
            const rows = await gss.getGasStationByNeighborhood(municipio, bairro);
            if (rows == null) {
                return response.status(400).json({ error: "não foi encontrada nenhum posto nesse bairro" });
            }
            return response.status(200).json({ rows });
        }
        else {
            const rows = await gss.getGasStationByNeighborhoodAndMunicipaly(municipio, bairro);
            if (rows == null) {
                return response.status(400).json({ error: "não foi encontrada nenhum posto nesse bairro" });
            }
            return response.status(200).json(rows);
        }
    }
    else if (pesquisa == 2) {
        if (!(municipio || false) || !(typeof municipio === "string")) {
            return response.status(400).json({ error: "o dado de municipio deve ser preenchido" });
        }
        const rows = await gss.getGasStationByMunicipality(municipio, bairro);
        if (rows == null) {
            return response.status(400).json({ error: "não foi encontrada nenhum posto nesse bairro" });
        }
        return response.status(200).json(rows);
    }
    return response.status(400).json({ error: "formato dos dados incorretos" })
});

route.post('/all/', async (request, response) => {
    try {
        let { latitude, longitude, distanceKm } = request.body;
        if (!([1, 2, 5, 10, 15, 20, 25].includes(distanceKm))){
            distanceKm = 5;
        }
        if (!(infoFormatter.isFloat(latitude) && infoFormatter.isFloat(longitude))) {
            return response.status(404).json({ error: "é necessário enviar a latitude e longitude" });
        }
        let data = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.MAPS_API_KEY}`);
        if ("error_message" in data) {
            return response.status(500).json({ error: "não foi possível descobrir o endereço com base nessas coordenadas" });
        }
        const neighborhood = data.data.results[0].address_components[2].long_name;
        const city = data.data.results[0].address_components[3].long_name;

        data = await gss.getAllGasStationByNeighborhoodAndMunicipaly(city, neighborhood);
        if (data.length == 0) {
            return response.status(404).send("Nenhuma posto encontrado por perto");
        }
        let gs_data = [];
        let queue = [];
        data.map((value) => {
            queue.push(gss.getLocalizationById_posto(value.id_posto));
        })
        await Promise.all(queue).then((values) => {
            gs_data = values;
        }).catch(err => console.log(err));
        // return response.json({data, gs_data});
        gs_data.map(value => {
            const index = data.findIndex(objeto => objeto.id_posto === value.fk_id_posto);
            if (index !== -1) {
                data.splice(index, 1);
            }
        })
        console.log("o tamanho do data é de: " + data.length);
        gs_data = [];
        queue = [];
        for (let i = 0; i < data.length; i++) {
            const gs_id = data[i].id_posto;
            queue.push(new Promise((resolve, reject) => {
                //número do estabelecimento se tiver?
                axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${data[i].nome_posto}, ${neighborhood}, ${city}&key=${process.env.MAPS_API_KEY}`)
                    .then(response => {
                        resolve({id_posto: gs_id, data: response.data.results});
                    })
                    .catch(err => {
                        console.log(err);
                        reject(err);
                    });
            }));
        }
        await Promise.all(queue).then((values) => {
            gs_data = values;
        }).catch(err => console.log(err));
        queue = []
        gs_data.map((value) => {
            queue.push(new Promise((resolve, reject) => {
                gscs.insertGasStationLocationWithLatAndLon(value.data[0].place_id, value.id_posto, value.data[0].geometry.location.lat, value.data[0].geometry.location.lng)
                .then(response => {
                    resolve(response);
                }).catch(err => console.log(err))
            }));
        });
        await Promise.all(queue).then((values) => {
            gs_data = values;
        }).catch(err => console.log(err));
        const {latMax, latMin, longMax, longMin} = localizationFeatures.calcLimits(latitude, longitude, distanceKm || 5);
        const gasStations = await gss.getStationByDistance(latMax, latMin, longMax, longMin);
        if (("error" in gasStations)){
            return response.status(404).json({ error: gasStations.error });
        }
        return response.status(201).json(infoFormatter.gsInfoOrganizer(gasStations));
        //inserir na localização_posto
        //return response.status(200).json(gs_data);
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
    }
});
export default route;