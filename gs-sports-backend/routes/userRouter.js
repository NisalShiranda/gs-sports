import express from 'express';
import { changePassword, changeUserRole, deleteUser, getAllUsers, getCurrentUser, googleLogin, loginUser, saveUser, sendOTP } from '../controllers/userController.js';

const userRouter = express.Router();

userRouter.post("/", saveUser);

userRouter.post("/login", loginUser);
userRouter.post("/google", googleLogin);
userRouter.get("/current", getCurrentUser);
userRouter.post("/sendMail", sendOTP);
userRouter.post("/changePw", changePassword);
userRouter.get("/all", getAllUsers);
userRouter.delete("/:email", deleteUser);
userRouter.put("/changerole/:email", changeUserRole);








export default userRouter;