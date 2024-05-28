import jwt from "jsonwebtoken";
const secret: string = process.env.NEXT_PUBLIC_JWT_SECRET || "";

export const getAccessKey = (Accounts: string) => {
  try {
    console.log(secret);
    return jwt.sign({ id: Accounts }, secret, {
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "1h", // 유효기간
    });
  } catch (error) {
    console.log("AccessKey Error : ", error);
  }
};
// access Token 검증
export const verify = (token: string) => {
  let decoded: any = null;
  try {
    decoded = jwt.verify(token, secret);
    return {
      ok: true,
      Accounts: decoded.id,
    };
  } catch (error: any) {
    return {
      ok: false,
      message: error.message,
    };
  }
};

export const getRefreshKey = (Accounts: string) => {
  try {
    return jwt.sign({ id: Accounts }, secret, {
      algorithm: "HS256",
      expiresIn: "14d", // 유효기간
    });
  } catch (error) {
    console.log("AccessKey Error : ", error);
  }
};

export const refreshVerify = (token: string) => {
  try {
    jwt.verify(token, secret);
    return true;
  } catch (error) {
    return false;
  }
};

export const UserVerify = async (Address: string, token: string) => {
  try {
    const User = verify(token);

    return User.Accounts === Address;
  } catch (error) {
    console.log("Bad Requset User!!");
  }
};
