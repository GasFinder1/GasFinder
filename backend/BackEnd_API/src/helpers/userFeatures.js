import jwt from 'jsonwebtoken';
import 'dotenv/config';

function generateToken(idUser, email) {
  const secret = process.env.JWT_PASSWORD;
  return jwt.sign({ infoUser: { idUser, email } },
    secret, { expiresIn: 60 * 60 * 5 });
}
export { generateToken };