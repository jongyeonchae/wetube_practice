import mongoose from "mongoose";
import dotenv from "dotenv";
// dotenv.config(): .env 파일 import 및 파일 내 변수 접근 가능(process.env.KEY)
dotenv.config();


// terminal 에서 mongo 를 입력하여 mongo url 확인
// useNewUrlParser, useFindMyModify 설정은 mongodb에서 요청사항이므로 기본으로 입력
mongoose.connect(
    process.env.MONGO_URL, 
    {
    useNewUrlParser: true,
    useFindAndModify: false
    }
);

const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log(`❌ Error on DB Connection:${error}`);


db.once("open", handleOpen);
db.on("error", handleError);