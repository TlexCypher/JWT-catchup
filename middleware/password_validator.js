/* The function, password_validator is the middleware function that is responsible for validating password.
 * In this case, password should be longer than eight characters.
 */

const password_validator = (req, res, next) => {
  const password = req.body.password
  if (is_valid_password(password)) {
    req.body.password_validated = true;
  } else {
    req.body.password_validated = false;
  }
  /*This function is the middleware, so should call next()*/
  next();
}

const is_valid_password = (password) => {
  return password.length >= 8
}

module.exports = password_validator
