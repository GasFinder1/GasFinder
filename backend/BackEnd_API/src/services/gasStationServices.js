import database from "../repository/connection.js";
import infoFormatter from "../utils/infoFormatter.js";
import naturalLanguage from "../utils/naturalLanguageComparator.js";

async function requestData(sql, values) {
    let conn = await database.getConnection();
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
                    place_ID: rows[i].place_ID,
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
        //LOG_HERE
        console.log(err);
        return null;
    }
    finally {
        try {
            await conn.end();
        }
        catch (err) {
            //LOG_HERE
        }
    }
}

async function getGasStation(place_ID, cep, endereco, posto) {
    let sql = "SELECT * FROM localizacao_dados_posto WHERE place_ID = ?;";
    let values = [place_ID];

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
    // console.log(sql);
    // console.log(values);
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

async function gasStationManager(placeID, gsName, gsNumber, road, neighborhood, town, state) {
    let conn = await database.getConnection();
    if (conn == null) {
        console.log("banco de dados off-line");
        return null;
    }
    let sql = "SELECT * FROM localizacao_dados_posto WHERE place_ID = ?;";
    let values = [placeID];
    try {
        let [rows] = await conn.query(sql, values);
        if (rows.length >= 1) {
            return infoFormatter.gsInfoOrganizer(rows)[0];
        }
        sql = "SELECT * from dados_posto WHERE estado = ?"
        values = [state];
        if (gsName ?? false) {
            const posto_array = infoFormatter.removeDoubleSpaces(infoFormatter.removeGasStationGenericWords(gsName.toLowerCase())).split(" ");
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
        [rows] = await conn.query(sql, values);
        if (rows.length >= 1) {
            const comparator = infoFormatter.genericComparator1(gsName, road, town, neighborhood, state);
            const gasData = infoFormatter.gsInfoOrganizer(rows);
            const searchText = ["nome_posto", "endereco", "municipio", "bairro"]
            //Rede Neural?
            let similarity = naturalLanguage.getSimilarity(comparator, gasData, searchText);
            if(similarity[0].similarity_AVG > 0.8){
                try{
                    await conn.query("INSERT INTO tbl_localizacao_posto (place_ID, fk_id_posto) VALUES(?, ?)", [placeID, similarity[0].id_posto]);
                    let [rows] = await conn.query("SELECT * FROM localizacao_dados_posto WHERE place_ID = ?;", placeID);
                    return infoFormatter.gsInfoOrganizer(rows);
                }
                catch(err){
                    //LOG_HERE
                    console.error(err)
                }
            }
            return {placeID, possíveis_postos: similarity[0]};
        }
        else{
            return {placeID, error: "não foi possível encontrar um posto com nome similar"};
        }
    }
    catch (err) {
        console.error(err);
        return { place_ID: placeID, error: "não foi possível pesquisar este posto" }
    }
}

export default { getGasStation, gasStationManager };