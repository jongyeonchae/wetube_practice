import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config(): .env 파일 import 및 파일 내 변수 접근 가능(process.env.KEY)
dotenv.config();

// PRODUCTION 배포환경(PRODUCTION=true)이라면 MONGO_URL_PROD 을 사용, 아닐 경우 MONGO_URL 사용.
mongoose.connect(process.env.PRODUCTION ? process.env.MONGO_URL_PROD : process.env.MONGO_URL, {
  useNewUrlParser: true,
  useFindAndModify: false,
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);

db.once("open", handleOpen);
db.on("error", handleError);
