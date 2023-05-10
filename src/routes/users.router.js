import { Router, json } from "express";
import passport from "passport";
import { getUserController, deleteController, logOutController, currertSessionController, authenticateGitController, failureSignupController, failureLoginController, signupGithubController } from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.use(json());
usersRouter.post("/login", getUserController)
usersRouter.get("/delete", deleteController);
usersRouter.get("/logout", logOutController);
usersRouter.get('/current', currertSessionController);
usersRouter.get("/github", passport.authenticate("githubSignup"));
usersRouter.post( "/signup",authenticateGitController);
usersRouter.get("/failure-signup",failureSignupController);
usersRouter.get("/login-failes", failureLoginController)
usersRouter.get( "/github-callback", signupGithubController);


export default usersRouter;
