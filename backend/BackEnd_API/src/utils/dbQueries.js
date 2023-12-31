async function call(conn, sql, values) {
    try {
        await conn.query(sql, values);
        return {message: "cadastrado com sucesso"};
    }
    catch (err) {
        if (["Já existem dados cadastrados para essa localização", "O posto referenciado não existe", "Não foi possível inserir os dados",
            "Erro ao atualizar os dados de avaliação", "Erro ao inserir os dados de avaliação", "Erro ao atualizar o comentario",
            "Erro ao inserir o comentario", "Erro ao inserir na tabela de avaliação, posto inexistente",
            "Erro ao inserir na tabela de avaliação, usuario inexistente", "Os dados já estão cadastrados",
            "existe outro usuário cadastrado com esse email"].includes(err.sqlMessage)) {
            return { error: err.sqlMessage, error_code: 400 };
        }
        else {
            //LOG_HERE
            console.log(err)
            return { error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções", error_code: 500 };
        }
    }
}

export default { call };