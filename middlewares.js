import multer from "multer";
import routes from "./routes";

// dest: /uploads/videos/ 로 표기할 시, 프로젝트 파일(WETUBE) 내 directory 로 오해할 수 있음 (서버가 아닌 하드웨어에 업로드)
const multerVideo = multer({ dest: "uploads/videos/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // passport JS로 로그인되면, request에 user 객체를 부여함. 아래와 같이 locals로 설정하여, 나머지 template에서 로그인된 user 객체 접근.
  res.locals.user = req.user || null;
  console.log(req.user);
  next();
};

export const uploadVideo = multerVideo.single("videoFile");
