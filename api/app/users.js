const express = require('express');
const mongoose = require("mongoose");
const User = require("../models/User");
const auth = require("../middleware/auth");
const config = require('../config');
const axios = require('axios');
const {nanoid} = require("nanoid");
const fs = require('fs');
const request = require('request');

const router = express.Router();

router.post('/', async (req, res, next) => {
  try {
    const user = new User({
      email: req.body.email,
      password: req.body.password,
    });

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).send(error);
    }

    return next(error);
  }
});

router.post('/sessions', async (req, res) => {
  try {
    const user = await User.findOne({email: req.body.email});

    if (!user) {
      return res.status(400).send({error: 'Email not found'});
    }

    const isMatch = await user.checkPassword(req.body.password);

    if (!isMatch) {
      return res.status(400).send({error: 'Password is wrong'});
    }

    user.generateToken();
    await user.save();

    return res.send(user);
  } catch (e) {
    next(e);
  }
});

router.get('/secret', auth, async (req, res, next) => {
  try {
    return res.send({message: 'Hello, ' + req.user.email});
  } catch (e) {
    next(e);
  }
});

router.delete('/sessions', async (req, res, next) => {
  try {
    const token = req.get('Authorization');
    const message = {message: 'OK'};

    if (!token) return res.send(message);

    const user = await User.findOne({token});

    if (!user) return res.send(message);

    user.generateToken();
    await user.save();

    return res.send(message);
  } catch (e) {
    next(e);
  }
});

router.post('/facebookLogin', async (req, res, next) => {
  try {
    const inputToken = req.body.authToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    const response = await axios.get(debugTokenUrl);

    if (response.data.data.error) {
      return res.status(401).send({error: 'Facebook token incorrect'});
    }

    if (req.body.id !== response.data.data.user_id) {
      return res.status(401).send({error: 'Wrong User ID'});
    }

    let user = await User.findOne({facebookId: req.body.id});

    if (!user) {
      const picUrl = req.body.picUrl;
      let picFileName;

      console.log(picFileName + '1');

      const f = async () => {
        await request.head(picUrl, function (err, res, body) {
          const ext = res.headers['content-type'].split('/')[1];

          picFileName = nanoid() + '.' + ext;
          console.log(picFileName + '2');

          request(picUrl).pipe(fs.createWriteStream('public/uploads/' + picFileName));
        });
      }
      await f();

      user = new User({
        email: req.body.email,
        password: nanoid(),
        facebookId: req.body.id,
        displayName: req.body.name,
        avatar: picFileName,
      });
      console.log(picFileName + '3');
    }

    user.generateToken();
    await user.save();

    console.log(user);

    return res.send(user);
  } catch
    (e) {
    next(e);
  }
})
;

router.get('/profileImage', async (req, res, next) => {
  try {

  } catch (e) {
    next(e);
  }
})

module.exports = router;