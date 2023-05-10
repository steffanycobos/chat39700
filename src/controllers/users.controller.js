import { getUserService, allUsersService,deleteService, findUSerService } from "../service/users.service.js";
import { isValidPassword } from "../utils.js";
import passport from "passport";


export const getUserController= async(req,res)=>{
    const { email, password } = req.body;
    const user = await findUSerService(email)
    if (!user) {
      res.send("Usuario no encontrado!");
    } else {
      if (email === "adminCoder@coder.com") {
        if (isValidPassword(user, password)) {
          req.session.user = user._id;
          req.session.username = email;
          req.session.rol = "admin";
          console.log(req.session.rol);
          return res.redirect("/products");
        } else {
          res.send("Datos inválidos");
        }
      } else {
        if (isValidPassword(user, password)) {
          req.session.user = user._id;
          req.session.username = email;
          req.session.rol = "user";
          return res.redirect("/products");
        } else {
          res.send("Datos inválidos.");
        }
      }
      return res.redirect("/products");
    }
  };

  export const deleteController= async(req,res)=>{
    let userdeleted= await deleteService()
    res.send(userdeleted)
  }

  export const logOutController= async(req,res)=>{
    req.logOut((error) => {
        if (error) {
          return res.send("No fue posible cerrar sesión.");
        } else {
          req.session.destroy((err) => {
            if (err) return res.send("No fue posible cerrar sesión.");
            res.redirect("/");
          });
        }
      })
    }

    export const currertSessionController= async(req,res)=>{
        if (req.session.user){
       return  res.send({userInfo: req.session})
         }
            res.send('Usuario No Logueado')
          }
 
          
export const authenticateGitController= async(req,res)=>{
    passport.authenticate("signupStrategy",
    {failureRedirect: "/failure-signup" }),
  async (req, res) => {
    res.redirect("/profile");
  }
}

export const failureSignupController= async(req,res)=>{
    res.send("No fue posible registrar el usuario");
}
export const failureLoginController= async  (req, res) => {
    res.send("No fue posible loguearse");
  }

  export const signupGithubController= async (req,res)=>{
    passport.authenticate("githubSignup", {
        failureRedirect: "/api/sessions/failure-signup",
      }),(req, res) => {
        res.send("Usuario autenticado con éxito.");
      }
  }