import jwt from "jsonwebtoken";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Token is not found / Unauthorized" });
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    if (!verifyToken) {
      return res
        .status(401)
        .json({ message: "User does not have a valid token" });
    }

    req.userId = verifyToken.userId;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: `Authentication error: ${err.message}` });
  }
};
