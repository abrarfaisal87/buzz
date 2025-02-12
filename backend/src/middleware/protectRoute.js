import jwt from "jsonwebtoken";
import prisma from "../db/prisma.js";


const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ error: "Unauthorized - no token found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    if (!decoded) {
      return res.status(401).json({ error: "invalid token" });
    }
    const user = await prisma.user.findUnique({
      where: { id: decoded.userId },
      select: { id: true, username: true, fullname: true, profilePic: true },
    });

    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("error is protect route middleware", error.message);
    return res.status(500).json({ error: "internal server error" });
  }
}
export default protectRoute;
