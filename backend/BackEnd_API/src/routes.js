import express from "express";
import routerLogin from './controllers/loginController.js'
import routerUser from "./controllers/userController.js";
import routerPassword from "./controllers/passwordController.js";

const routes = express();

routes.use('/login',routerLogin);
routes.use('/user',routerUser);
routes.use('/password', routerPassword)


export default routes;