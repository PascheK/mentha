// backend/middleware/requireAuth.ts
import { auth } from "../lib/auth"; // Better Auth côté backend

export const requireAuth = async (req, res, next) => {
  const session = await auth.getSession(req, res);
  if (!session?.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  req.user = session.user;
  next();
};
