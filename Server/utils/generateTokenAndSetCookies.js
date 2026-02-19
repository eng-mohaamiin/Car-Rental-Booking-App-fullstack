import jwt from "jsonwebtoken";

const generateTokenAndSetCookies = (userId, res) => {
  const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: false, // dev: false, production: true haddii HTTPS
    sameSite: "lax",
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV !== "development",
  });

  return token;
};

export default generateTokenAndSetCookies;
