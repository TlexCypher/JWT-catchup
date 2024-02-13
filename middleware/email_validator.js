/* The function, email_validator is the middleware function that is responsible for validating email.
 * In this case, email should contain @ mark and should have domain expression.
 */

const is_valid_email = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

const email_validator = (req, res, next) => {
  const email = req.body.email;
  if (is_valid_email(email)) {
    req.body.email_validated = true;
  } else {
    req.body.email_validated = false;
  }
  /*This function is the middleware, so should call next()*/
  next();
}

module.exports = email_validator;
