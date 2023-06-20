
export const checkRole = (roles) => {
    return (req, res, next) => {
      // AUTENTICADO
      //console.log(req.user, 'check')
      if (!req.user) {
        return res.json({
          status: "error",
          message: "You need to be authenticated",
        });
      }
      // AUTORIZADO
      if (!roles.includes(req.user.rol)) {
        return res.json({ status: "error", message: "You are not authorized" });
      }
      next();
    };
  };
