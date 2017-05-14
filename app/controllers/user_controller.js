import jwt from 'jwt-simple';
import dotenv from 'dotenv';
import User from '../models/user_model';

dotenv.config({ silent: true });

// encodes a new token for a user object
function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, process.env.AUTH_SECRET);
}

export const signin = (req, res, next) => {
  User.findOne({ email: req.body.email })
  .then((user) => {
    user.comparePassword(req.body.password, (error, isMatch) => {
      if (error) res.status(422).send('error');
      else if (isMatch) res.send({ token: tokenForUser(req.user) });
      else res.status(422).send('Your password is incorrect');
    });
  })
  .catch((error) => {
    res.status(422).send('Your email address is incorrect');
  });
};

export const signup = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res.status(422).send('You must provide email and password');
  }

  User.findOne({ email })
  .then((result) => {
    if (result !== null) {
      return res.status(422).send('The email address you inputted already exists');
    } else {
      const user = new User({ email, password });
      user.save()
      .then((saved) => {
        res.send({ token: tokenForUser(saved) });
      })
      .catch((err) => {
        res.status(500).json({ err });
      });
    }
    return null;
  })
  .catch((error) => {
    res.status(500).json({ error });
  });
  return null;
};
