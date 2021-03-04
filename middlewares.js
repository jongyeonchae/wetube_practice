import multer from "multer";
import multers3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

// s3 initialize: user, region 설정
const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
  region: "ap-northeast-1",
});

const multerVideo = multer({
  storage: multers3({
    s3,
    acl: "public-read",
    bucket: "wetube-2/video",
  }),
});
const multerAvatar = multer({
  storage: multers3({
    s3,
    acl: "public-read",
    bucket: "wetube-2/avatars",
  }),
});

export const uploadVideo = multerVideo.single("videoFile");
export const uploadAvatar = multerAvatar.single("avatar");

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "WeTube";
  res.locals.routes = routes;
  // passport JS로 로그인되면, request에 user 객체를 부여함. 아래와 같이 locals로 설정하여, 나머지 template에서 로그인된 user 객체 접근.
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};
