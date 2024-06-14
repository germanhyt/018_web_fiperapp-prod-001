import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

export const generateToken = (uid) => {
  const expiredIn = 60 * 15;

  try {
    const token = jwt.sign({ uid }, process.env.SECRET_KEY, {
      expiresIn: expiredIn,
    });
    return { token, expiredIn };
  } catch (error) {
    console.log("Error generating token", error);
    return null;
  }
};

export const generateRefreshToken = (uid, res) => {
  const expiredIn = 60 * 60 * 24 * 30;

  try {
    const refreshToken = jwt.sign({ uid }, process.env.SECRET_KEY, {
      expiresIn: expiredIn,
    });
    console.log("refreshToken", refreshToken);
    // res.setHeader("Set-Cookie", `refreshToken=${refreshToken}; HttpOnly; Path=/; Max-Age=${expiredIn}; SameSite=Strict`);

    cookies(refreshToken).set({
      httpOnly: true,
      path: "/",
      sameSite: "none",
      expires: new Date(Date.now() + expiredIn * 1000),
      maxAge: expiredIn,
    });
    // res.cookie("refreshToken", refreshToken, {
    //   httpOnly: true,
    //   path: "/",
    //   maxAge: expiredIn,
    //   expires: new Date(Date.now() + expiresIn * 1000),
    //   sameSite: "none",
    // });
  } catch (error) {
    console.log("Error generating refresh token", error);
    return null;
  }
};

export const getToken = (req) => {
  const authHeader = req.headers["authorization"];
  console.log("authHeader", authHeader);
  if (!authHeader) {
    return null;
  }

  const token = authHeader.split(" ")[1];
  return token;
};

export const tokenVerificationErrors = {
  "invalid signature": "La firma del JWT no es válida",
  "jwt expired": "JWT expirado",
  "invalid token": "Token no válido",
  "No Bearer": "Utiliza formato Bearer",
  "jwt malformed": "JWT formato no válido",
};
