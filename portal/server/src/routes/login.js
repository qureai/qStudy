import express from 'express';
import User from '../models/user';
import { signUp } from '../validations/user';
import { parseError, sessionizeUser }  from '../utils/helpers';

const loginRouter = express.Router();

loginRouter.post("", async (req, res) => {
  try {
    const { user_id, email, password } = req.body;
    await signUp.validateAsync({ user_id, email, password });

    const newUser = new User({ user_id, email, password });
    const sessionUser = sessionizeUser(newUser);
    await newUser.save();

    req.session.user = sessionUser;
    res.send(sessionUser);
  } catch (err) {
    console.log(err);
    res.status(400).send(parseError(err));
  }
});

export default loginRouter;
