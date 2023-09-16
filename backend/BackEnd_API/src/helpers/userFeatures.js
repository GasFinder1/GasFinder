import jwt from 'jsonwebtoken';
  function generateToken(idUser, email) {
      const secret = "z9Rf!nQ9*WB3";
      return jwt.sign({infoUser: {idUser, email}}, 
      secret, {expiresIn: 60 * 60 * 5});
  }
export {generateToken};