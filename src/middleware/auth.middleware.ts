import { Request, Response, NextFunction } from "express";
import passport from "passport";

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  passport.authenticate("jwt", { session: false }, (error: any, user: any) => {
    if (error || !user) {
      return res.status(401).json({ message: "Unauthorized." });
    }
    req.user = user;
    next();
  })(req, res, next);
};
