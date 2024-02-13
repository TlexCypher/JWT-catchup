const router = require('express').Router();
const { public_posts, private_posts } = require('../db/post');
const { jwt_authorized_with_cookie } = require('../middleware/jwt_authorized');

router.get("/public", (req, res) => {
  res.json(public_posts)
})

router.get("/private", jwt_authorized_with_cookie, (req, res) => {
  /* If user would be admin or proper user (e.g. compare with endpoint), private post should be represented.*/
  console.log(req.user)
  res.json(private_posts)
})

module.exports = router
