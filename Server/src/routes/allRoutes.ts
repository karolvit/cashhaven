import { Router } from "express";
import { authenticateToken } from "../config/authMiddleware";

import user from "./user.routes";
import param from "./param.routes";
import client from "./client.routes";
import stock from "./stock.routes";
import auth from "./auth.routes";
import intWpp from "./int.wpp.routes";
import sale from "./sale.routes";
import order from "./order.routes";
import table from "./table.routes";
import nfc from './nfc.routes';
import cx from './cx.routes';
import report from './reports.routes';
import company from './company.routes'
import imp from './imp.routes';

const routes = Router();

routes.use((req, res, next) => {
  if (req.path.startsWith("/auth")) {
    return next(); 
  }
  authenticateToken(req, res, next); 
});

routes.use("/user", user);
routes.use("/param", param);
routes.use("/client", client);
routes.use("/stock", stock);
routes.use("/auth", auth);
routes.use("/int/wpp", intWpp);
routes.use("/sale", sale);
routes.use("/order", order);
routes.use("/table", table);
routes.use("/panel", nfc);
routes.use("/cx", cx);
routes.use("/report", report);
routes.use("/company", company)
routes.use("/imp", imp)

export default routes;
 