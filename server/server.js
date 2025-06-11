import express, { Router } from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import ConnectDb from "./config/Mongodb.js";
import authRouter from "./Routes/AuthRoute.js";
import userRouter from "./Routes/UserRoute.js";
import IssueRouter from "./Routes/User/EmpIssueRoute.js";
import Adminrouter from "./Routes/Admin/AdminRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

ConnectDb();
app.use(express.json());
app.use(cookieParser());

// ✅ Allow both local and deployed frontend origins
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://comptrack-frontend.onrender.com'
// ];

app.use(cors());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/issue", IssueRouter);
app.use('/api/admin', Adminrouter);

app.listen(port, () => {
  console.log(`Server started on PORT ${port}`);
});
