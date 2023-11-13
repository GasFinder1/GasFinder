import express from 'express';
import database from '../services/checkServices.js';
import { generatePassword } from '../helpers/recoverPassword.js';
import nodemailer from 'nodemailer';
import 'dotenv/config';

const router = express.Router();

router.post('/', async (request, response) => {
  try {
    const { email: userEmail } = request.body; // Renomeie a variável para evitar conflito
    const user = await database.checkEmail(userEmail);
    console.log(user);

    if (user.length > 0) {
      const newPassword = generatePassword();
      await database.changePassword(userEmail, newPassword);

      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        auth: {
          user: process.env.NODEMAILER_USER,
          pass: process.env.NODEMAILER_PASS,
        },
        tls: {
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail({
        from: 'GasFinder <testesgasfinder@gmail.com>',
        to: userEmail, // Usar a variável userEmail aqui
        subject: 'Pedido de nova senha realizado.',
        html: `<h1>Senha alterada com sucesso</h1>
        <p>Prezado Usuário,</p>
        <p>Recebemos uma solicitação de recuperação de senha para a sua conta no Gas Finder. Como parte do nosso processo de segurança, geramos uma nova senha temporária para você acessar a sua conta.</p>
        <p>Abaixo, você encontrará as informações necessárias para redefinir a sua senha:</p>
        <p><strong>Código de Recuperação de Senha:${newPassword},</strong> </p>
        <p>Para redefinir a sua senha, siga estas etapas simples:</p>
        <ol>
          <li>Insira o seu nome de usuário ou endereço de e-mail associado à sua conta.</li>
          <li>Digite o código de recuperação de senha fornecido acima.</li>
          <li>Siga as instruções na tela para criar uma nova senha segura.</li>
        </ol>
        <p>Lembramos que este código de recuperação de senha é válido por 2 horas a partir do recebimento deste e-mail. Recomendamos que você redefina a sua senha imediatamente.</p>
        <p>Se você não solicitou esta recuperação de senha ou acredita que isso seja um erro, entre em contato conosco imediatamente para que possamos investigar.</p>
        <p>Agradecemos por escolher o Gas Finder e estamos à disposição para ajudar com qualquer dúvida ou problema que você possa ter.</p>
        <p>Atenciosamente,</p>
        <p>A Equipe de Suporte GasFinder</p> `
      })
        .then(() => {
          console.log('E-mail enviado com sucesso.');
          return response.status(202).json({ message: "E-mail enviado com sucesso." });
        })
        .catch((err) => {
          //LOG_HERE
          console.log(`Houve um erro: ${err}`);
          return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
        });
    } else {
      return response.status(404).json({ error: "Usuário não encontrado" });
    }
  } catch (err) {
    //LOG_HERE
    console.log(err);
    return response.status(500).json({ error: "houve algum problema com a sua solicitação, um log com as informações será registrado para realização de correções" });
  }
});

export default router;
