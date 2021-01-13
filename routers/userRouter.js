import express from "express";
import routes from "../routes";
import { users, userDetail, editProfile, changePassword } from "../controllers/userController";

const userRouter = express.Router();

userRouter.get(routes.users, users);
// editProfile url 이 userDetail url의 id로 인식되지 않도록 순서 변경
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
// userDetail() 을 실행하면 :id (USER_DETAIL)을 return
userRouter.get(routes.userDetail(), userDetail);

export default userRouter;
