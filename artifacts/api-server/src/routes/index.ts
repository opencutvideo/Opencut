import { Router, type IRouter } from "express";
import healthRouter from "./health";
import usersRouter from "./users";

const router: IRouter = Router();

router.use(healthRouter);
router.use("/users", usersRouter);

export default router;
