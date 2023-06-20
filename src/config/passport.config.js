import passport from "passport";
import LocalStrategy from "passport-local";
import UserModel from "../dao/models/users.model.js";
import { signupEmail, signupTwilio } from "../controllers/users.controller.js";
import { createHash } from "../utils.js";
import GithubStrategy from "passport-github2";
import { isValidPassword } from "../utils.js";

export const initializedPassport = () => {
  ///LOGIN 
  passport.use("loginStrategy",
    new LocalStrategy(
      {
        usernameField: "email",
        passwordFiel: "password",
        passReqToCallback: true,
      },
      async (req, username,password, done) => {
        try {
          const { email, password } = req.body;
          const user = await UserModel.findOne({ email: email }).lean();
          
          if (isValidPassword(password, user.password)) {
            return done(null, user);
          } 
          else{
            req.logger.warning('Credenciales Inválidas')
            return done(null, false, { message: "Credenciales inválidas" });
          }
        }
         catch (err) {
          return done(err);
        }
      }
    )
  );
;
/////SIGNUP
passport.use(
  "signupStrategy",
  new LocalStrategy(
    {
      usernameField: "email",
      passReqToCallback: true,
    },
    async (req, username, password, done) => {
      try {
        const { first_name, last_name, age } = req.body;
        const user = await UserModel.findOne({ email: username });
        if (user) {
          req.logger.info('Usuario registrado anteriormente.')
          return done(null, false);
        }
        let rol = "user";
        if ( username === "adminCoder@coder.com" ) 
        {
          rol = "admin";
        }
        const newUser = {
          first_name,
          last_name,
          age,
          email: username,
          password: createHash(password),
          rol,
        };
        const userCreated = await UserModel.create(newUser);
        await signupEmail(newUser.email);
        // signupTwilio()
        req.logger.info(newUser);
        return done(null, userCreated);
      } catch (error) {
        return done(error);
      }
    }
  )
);

/// LOGIN CON GITHUB
passport.use( "githubSignup",
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
}
