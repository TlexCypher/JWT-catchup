const router = require('express').Router();
const { public_posts, private_posts } = require('../db/post');
const jwt_authorized = require('../middleware/jwt_authorized');

router.get("/public", (req, res) => {
  res.json(public_posts)
})

router.get("/private", jwt_authorized, (req, res) => {
  res.json(private_posts)
})

module.exports = router
