import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
  try {

    // أخذ الهيدر
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "No token provided"
      });
    }

    // استخراج التوكن
    const token = authHeader.split(" ")[1];

    // التحقق من التوكن
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // تخزين بيانات المستخدم
    req.user = decoded;

    next();

  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    });
  }
};

export default authMiddleware;