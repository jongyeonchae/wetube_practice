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

export const githubLogin = passport.authenticate(`github`);

// cb(콜백함수): passport에서 제공된 callback 함수로, 전달하는 인자에 따라 다른 결과를 실행.
// 1) 인자에 error없이 user를 전달한 경우: 로그인 성공으로 간주하고, user.id(사용자 식별자)를 쿠키에 포함하고 이후 절차를 진행.
// 2) 인자에 error만 전달한 경우: 로그인 실패로 간주함.
// 함수에 필요없는 인자가 있을 시, _로 대체 가능.
export const githubLoginCallback = async (_, __, profile, cb) => {
  const {
    _json: { id, avatar_url: avatarUrl, name, email },
  } = profile;
  try {
    const user = await User.findOne({ email });
    // user(github에 등록된 email과 동일한 email을 보유)가 있을 경우, user와 이전 계정의 id를 통합하여 동일한 계정으로 확인.
    if (user) {
      user.githubId = id;
      user.save();
      return cb(null, user);
    }
    // user가 없을 시, 새로운 계정으로 생성.
    const newUser = await User.create({
      email,
      name,
      githubId: id,
      avatarUrl,
    });
    return cb(null, newUser);
  } catch (error) {
    return cb(error);
  }
};

export const postGithubLogIn = (req, res) => {
  res.redirect(routes.home);
};

export const facebookLogin = passport.authenticate(`facebook`);

export const facebookLoginCallback = (accessToken, refreshToken, profile, cb) => {
  console.log(accessToken, refreshToken, profile, cb);
};

export const postFacebookLogin = (req, res) => {
  res.redirect(routes.home);
};

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};

export const getMe = (req, res) => {
  res.render("userDetail", { pageTitle: "User Detail", user: req.user });
};

export const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const user = await User.findById(id).populate("videos");
    console.log(user);
    res.render("userDetail", { pageTitle: "User Detail", user });
  } catch (error) {
    res.redirect(routes.home);
  }
};

export const getEditProfile = (req, res) => res.render("editProfile", { pageTitle: "Edit Profile" });

export const postEditProfile = async (req, res) => {
  const {
    body: { name, email },
    file,
  } = req;
  try {
    // 새로운 avatar를 업로드 한 경우, 해당 경로(file.path)를 업로드.
    // 새로운 avatar를 업로드 안한 경우, 기존 경로(req.user.avatarUrl)를 업로드.
    await User.findByIdAndUpdate(req.user.id, {
      name,
      email,
      avatarUrl: file ? file.path : req.user.avatarUrl,
    });
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = (req, res) => res.render("changePassword", { pageTitle: "Change Password" });

export const postChangePassword = async (req, res) => {
  const {
    body: { oldPassword, newPassword, newPassword1 },
  } = req;
  try {
    if (newPassword !== newPassword1) {
      res.status(400);
      res.redirect(`/users/${routes.changePassword}`);
      return;
    }
    await req.user.changePassword(oldPassword, newPassword);
    res.redirect(routes.me);
  } catch (error) {
    res.redirect(`/users/${routes.changePassword}`);
  }
};
