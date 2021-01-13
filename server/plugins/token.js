const jwt = require('jsonwebtoken');
const secret = 'tokenSecret'; //私钥

const setToken = (val, time) => {
  return jwt.sign({ ...val }, secret, {
    expiresIn: time
  });
};
const getToken = token => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, function(err, decode) {
      if (err) {
        console.log(err);
        reject(err);
      } else {
        resolve(decode);
      }
    });
  });
};

module.exports = { setToken, getToken };
