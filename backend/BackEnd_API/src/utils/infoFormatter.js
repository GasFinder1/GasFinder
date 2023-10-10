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
            logradouro: (typeof posto.FANTASIA !== 'undefined') ? removeDoubleSpaces(posto.FANTASIA) : "",
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
        console.log(data.endereco);
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

export default { gasInfoFormat, removeDoubleSpaces, removeLetters }