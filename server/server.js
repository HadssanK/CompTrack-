import express, { Router } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectDb from "./config/Mongodb.js";
import authRouter from "./Routes/AuthRoute.js";
import userRouter from "./Routes/UserRoute.js";
import IssueRouter from "./Routes/User/EmpIssueRoute.js";
import Adminrouter from "./Routes/Admin/AdminRoutes.js";

const app = express();
const port = process.env.PORT || 4000;
dotenv.config();
ConnectDb();
app.use(express.json());
app.use(cookieParser());

const allowedOrigin = ['http://localhost:5173']

app.use(cors({origin:allowedOrigin  , credentials: true }));
app.use("/getuser", (req, res) => {
  res.send("chala");
});
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);

// User Issue Endpoint
app.use("/api/issue" , IssueRouter)
// Use admin routes
app.use('/api/admin', Adminrouter);

app.listen(port, () => {
  console.log(`server started on PORT ${port}`);
});
