
export const checkRole = (roles) => {
    return (req, res, next) => {
      // AUTENTICADO
      if (!req.user) {
        return res.json({
          status: "error",
          message: "Necesitas estar autenticado.",
        });
      }
      // AUTORIZADO
      if (!roles.includes(req.user.rol)) {
        return res.json({ status: "error", message: "No estas autorizado para realizar esta acción." });
      }
      next();
    };
  };
