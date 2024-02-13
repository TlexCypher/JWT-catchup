/* The function, jwt_authorized is the middleware function that is responsible for jwt. */

const jwt = require('jsonwebtoken')

const decode_jwt = async (res, token) => {

}

const jwt_authorized_with_header = async (req, res, next) => {
  /*authorizationというヘッダを見て、その中のBearer Tokenを見るのが良いらしい*/
  const auth_header = req.headers["authorization"]
  if (auth_header) {
    const token = auth_header.split(' ')[1];
    /* decode token */
    try {
      let user = await jwt.verify(token, process.env.JWT_SECRET_KEY)
      console.log(user);
      req.user = user.email;
      /*This function is the middleware, so should call next()*/
      next();
    } catch {
      res.status(400).json({
        msg: "Token does not match."
      });
    }
  } else {
    res.status(400).json({
      msg: "You don't have token."
    })
  }
}

const jwt_authorized_with_cookie = async (req, res, next) => {
  const token = req.cookies.jwt
  if (!token) {
    res.status.json({
      msg: "You don't have token."
    })
  } else {
    try {
      let user = await jwt.verify(token, process.env.JWT_SECRET_KEY)
      req.user = user.email;
      /*This function is the middleware, so should call next()*/
      next();
    } catch {
      res.status(400).json({
        msg: "Token does not match."
      });
    }
  }
}

module.exports = { jwt_authorized_with_header, jwt_authorized_with_cookie }
