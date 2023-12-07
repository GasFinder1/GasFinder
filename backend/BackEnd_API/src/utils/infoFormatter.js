function gasInfoFormat(jsonData) {

    let formatedData = [];

    for (const posto of jsonData) {
        let produtos = [];
        for (const produto of posto.PRODUTOS) {
            tipo = getIndexOfFuel(produto.PRODUTO);
            produtos.push({
                tipo_combustivel: tipo,
                valor: commaToDot(produto.PRECO_DE_REVENDA),
                data_coleta: produto.DATA_DA_COLETA,
                unidade_medida: produto.UNIDADE_DE_MEDIDA
            })
        }

        const data = {
            cnpj: formatarCNPJ(`${posto.CNPJ}`),
            nome_posto: removeDoubleSpaces(posto.RAZAO),
            endereco: removeDoubleSpaces(posto.ENDERECO),
            fantasia: (typeof posto.FANTASIA !== 'undefined') ? removeDoubleSpaces(posto.FANTASIA) : "",
            cep: formatarCEP(`${posto.CEP}`),
            municipio: removeDoubleSpaces(posto.MUNICIPIO),
            bandeira: removeDoubleSpaces(posto.BANDEIRA),
            numero: (typeof posto.NUMERO !== 'undefined' && posto.NUMERO !== "" && !isNaN(Number(removePunctuation(posto.NUMERO))) && removePunctuation(posto.NUMERO).length < 6) ? removePunctuation(posto.NUMERO) : 0,
            // numero: (typeof posto.NUMERO !== 'undefined' && posto.NUMERO !== "" && posto.NUMERO !== "S/N" && posto.NUMERO !== "SN" && !isNaN(Number(removePunctuation(posto.NUMERO)))) ? removePunctuation(posto.NUMERO) : 0,
            // numero: (typeof posto.NUMERO !== 'undefined' && posto.NUMERO !== "" && posto.NUMERO !== "S/N" && posto.NUMERO !== "SN" && !isNaN(Number(removePunctuation(posto.NUMERO)))) ? Number(removeDoubleSpaces(removeLetters(decimalToInt(posto.NUMERO)))) : 0,
            // numero: (!isNaN(posto.NUMERO) && Number.isInteger(posto.NUMERO)) ? posto.NUMERO : 0,
            bairro: (typeof posto.BAIRRO !== 'undefined') ? removeDoubleSpaces(posto.BAIRRO) : "",
            complemento: (typeof posto.COMPLEMENTO !== 'undefined') ? removeDoubleSpaces(posto.COMPLEMENTO) : "",
            uf: removeDoubleSpaces(posto.ESTADO),
            produtos: []
        };
        data.produtos = produtos;
        //console.log(data.endereco);
        formatedData.push(data);
    }

    return formatedData;
}
function formatarCNPJ(cnpj) {
    while (cnpj.length < 14) {
        cnpj = `0${cnpj}`;
    }
    return cnpj;
}

function formatarCEP(cep) {
    while (cep.length < 8) {
        cep = "0" + cep;
    }
    return cep;
}

function getIndexOfFuel(fuel) {
    switch (fuel) {
        case "GASOLINA COMUM":
            return 1;
            break;
        case "GASOLINA ADITIVADA":
            return 2;
            break;
        case "ETANOL":
            return 3;
            break;
        case "DIESEL S10":
            return 4;
            break;
        case "DIESEL S500":
            return 5;
            break;
        case "GNV":
            return 6;
            break;
        default:
            return 0;
    }
}

function removeDoubleSpaces(str) {
    if (typeof str !== 'string') {
        return str; // retorna o valor original se não for uma string
    }

    return str.trim().replace(/\s{2,}/g, ' ');
}

function removeLetters(text) {
    return text.toString().replace(/[^0-9]/g, "");
}

function decimalToInt(numeroDecimal) {
    return Math.floor(numeroDecimal);
}

function removePunctuation(text) {
    return text.toString().replace(/[.,]/g, "");
}

function commaToDot(text) {
    return Number(text.toString().replace(/,/g, '.'));
}

function removeGasStationGenericWords(text) {
    const genericWords = ["ltda", "cooperativa", "auto posto", "posto", "-"];
    for (let i = 0; i < genericWords.length; i++) {
        text = text.replace(genericWords[i], '');
    }
    return text;
}

function genericComparator1(nome_posto, endereco, municipio, bairro, estado) {
    return {
        nome_posto: nome_posto.toLowerCase(),
        endereco: endereco.toLowerCase(),
        municipio: municipio.toLowerCase(),
        bairro: bairro.toLowerCase(),
        estado: estado.toLowerCase()
    }
}

function gsInfoOrganizer(data) {
    let organizedData = []
    for (let i = 0; i < data.length; i++) {
        const indexOfGasStation = organizedData.findIndex(obj => obj.id_posto === data[i].id_posto);
        if (indexOfGasStation === -1) {
            organizedData.push({
                place_ID: data[i].place_ID,
                latitude: data[i].latitude,
                longitude: data[i].longitude,
                id_posto: data[i].id_posto,
                cnpj: data[i].cnpj,
                nome_posto: data[i].nome_posto.toLowerCase(),
                endereco: data[i].endereco.toLowerCase(),
                cep: data[i].cep,
                municipio: data[i].municipio.toLowerCase(),
                bandeira: data[i].bandeira.toLowerCase(),
                numero: data[i].numero,
                bairro: data[i].bairro.toLowerCase(),
                uf: data[i].uf,
                estado: data[i].estado.toLowerCase(),
                produtos:
                    [
                        {
                            valor: data[i].valor,
                            nome_combustivel: data[i].nome_combustivel.toLowerCase(),
                            unid_medida: data[i].unid_medida,
                            data_informacao: data[i].data_informacao
                        }
                    ]
            });
        }
        else {
            organizedData[indexOfGasStation]["produtos"].push({
                valor: data[i].valor,
                nome_combustivel: data[i].nome_combustivel.toLowerCase(),
                unid_medida: data[i].unid_medida,
                data_informacao: data[i].data_informacao
            });
        }
    }
    return organizedData;
}
function gsInfoNoRepeat(data) {
    let organizedData = [];
    for (let i = 0; i < data.length; i++) {
        const indexOfGasStation = organizedData.findIndex(obj => obj.id_posto === data[i].id_posto);
        if (indexOfGasStation === -1) {
            organizedData.push(data[i]);
        }
    }
    return organizedData;
}

function isFloat(value) {
    return Number.isFinite(value);
}

function mapsToObj(maps) {
    // return maps
    const regexAddress1 = /^(.*?),\s*([^,-]+(?:-[^,]+)?)\s*-\s*([^,]+),\s*([^,]+)/;
    const regexAddress2 = /State of ([^,]+)/;
    let valuesToReturn = { data: [], gsInvalidator: [] };
    maps.map(item => {
        // console.log(item);
        // return item
        let id_posto = false;
        try {
            id_posto = item.id_posto ?? false;
            if (id_posto == false) throw new Error("id_posto invalido");
            if ("error" in item) throw new Error("não foi possível encontrar os dados do posto na api");
            let data = [];
            for (let i = 0; i < item.data.length; i++) {
                try {
                    const place_ID = item.data[i].place_id ?? false;
                    const latitude = item.data[i].geometry.location.lat ?? false;
                    const longitude = item.data[i].geometry.location.lng ?? false;
                    const completeAdress = item.data[i]["formatted_address"] ?? false;
                    const compoundCode = item.data[i]["plus_code"]["compound_code"] ?? false;
                    const nome_posto = item.data[i]["name"] ?? false;
                    let matches = completeAdress.match(regexAddress1);
                    const endereco = matches[1] ?? false;
                    const bairro = matches[3] ?? false;
                    const municipio = matches[4] ?? false;
                    matches = compoundCode.match(regexAddress2);
                    const estado = matches[1] ?? false;
                    if (!([place_ID, latitude, longitude, nome_posto, endereco, bairro, municipio, estado].includes(false)))
                        data.push({ place_ID, latitude, longitude, nome_posto, endereco, bairro, municipio, estado });
                }
                catch (err) {
                    //LOG_HERE
                }
            }
            if (data.length > 0)
                valuesToReturn.data.push({ id_posto, data });
        }
        catch (err) {
            //LOG_HERE
            if (err == "alguma informação não foi pega" && id_posto != false) valuesToReturn.gsInvalidator.push({ id_posto, err });
            if (err == "id_posto invalido") console.log(`o seguinte posto está com a id_posto invalida:
            ${item}`);
            if (err == "não foi possível encontrar os dados do posto na api" && id_posto != false) valuesToReturn.gsInvalidator.push({ id_posto, err });
            console.log(err);
        }
    });
    return valuesToReturn;
}

function favoriteInfoOrganizer(data) {
    let organizedData = []
    for (let i = 0; i < data.length; i++) {
        const indexOfGasStation = organizedData.findIndex(obj => obj.id_posto === data[i].id_posto);
        if (indexOfGasStation === -1) {
            organizedData.push({
                id_favorito: data[i].id_favorito,
                place_ID: data[i].place_ID,
                latitude: data[i].latitude,
                longitude: data[i].longitude,
                id_posto: data[i].id_posto,
                cnpj: data[i].cnpj,
                nome_posto: data[i].nome_posto.toLowerCase(),
                endereco: data[i].endereco.toLowerCase(),
                cep: data[i].cep,
                municipio: data[i].municipio.toLowerCase(),
                bandeira: data[i].bandeira.toLowerCase(),
                numero: data[i].numero,
                bairro: data[i].bairro.toLowerCase(),
                uf: data[i].uf,
                estado: data[i].estado.toLowerCase(),
                produtos:
                    [
                        {
                            valor: data[i].valor,
                            nome_combustivel: data[i].nome_combustivel.toLowerCase(),
                            unid_medida: data[i].unid_medida,
                            data_informacao: data[i].data_informacao
                        }
                    ]
            });
        }
        else {
            organizedData[indexOfGasStation]["produtos"].push({
                valor: data[i].valor,
                nome_combustivel: data[i].nome_combustivel.toLowerCase(),
                unid_medida: data[i].unid_medida,
                data_informacao: data[i].data_informacao
            });
        }
    }
    return organizedData;
}

export default { favoriteInfoOrganizer, gasInfoFormat, removeDoubleSpaces, removeLetters, removeGasStationGenericWords, genericComparator1, gsInfoOrganizer, gsInfoNoRepeat, isFloat, mapsToObj }