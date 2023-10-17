import express from "express";
import gss from "../services/gasStationConfirmationServices.js";
const route = express.Router();

route.post('/', async (request, response) => {
    const { lat, lon, id_posto } = request.body;

    try{
        if(!([lat ?? false, lon ?? false].includes(false))) {
            if(id_posto ?? false){
                response.json(await gss.insertGasStationLocation(lat, lon, id_posto));
            }
            else{
                response.json(await gss.createGasStation_InsertLocation(lat, lon));
            }
        }
    }
    catch(err){
        
    }
});

export default route;