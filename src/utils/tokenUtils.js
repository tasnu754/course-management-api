import jwt from "jsonwebtoken";

const generateTokens = (userId) => {
  const payload = { userId };

  const accessToken = jwt.sign(payload, process.env.JWT_SECRET);

  // const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET,);

  return { accessToken, refreshToken };
};

const verifyToken = (token, secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export default {
  generateTokens,
  verifyToken,
};
