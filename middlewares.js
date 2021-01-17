import multer from "multer";
import routes from "./routes";

const multerVideo = multer({ dest: "videos/" });

export const localsMiddleware = (req, res, next)  => {
    res.locals.siteName = "WeTube";
    res.locals.routes = routes;
    // login 된 상태를 설정하기 위해 임의의 변수(user) 생성
    res.locals.user = {
        isAuthenticated: true,
        id: 1
    };
    next();
}

export const uploadVideo = multerVideo.single("videoFile");