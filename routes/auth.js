const email_validator = require('../middleware/email_validator')
const password_validator = require('../middleware/password_validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const dummy_DB = require('../db/user')
const router = require('express').Router()

router.get('/', (req, res) => {
  res.send("Hello Auth")
})
/* 1. validate email and password by using middleware 
   * In general case, if we use express, we should use express validator, 
   * but just in case, for practice, I'd love to implement middleware functions
   * which validate both email and password.
   * */
router.post('/register', email_validator, password_validator, (req, res) => {
  /* 2.grab validation status for both email and password. */
  const is_email_validated = req.body.email_validated;
  const is_password_validated = req.body.password_validated;


  if (!is_email_validated || !is_password_validated) {
    res.status(400).send("Login staus is invalid.")
  } else {
    const email = req.body.email;
    const password = req.body.password;

    /* 3. confirm whether the user is already in database or not. 
         * But, in this case, instead of db, use dummy json data.
         */
    dummy_DB.forEach((user) => {
      if (user.email === email && user.password === password) {
        res.status(400).send("You have been already made account.")
      }
    })

    /* 4. Hash password */
    let hashedPassword = bcrypt.hashSync(password, 10)

    /* 5. Save into database */
    dummy_DB.push({
      email: email,
      password: hashedPassword
    })
    res.status(200).json(
      { msg: "Success to register" }
    )
  }
})

router.get("/login", (req, res) => {
  const { email, password } = req.body;
  const user = dummy_DB.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({
      msg: "Such user does not exist."
    })
  }
  /* Confirm password by decoding password stored in db.*/
  const is_match_password = bcrypt.compareSync(password, user.password)
  if (!is_match_password) {
    return res.status(400).json({
      msg: "Such user does not exist."
    })
  }
  /* 6. Create JWT and send back to the client. */
  const jwt_sercret_key = process.env.JWT_SECRET_KEY
  const token = jwt.sign({
    email
  },
    jwt_sercret_key,
    {
      expiresIn:
        "1h"
    })
  res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 })
  res.status(200).json({
    token: token
  })
})

module.exports = router
