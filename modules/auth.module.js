const jwt = require("jsonwebtoken");
const jwtSecret = process.env.jwtSecret || "secret";
const tokenExpirationInMinutes = 1200;

module.exports = {
  async issueToken(payload, expirytime) {
    var expiry = expirytime ? expirytime : tokenExpirationInMinutes;
    var token = jwt.sign(payload, process.env.TOKEN_SECRET || jwtSecret, {
      expiresIn: expiry * 60
    });
    return token;
  },

  async verifyToken(token, cb) {
    return jwt.verify(token, process.env.TOKEN_SECRET || jwtSecret, cb);
  }
};
