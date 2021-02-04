import passport from "passport";
import routes from "../routes";
import User from "../models/User";

export const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

export const postJoin = async (req, res, next) => {
  // 사용자가 입력한 정보(name, email, password, password2)를 가져옴
  const {
    body: { name, email, password, password2 },
  } = req;
  if (password !== password2) {
    // status: Status Code(상태코드)
    res.status(400);
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const user = await User({ name, email });
      await User.register(user, password);
      next();
    } catch (error) {
      console.log(error);
      res.redirect(routes.home);
    }
  }
};

export const getLogin = (req, res) => res.render("login", { pageTitle: "Log In" });

// postJoin의 다음 middleware로, register된 User 정보를 전달받음
// User.js에서의 usernameField 설정으로, authenticate 시 email, password를 확인
export const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

export const logout = (req, res) => {
  // To Do: Process Log Out
  res.redirect(routes.home);
};

export const userDetail = (req, res) => res.render("userDetail", { pageTitle: "User Detail" });
export const editProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });
export const changePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });
