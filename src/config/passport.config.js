import passport from "passport";
import LocalStrategy from "passport-local";
import UserModel from "../dao/models/users.model.js";
import { createHash } from "../utils.js";
import GithubStrategy from "passport-github2";

export const initializedPassport = () => {
  passport.use(
    "signupStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, username, password, done) => {
        try {
          const user = await UserModel.findOne({ email: username });
          if (user) {
            return done(null, false);
          }
          let rol = "user";
          if (
            username === "adminCoder@coder.com" &&
            password === "adminCod3r123"
          ) {
            rol = "admin";
          }
          const newUser = {
            email: username,
            password: createHash(password),
            rol,
          };
          const userCreated = await UserModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
  /// LOGIN CON GITHUB
  passport.use(
    "githubSignup",
    new GithubStrategy(
      {
        clientID: "Iv1.7a4cc81d82f6b4fe",
        clientSecret: "9b340afe9f8f589b7e534396d269f08129861cd3",
        callbackURL: "http://localhost:8080/api/sessions/github-callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const user = await UserModel.findOne({ email: profile.username });
          if (user) {
            return done(null, user);
          }
          const newUser = {
            email: profile.username,
          };
          const userCreated = await UserModel.create(newUser);
          return done(null, userCreated);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  //SERIALIZAR
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await UserModel.findById(id);
    return done(null, user);
  });
};

