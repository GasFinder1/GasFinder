import database from "../repository/connection.js";
import infoFormatter from "../utils/infoFormatter.js";
import naturalLanguage from "../utils/naturalLanguageComparator.js";

async function connect() {
    try {
        const conn = await database.connect();
        return conn;
    }
    catch (err) {
        console.log(err);
        return null;
    }
}

async function requestData(sql, values) {
    let conn = await connect();
    if (conn == null) {
        console.log("banco de dados off-line");
        return null;
    }
    try {
        const [rows] = await conn.query(sql, values);
        let compact_rows = []
        for (let i = 0; i < rows.length; i++) {
            if (!compact_rows.find((posto) => posto.id_posto == rows[i].id_posto)) {
                compact_rows.push({
                    lat: rows[i].lat,
                    lon: rows[i].lon,
                    id_posto: rows[i].id_posto,
                    cnpj: rows[i].cnpj,
                    nome_posto: rows[i].nome_posto,
                    endereco: rows[i].endereco,
                    // logradouro: rows[i].logradouro,
                    cep: rows[i].cep,
                    municipio: rows[i].municipio,
                    bandeira: rows[i].bandeira,
                    numero: rows[i].numero,
                    bairro: rows[i].bairro,
                    uf: rows[i].uf,
                    estado: rows[i].estado,
                    produtos:
                        [
                            {
                                valor: rows[i].valor,
                                nome_combustivel: rows[i].nome_combustivel,
                                unid_medida: rows[i].unid_medida
                            }
                        ]
                })
            }
            else {
                compact_rows[compact_rows.length - 1].produtos.push(
                    {
                        valor: rows[i].valor,
                        nome_combustivel: rows[i].nome_combustivel,
                        unid_medida: rows[i].unid_medida
                    }
                )
            }
        }
        return compact_rows;
    }
    catch (err) {
        console.log(err);
        return null;
    }
    finally {
        conn.end();
    }
}

async function getGasStation(lat, lon, cep, endereco, posto) {
    let sql = "SELECT * FROM localizacao_dados_posto WHERE lat = ? AND lon = ?;";
    let values = [lat, lon];

    let rows = await requestData(sql, values);
    if (rows != null && rows.length >= 1) {
        return rows;
    }

    sql = "SELECT * FROM dados_posto WHERE cep = ? OR (";
    values = [cep];
    
    if (endereco ?? false) {
        const endereco_array = infoFormatter.removeDoubleSpaces(endereco).split(" ");
        for (let i = 0; i < endereco_array.length; i++) {
            if (i === 0) {
                sql += "(";
            }
            else {
                sql += " OR";
            }
            sql += " endereco LIKE ?";
            values.push("%" + endereco_array[i] + "%");
            if (i + 1 === endereco_array.length) {
                sql += ")";
            }
        }
    }
    if (posto ?? false) {
        const posto_array = infoFormatter.removeDoubleSpaces(posto).split(" ");
        for (let i = 0; i < posto_array.length; i++) {
            if (i === 0) {
                if (sql[sql.length - 1] === "(") {
                    sql += "("
                }
                else {
                    sql += " AND (";
                }
            }
            else {
                sql += " OR";
            }
            sql += " nome_posto LIKE ?";
            values.push("%" + posto_array[i] + "%");
            if (i + 1 === posto_array.length) {
                sql += ")";
            }
        }
    }
    sql += ");"
    sql = sql.replace(" OR ();", ";")
    console.log(sql);
    console.log(values);
    rows = await requestData(sql, values);
    if (rows != null && rows.length >= 1) {
        let objSender = {};
        let fieldNameArray = [];
        if (posto ?? false) {
            objSender.nome_posto = posto;
            fieldNameArray.push("nome_posto");
        }
        if (endereco ?? false) {
            objSender.endereco = endereco;
            fieldNameArray.push("endereco");
        }
        let rows_similarity = naturalLanguage.getSimilarity(objSender, rows, fieldNameArray);
        //adicionar no banco de dados a relação?
        return rows_similarity;
    }
    else {
        return null
    }
}

export default { getGasStation };