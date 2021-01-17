import multer from "multer";
import routes from "./routes";

// dest: /uploads/videos/ 로 표기할 시, 프로젝트 파일(WETUBE) 내 directory 로 오해할 수 있음 (서버가 아닌 하드웨어에 업로드)
const multerVideo = multer({ dest: "uploads/videos/" });

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