import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import userRouter from "./routers/userRouter";
import videoRouter from "./routers/videoRouter";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use(helmet());
app.set("view engine", "pug");
// express.static(): 주어진 directory에서 file을 전달하는 middleware 함수
app.use("/uploads", express.static("uploads"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan("dev"));

app.use(localsMiddleware);

// helmet 업데이트로 비디오 재생 불가 > content security policy를 변경
app.use(function(req, res, next) {
    res.setHeader("Content-Security-Policy", "script-src 'self' https://archive.org");
    return next();
    });

// get이 아닌 use 메서드를 쓰면, router 파일의 전체 경로를 지정함
app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);

export default app;