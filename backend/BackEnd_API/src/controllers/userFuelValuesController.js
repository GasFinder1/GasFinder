import express from "express";
import fuelValue from "../services/userFuelValuesServices.js"
import { verifyJWT } from "../middleswares/jwt.js";
const route = express.Router();

route.post('/', verifyJWT, async (request, response) => {
    try {
        const { placeID, gasoline, addGasoline, ethanol, s10Diesel, s500Diesel, cng } = request.body;
        const idUser = request.infoUser.id_usuario;
        const values = [gasoline, addGasoline, ethanol, s10Diesel, s500Diesel, cng];

        if (!placeID) return response.status(400).json({ error: "a placeID é inválida" });
        if (!idUser) return response.status(400).json({ error: "a idUser está invalida" });
        if (values.filter(valor => !valor).length === values.length) return response.status(400).json({ error: "precisa retornar pelo menos um valor de combustível" });

        let queue = [];
        let data = [];

        for (let i = 0; i < values.length; i++) {
            if (isFinite(values[i]) && (values[i] || false)) queue.push(fuelValue.setFuelPrice(idUser, placeID, values[i], (i + 1)));
        }

        await Promise.all(queue).then((values) => {
            data = values;
        }).catch(err => console.log(err));
        let q = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i].error === undefined) q += 1;
        }
        if(q === data.length) return response.status(200).json({ message: "inserido com sucesso" });
        if(q >= 1) return response.status(206).json({ message: "nem todos os dados forma inseridos" });
        throw new Error("não foi possível inserir nenhum posto");
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "não foi possível inserir nenhum dado, um log será salvo para correções" });
    }
});

route.put('/', verifyJWT, async (request, response) => {
    try {
        const { placeID, gasoline, addGasoline, ethanol, s10Diesel, s500Diesel, cng } = request.body;
        const idUser = request.infoUser.id_usuario;
        const values = [gasoline, addGasoline, ethanol, s10Diesel, s500Diesel, cng];

        if (!placeID) return response.status(400).json({ error: "a placeID é inválida" });
        if (!idUser) return response.status(400).json({ error: "a idUser está invalida" });
        if (values.filter(valor => !valor).length === values.length) return response.status(400).json({ error: "precisa retornar pelo menos um valor de combustível" });

        let queue = [];
        let data = [];

        for (let i = 0; i < values.length; i++) {
            if (isFinite(values[i]) && (values[i] || false)) queue.push(fuelValue.updateFuelPrice(idUser, placeID, values[i], (i + 1)));
        }

        await Promise.all(queue).then((values) => {
            data = values;
        }).catch(err => console.log(err));
        let q = 0;
        for(let i = 0; i < data.length; i++){
            if(data[i].error === undefined) q += 1;
        }
        if(q === data.length) return response.status(200).json({ message: "atualizado com sucesso" });
        if(q >= 1) return response.status(206).json({ message: "nem todos os dados foram atualizados" });
        throw new Error("não foi possível atualizar nenhum posto");
        // return response.status(200).json({ message: "atualizado com sucesso!" });
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "não foi possível atualizar nenhum dado" });
    }
});

route.put('/', verifyJWT, async (request, response) => {
    try {
        const { placeID, gasoline, addGasoline, ethanol, s10Diesel, s500Diesel, cng } = request.body;
        const idUser = request.infoUser.id_usuario;
        const values = [gasoline, addGasoline, ethanol, s10Diesel, s500Diesel, cng];

        if (!placeID) return response.status(400).json({ error: "a placeID é inválida" });
        if (!idUser) return response.status(400).json({ error: "a idUser está invalida" });
        if (values.filter(valor => !valor).length === values.length) return response.status(400).json({ error: "precisa retornar pelo menos um valor de combustível" });

        let queue = [];
        let data = [];

        for (let i = 0; i < values.length; i++) {
            if (isFinite(values[i]) && (values[i] || false)) queue.push(fuelValue.updateFuelPrice(idUser, placeID, values[i], (i + 1)));
        }

        await Promise.all(queue).then((values) => {
            data = values;
        }).catch(err => console.log(err));
        return response.status(200).json({ message: "atualizado com sucesso!" });
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "não foi possível atualizar, um log será salvo para correções" });
    }
});

route.delete('/', verifyJWT, async (request, response) => {
    try {
        const { placeID } = request.body;
        const idUser = request.infoUser.id_usuario;

        if (!placeID) return response.status(400).json({ error: "a placeID é inválida" });
        if (!idUser) return response.status(400).json({ error: "a idUser está invalida" });

        const res = await fuelValue.deleteFuelPrice(idUser, placeID);
        if (res.error === undefined) return response.status(200).json({ message: "deletado com sucesso!" });
        throw new Error("não foi possível deletar o dado");
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "não foi possível deletar nenhum dado" });
    }
});

route.post('/get/', verifyJWT, async (request, response) => {
    try {
        const { placeID } = request.body;
        const idUser = request.infoUser.id_usuario;

        if (!placeID) return response.status(400).json({ error: "a placeID é inválida" });
        if (!idUser) return response.status(400).json({ error: "a idUser está invalida" });

        const rows = await fuelValue.getFuelInsertedByUser(idUser, placeID);
        if (rows.error === undefined) return response.status(200).json(rows);
        throw new Error("não foi possível pegar nenhum dado");
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "não foi possível pegar nenhum dado" });
    }
});

route.post('/get/all/', async (request, response) => {
    try {
        const { placeID } = request.body;

        if (!placeID) return response.status(400).json({ error: "a placeID é inválida" });

        const rows = await fuelValue.getFuelValuesByPlaceID(placeID);
        if (rows.error === undefined) return response.status(200).json(rows);
        throw new Error("não foi possível pegar nenhum dado");
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return response.status(500).json({ error: "não foi possível pegar nenhum dado" });
    }
});

export default route;