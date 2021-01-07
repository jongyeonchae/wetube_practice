import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
// router.js 에서 const userRouter 를 지정해서 export 한 경우
import { userRouter } from "./router";

const app = express();

const handleHome = (req, res) => res.send("Hello from home");

const handleProfile = (req, res) => res.send("Hello, you are on my profile");

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(helmet());
app.use(morgan("dev"));


app.get("/", handleHome);

app.get("/profile", handleProfile);

// get이 아닌 use 메서드를 쓰면, router 파일의 전체 경로를 지정함
app.use("/user", userRouter);


export default app;