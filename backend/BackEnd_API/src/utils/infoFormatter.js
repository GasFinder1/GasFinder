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
function gsInfoNoRepeat(data){
    let organizedData = [];
    for (let i = 0; i < data.length; i++) {
        const indexOfGasStation = organizedData.findIndex(obj => obj.id_posto === data[i].id_posto);
        if (indexOfGasStation === -1) {
            organizedData.push(data[i]);
        }
    }
    return organizedData;
}

export default { gasInfoFormat, removeDoubleSpaces, removeLetters, removeGasStationGenericWords, genericComparator1, gsInfoOrganizer, gsInfoNoRepeat }