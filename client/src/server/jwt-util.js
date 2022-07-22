const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../../.env" });
const secret = process.env.SECRET_KEY;

module.exports = {
  sign: (user) => {
    // access token 발급
    const payload = {
      // access token에 들어갈 payload
      id: user.userName,
      pwd: user.password,
      nickname: user.nickName,
    };
    console.log(payload);
    return jwt.sign(payload, secret, {
      // secret으로 sign하여 발급하고 return
      algorithm: "HS256", // 암호화 알고리즘
      expiresIn: "7d", // 유효기간
    });
  },
  verify: (token) => {
    // access token 검증
    let decoded = null;
    try {
      decoded = jwt.verify(token, secret);
      return {
        ok: true,
        id: decoded.id,
        pwd: decoded.pwd,
        nickname: decoded.nickname,
      };
    } catch (err) {
      return {
        ok: false,
        message: err.message,
      };
    }
  },
  refresh: () => {
    // refresh token 발급
    return jwt.sign({}, secret, {
      // refresh token은 payload 없이 발급
      algorithm: "HS256",
      expiresIn: "14d",
    });
  },
};
