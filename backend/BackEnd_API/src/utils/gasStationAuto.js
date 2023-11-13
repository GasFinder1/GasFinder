const gasInfoServices = require("../services/gasInfoServices.js");
const fuelInfoServices = require("../services/fuelInfoServices.js");
const DB = require("../repository/connection.js");

async function autoCRU_GasStation(data){
    const conn = await DB.DB_Open();
    if(conn != null){
        let errors = {
            numberOfGasStation: (data).length,
            numberOfAlreadyRegisteredGasStation: 0,
            numberOfGasStationQuery: 0,
            numberOfNewGasStation: 0,
            numberOfErrorsOnInsert: 0,
            numberOfEqualGasStations: 0,
            numberOfUpdatedData: 0,
            numberOfFuelsTotal: 0,
            numberOfInsertedFuel: 0,
            numberOfUpdatedFuel: 0,
            numberOfAlreadyRegisteredFuels: 0,
            numberOfFuelErrorsOnInsert: 0,
            numberOfFuelErrorsOnUpdate: 0,
            jsonSize: 0,
            dataInserted: [],
            dataupdated: [],
            dataNotInserted: [],
            dataNotUpdated: [],
            cnpjsNotFound: [],
            fuelInsertError: [],
            fuelUpdateError: []
        };
        try{
            for(const tempData of data){
                try{
                    let rows = await gasInfoServices.checkCNPJ(conn, tempData.cnpj);
                    if (rows.length != 0){
                        if(rows[0].cnpj == tempData.cnpj && rows[0].nome_posto == tempData.nome_posto &&
                            rows[0].fantasia == tempData.fantasia && rows[0].cep == tempData.cep && 
                            rows[0].municipio == tempData.municipio && rows[0].bandeira == tempData.bandeira &&
                            rows[0].numero == tempData.numero && rows[0].bairro == tempData.bairro &&
                            rows[0].complemento == tempData.complemento && rows[0].uf == tempData.uf &&
                            rows[0].endereco == tempData.endereco 
                            ){
                                errors.numberOfEqualGasStations += 1;
                        }
                        else{
                            try{
                                await gasInfoServices.updateGasStation(conn, tempData.nome_posto, tempData.cnpj, tempData.endereco, tempData.fantasia, tempData.cep, tempData.municipio, tempData.bandeira, tempData.numero, tempData.bairro, tempData.complemento, tempData.uf);
                                errors.numberOfUpdatedData += 1;
                                errors.dataupdated.push(tempData);
                            }
                            catch(error){
                                tempData.error = error;
                                errors.dataNotUpdated.push(tempData);
                            }
                        }
                        errors.numberOfAlreadyRegisteredGasStation += 1;
                    }
                    else{
                        try{
                            await gasInfoServices.insertGasStation(conn, tempData.nome_posto, tempData.cnpj, tempData.endereco, tempData.fantasia, tempData.cep, tempData.municipio, tempData.bandeira, tempData.numero, tempData.bairro, tempData.complemento, tempData.uf);
                            errors.numberOfNewGasStation += 1;
                            errors.dataInserted.push(tempData);
                        }
                        catch(error){
                            tempData.error = error;
                            errors.dataNotInserted.push(tempData);
                        }
                    }
                    errors.numberOfFuelsTotal += tempData.produtos.length;
                    rows = await gasInfoServices.checkCNPJ(conn, tempData.cnpj);
                    if(rows.length != 0){
                        for(const obj of tempData.produtos){
                            let rows2 = await fuelInfoServices.checkFuel(conn, rows[0].id_posto, obj.tipo_combustivel);
                            if(rows2.length != 0){
                                if(rows2.valor != obj.valor && rows2.valor != undefined){
                                    try{
                                        await fuelInfoServices.updateFuel(conn, rows[0].id_posto, obj.tipo_combustivel, obj.valor);
                                        errors.updateFuel += 1;
                                    }
                                    catch(error){
                                        errors.numberOfFuelErrorsOnUpdate += 1;
                                        errors.numberOfFuelErrorsOnUpdate.push(error);
                                    }
                                }
                                else
                                {
                                    errors.numberOfAlreadyRegisteredFuels += 1;
                                }
                            }
                            else{
                                try{
                                    fuelInfoServices.insertFuel(conn, rows[0].id_posto, obj.tipo_combustivel, obj.valor);
                                    errors.numberOfInsertedFuel += 1;
                                }
                                catch(error){
                                    errors.numberOfFuelErrorsOnInsert += 1;
                                    errors.numberOfFuelErrorsOnInsert.push(error);
                                }
                            }
                        }
                    }
                }
                catch(error){
                    tempData.error = error;
                    errors.cnpjsNotFound.push(tempData);
                }
            }
        }
        catch(error){
            console.log("não foi possivel fazer alterações no banco de dados:\n" + error)
        }
        finally{
            try{
                conn.end();
            }
            catch(error){
                console.log("não foi possivel fechar a conexão com o banco de dados: \n" + error)
            }
        }
        return errors;
    }
    else{
        return "database off-line";
    }
}
module.exports = { autoCRU_GasStation };