import passport from "passport";
import User from "./models/User";

// passport 인증방식(LocalStrategy) 설정
// passport local mongoose를 설치했기 떄문에, 이미 만들어진 모듈(createStrategy) 사용 가능
passport.use(User.createStrategy());

// serialization: 쿠키에 포함될 정보(보통 user.id)를 설정
// deserialization: (쿠키를 전달받은)서버에서 해당 쿠키가 어떤 사용자인지 확인하는 설정
// passport local mongoose를 설치했기 떄문에, 이미 만들어진 모듈(serializeUser, deserializeUser) 사용 가능
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
