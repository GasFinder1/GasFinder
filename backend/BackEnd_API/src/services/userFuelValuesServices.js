import database from "../repository/connection.js"

async function setFuelPrice(idUser, place_ID, value, fuelType) {
    const conn = await database.getConnection();
    if (conn === null) return { error: "não foi possível se comunicar com o banco de dados" }
    try {
        let sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?"
        let [rows] = await conn.execute(sql, [place_ID]);
        if (rows.length === 0) throw new Error("não foi possível pegar um posto na seguinte place_ID: " + place_ID);
        sql = "INSERT INTO tbl_colaborativa (valor_inserido, fk_id_combustivel, fk_id_tlp, fk_id_usuario) VALUES (?, ?, ?, ?)";
        const values = [value, fuelType, rows[0].id_tlp, idUser];
        await conn.execute(sql, values);
        return { message: "inserido com sucesso!" };
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        return { error: "houve algum erro ao preocessar as informações" };
    }
    finally {
        await conn.release();
    }
}

async function updateFuelPrice(idUser, place_ID, value, fuelType) {
    const conn = await database.getConnection();
    if (conn === null) return { error: "não foi possível se comunicar com o banco de dados" }
    try {
        let sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?"
        let [rows] = await conn.execute(sql, [place_ID],);
        if (rows.length === 0) throw new Error("não foi possível pegar um posto na seguinte place_ID: " + place_ID);
        sql = "UPDATE tbl_colaborativa SET valor_inserido = ? WHERE fk_id_combustivel = ? AND fk_id_tlp = ? AND fk_id_usuario = ?";
        const values = [value, fuelType, rows[0].id_tlp, idUser];
        const [result] = await conn.execute(sql, values);
        if (result.affectedRows > 0) return { message: "atualizado com sucesso!" };
        throw new Error("não foi possível atualizar");
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        return { error: "houve algum erro ao atualizar as informações" }
    }
    finally {
        await conn.release();
    }
}

async function deleteFuelPrice(idUser, place_ID) {
    const conn = await database.getConnection();
    if (conn === null) return { error: "não foi possível se comunicar com o banco de dados" }
    try {
        let sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?"
        let [rows] = await conn.execute(sql, [place_ID],);
        if (rows.length === 0) throw new Error("não foi possível pegar um posto na seguinte place_ID: " + place_ID);
        sql = "DELETE FROM tbl_colaborativa WHERE fk_id_tlp = ? AND fk_id_usuario = ?";
        const values = [rows[0].id_tlp, idUser];
        const [result] = await conn.execute(sql, values);
        if (result.affectedRows > 0) return { message: "deletado com sucesso!" };
        throw new Error("não foi possível deletar");
    }
    catch (err) {
        //LOG_HERE
        console.log(err);
        return { error: "nenhum dado foi deletado" }
    }
    finally {
        await conn.release();
    }
}

async function getFuelInsertedByUser(idUser, place_ID) {
    const conn = await database.getConnection();
    if (conn === null) return { error: "não foi possível se comunicar com o banco de dados" }
    try {
        let sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?"
        let [rows] = await conn.execute(sql, [place_ID],);
        if (rows.length === 0) throw new Error("não foi possível pegar um posto na seguinte place_ID: " + place_ID);
        sql = "SELECT * FROM tbl_colaborativa WHERE fk_id_tlp = ? AND fk_id_usuario = ?";
        const values = [rows[0].id_tlp, idUser];
        [rows] = await conn.execute(sql, values);
        if (rows.length < 1) throw new Error("não foi encontrado nenhum valor inserido por esse usuário nesse posto");
        return rows;
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return { error: "não foi possível pegar os dados" };
    }
    finally {
        await conn.release();
    }
}

async function getFuelValuesByPlaceID(place_ID) {
    const conn = await database.getConnection();
    if (conn === null) return { error: "não foi possível se comunicar com o banco de dados" }
    try {
        let data = { gasolina: false, gasolinaA: false, etanol: false,
        dieselS10: false, dieselS500: false, gnv: false};
        let sql = "SELECT * FROM tbl_localizacao_posto WHERE place_ID = ?"
        let [rows] = await conn.execute(sql, [place_ID],);
        if (rows.length === 0) throw new Error("não foi possível pegar um posto na seguinte place_ID: " + place_ID);
        sql = `SELECT valor_inserido, COUNT(*) AS contador
        FROM tbl_colaborativa
        WHERE dt_atualização >= DATE_SUB(CURDATE(), INTERVAL 2 MONTH)
        AND fk_id_tlp = ?
        AND fk_id_combustivel = ?
        GROUP BY valor_inserido
        ORDER BY contador DESC, valor_inserido DESC
        LIMIT 10;`;
        const id_tlp = rows[0].id_tlp;
        let field = null;
        for (let i = 1; i <= 6; i++) {
            [rows] = await conn.execute(sql, [id_tlp, i]);
            console.log(rows)
            if (i == 1) field = "gasolina"
            else if (i == 2) field = "gasolinaA"
            else if (i == 3) field = "etanol"
            else if (i == 4) field = "dieselS10"
            else if (i == 5) field = "dieselS500"
            else if (i == 6) field = "gnv"
            if (rows.length > 0) data[field] = rows;
        }
        return data;
    }
    catch (err) {
        //LOG_HERE
        console.error(err);
        return { error: "não foi possível pegar os dados" };
    }
    finally {
        await conn.release();
    }
}

export default { setFuelPrice, updateFuelPrice, deleteFuelPrice, getFuelInsertedByUser, getFuelValuesByPlaceID }