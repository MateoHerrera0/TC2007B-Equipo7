const bcrypt = require("bcrypt"); // Used to hash
const { User } = require("../models/user"); // user collection
const Joi = require("joi"); // 
const express = require("express");
const generateAuthToken = require("../utils/generateAuthToken");
const router = express.Router(); // Used for api endpoint

router.post("/", async (req, res) => {
  const schema = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().min(3).max(200).required().email(),
    password: Joi.string().min(6).max(200).required(),
    privilege: Joi.string().min(3).max(10).required(),
  });

  const { error } = schema.validate(req.body); // chck if matches -- or error

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email }); 
  if (user) return res.status(400).send("User already exists...");

  console.log("here");

  const { name, email, password, privilege } = req.body;

  user = new User({ name, email, password, privilege });

  const salt = await bcrypt.genSalt(10); // salt = random string
  // user.email = await bcrypt.hash(user.email, salt);
  user.password = await bcrypt.hash(user.password, salt); // hash psw


  await user.save();

  const token = generateAuthToken(user); // json web token generation 

  res.send(token);
});

module.exports = router;