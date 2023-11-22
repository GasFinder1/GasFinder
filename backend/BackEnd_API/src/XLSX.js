const XLSX = require("xlsx");
const { fileURLToPath } = require("url");
const path = require("path");
const moment = require("moment");

// const __dirname = path.dirname(fileURLToPath(import.meta.url));


function transformSerialDate(serial) {
    const oneDay = 24 * 60 * 60 * 1000;
    const date = new Date((serial - 25569) * oneDay);
    return date;
}

function transformarEstadoParaNumero(estado) {
    const estados = {
        "ACRE": 1,
        "ALAGOAS": 2,
        "AMAPA": 3,
        "AMAZONAS": 4,
        "BAHIA": 5,
        "CEARA": 6,
        "DISTRITO FEDERAL": 7,
        "ESPIRITO SANTO": 8,
        "GOIAS": 9,
        "MARANHAO": 10,
        "MATO GROSSO": 11,
        "MATO GROSSO DO SUL": 12,
        "MINAS GERAIS": 13,
        "PARA": 14,
        "PARAIBA": 15,
        "PARANA": 16,
        "PERNAMBUCO": 17,
        "PIAUI": 18,
        "RIO DE JANEIRO": 19,
        "RIO GRANDE DO NORTE": 20,
        "RIO GRANDE DO SUL": 21,
        "RONDONIA": 22,
        "RORAIMA": 23,
        "SANTA CATARINA": 24,
        "SAO PAULO": 25,
        "SERGIPE": 26,
        "TOCANTINS": 27,
    };

    return estados[estado] || 0;
}

const jsonData = [];

function requestData() {
    const workbook = XLSX.readFile(
        path.join(__dirname, "Downloads", "revendas.xlsx")
    );
    
    const sheet_name_list = workbook.SheetNames;
    const xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    
    return new Promise((resolve) => {
        // console.log(xlData.length);
        xlData.forEach((item) => {
            const cnpj =
                item["AGÊNCIA NACIONAL DO PETRÓLEO, GÁS NATURAL E BIOCOMBUSTÍVEIS - ANP"];
            const cnpjString = cnpj !== undefined ? cnpj.toString() : "";
        
            const date = moment(transformSerialDate(item["__EMPTY_13"]))
                .add(1, "days")
                .format("DD-MM-YYYY");
        
            const posto = cnpjString;
            const combustivel = item["__EMPTY_10"];
            const estado = transformarEstadoParaNumero(item["__EMPTY_8"]);
        
            if (combustivel !== "GLP" && combustivel !== undefined && combustivel !== "PRODUTO") {
                const existingPosto = jsonData.find((posto) => posto.CNPJ === cnpjString);
        
                if (!existingPosto) {
                    jsonData.push({
                        CNPJ: cnpjString,
                        RAZAO: item["__EMPTY"],
                        FANTASIA: item["__EMPTY_1"],
                        ENDERECO: item["__EMPTY_2"],
                        NUMERO: item["__EMPTY_3"],
                        COMPLEMENTO: item["__EMPTY_4"],
                        BAIRRO: item["__EMPTY_5"],
                        CEP: item["__EMPTY_6"],
                        MUNICIPIO: item["__EMPTY_7"],
                        ESTADO: estado,
                        BANDEIRA: item["__EMPTY_9"],
                        PRODUTOS: [
                            {
                                PRODUTO: combustivel,
                                UNIDADE_DE_MEDIDA: item["__EMPTY_11"],
                                PRECO_DE_REVENDA: item["__EMPTY_12"],
                                DATA_DA_COLETA: date,
                            },
                        ],
                    });
                } else {
                    existingPosto.PRODUTOS.push({
                        PRODUTO: combustivel,
                        UNIDADE_DE_MEDIDA: item["__EMPTY_11"],
                        PRECO_DE_REVENDA: item["__EMPTY_12"],
                        DATA_DA_COLETA: date,
                    });
                }
            }
        });
        resolve(jsonData);
    })
}
// imprimirDados();
module.exports = requestData;