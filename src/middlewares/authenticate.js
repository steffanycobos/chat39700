import passport from "passport";
export const checkRole = (roles) => {
    return (req, res, next) => {
      // AUTENTICADO
      if (!req.user) {
        console.log(req.user)
        return res.json({
          status: "error",
          message: "You need to be authenticated",
        });
      }
      // AUTORIZADO
      if (!roles.include(req.user.rol)) {
        return res.json({ status: "error", message: "You are not authorized" });
      }
      next();
    };
  };
  export const isUserAuthenticate = (req, res, next) => {
    if (req.user) {
      next();
    } else {
      res.redirect("/products");
    }
  };
    

export const authenticate = (strategy)=>{
    const passportAuthenticate = async(req,res,next)=>{
        passport.authenticate(strategy,{session:false},(err,user,info)=>{
            if(err) return next(err);
            if(!user){
                return res.status(401).json({error:info.toString()});
            }
            req.user=user;
            next();
        })(req,res,next);
    };
    return passportAuthenticate;
  }