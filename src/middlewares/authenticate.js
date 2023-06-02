
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
