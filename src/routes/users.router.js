import { Router, json } from "express";
import passport from "passport";
import {
  currentUserController,
  loginController,
  logOutController,
} from "../controllers/users.controller.js";

const usersRouter = Router();

usersRouter.use(json());

usersRouter.post("/login", loginController);
usersRouter.get("/logout", logOutController);
usersRouter.get("/current", currentUserController);
usersRouter.get("/github", passport.authenticate("githubSignup"));
usersRouter.post(
  "/signup",
  passport.authenticate("signupStrategy", {
    failureRedirect: "/failure-signup",
  }),
  async (req, res) => {
    res.redirect("/profile");
  }
);

usersRouter.get(
  "/github-callback",
  passport.authenticate("githubSignup", {
    failureRedirect: "/api/sessions/failure-signup",
  }),
  (req, res) => {
    res.send("Usuario autenticado con éxito.");
  }
);

export default usersRouter;
