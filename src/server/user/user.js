const express = require('express');
const {check, validationResult} = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express();
const auth = require('../middleware/auth');
const User = require('../model/User');


router.post(
  '/signup',
  [
    check('username', 'Please Enter a Valid Username')
      .not()
      .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    
    const {username, email, password} = req.body;
    try {
      let user = await User.findOne({
        username,
      });
      if (user) throw "User Already Exists"

      user = new User({
        username,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
          password: user.password,
        },
      };

      jwt.sign(
        payload,
        'randomString',
        {
          expiresIn: 10000,
        },
        (err, token) => {
          if (err) throw err;
          res.send({message:'Successfully',payload})
        }
      );
    } catch (err) {
      console.log(err.message);
      res.send({message:err});
    }
  }
);

router.post(
  '/login',
  [
    check('password', 'Please enter a valid password').isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    const {username, password} = req.body;
    try {
      let user = await User.findOne({
        username,
      });
      if (!user) throw "User Not Exist"

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) throw "Incorrect Password";

      const payload = {
        user: {
          id: user.id,
          password: user.password,
          email: user.email
        },
      };
      jwt.sign(
        payload,
        'secret',
        {
          expiresIn: 3600,
        },
        (err, token) => {
          if (err) throw err;
          res.send({message:'Successfully',payload})
        }
      );
      console.log('payload', payload);
    } catch (e) {
      res.send({message: e});
    }
  }
);

router.get('/me', auth, async (req, res) => {
  try {
    // request.user is getting fetched from Middleware after token authentication
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (e) {
    res.send({message: e});
  }
});

module.exports = router;

