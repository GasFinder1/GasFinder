import express from "express";
import routerLogin from './controllers/loginController.js'
import routerUser from "./controllers/userController.js";
import routerPassword from "./controllers/passwordController.js";
import gasStation from "./controllers/gasStationController.js"
import gs_Confirmation from "./controllers/gasStationConfirmationController.js";
import evaluation from "./controllers/evaluationController.js";
import gasStationPrices from "./controllers/userFuelValuesController.js";
import favorite from "./controllers/favoriteController.js";
import { verifyJWT } from "./middleswares/jwt.js";

const routes = express();

routes.use('/login', routerLogin);
routes.use('/user', routerUser);
routes.use('/password', routerPassword);
routes.use('/station', gasStation);
routes.use('/confirmGasStation', gs_Confirmation);
routes.use('/evaluation', evaluation);
routes.use('/gasStationPrices', gasStationPrices);
routes.use('/favorite', verifyJWT, favorite);


export default routes;