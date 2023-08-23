import { Request, Response, NextFunction } from "express";

import { getUserData } from "../jwt";

export const isConnected = (isLoggedIn = true, privileges = ["user"], redirectTo = "/") => async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const user = await getUserData(req.cookies.at);

  console.log({ user }, req.cookies.at);

  if (!user && !isLoggedIn) {
    return next();
  }

  if (user && isLoggedIn) {
    if (privileges.includes("god") && user.privilege === "god") {
      return next();
    }

    if (privileges.includes("admin") && user.privilege === "admin") {
      return next();
    }

    res.redirect(redirectTo);
  } else {
    res.redirect(redirectTo);
  }
};
