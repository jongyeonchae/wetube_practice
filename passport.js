import passport from "passport";
import GithubStrategy from "passport-github";
import { githubLoginCallback } from "./controllers/userController";
import User from "./models/User";
import routes from "./routes";

// passport 인증방식(LocalStrategy) 설정
// passport local mongoose를 설치했기 떄문에, 이미 만들어진 모듈(createStrategy) 사용 가능
passport.use(User.createStrategy());

passport.use(
  new GithubStrategy(
    {
      clientID: process.env.GH_ID,
      clientSecret: process.env.GH_SECRET,
      callbackURL: `http://localhost:4000${routes.githubCallback}`,
    },
    githubLoginCallback
  )
);

// serialization: 쿠키에 포함될(세션 스토어에 포함될) 정보(사용자의 식별자, 보통 user.id)를 설정. 처음 로그인 시 실행.
// deserialization: (쿠키를 전달받은)서버에서 해당 쿠키가 어떤 사용자인지 확인하는 설정. 로그인 후 페이지를 방문할 때마다 실행.
// passport local mongoose를 설치했기 떄문에, 이미 만들어진 모듈(serializeUser, deserializeUser) 사용 가능
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
