import jwt from 'jsonwebtoken';
import 'dotenv/config';


function verifyJWT(request, response, next) {
   // return next();
   console.log("token aqui: ", request.headers)
   const secret = process.env.JWT_PASSWORD;
   
   const authHeader = request.headers.authorization;
   if (!authHeader)
      return response.status(401).send({ error: 'Token não informado.' });

   const parts = authHeader.split(' ');
   if (parts.length !== 2)
      return response.status(401).send({ error: 'Token inválido.' });

   const [scheme, token] = parts;
   if (!/^Bearer$/i.test(scheme))
      return response.status(401).send({ error: 'Token inválido.' });

   jwt.verify(token, secret, (err, decoded) => {
      if (err) {
         console.error(err);
         return response.status(401).send({ error: 'Usuário não autenticado.' });
      }
      request.infoUser = decoded.infoUser;
      if(request.infoUser.id_usuario != undefined){
         return next();
      }
      return response.status(401).send({ error: 'faltam informações no token' });
   });
}
export { verifyJWT };
