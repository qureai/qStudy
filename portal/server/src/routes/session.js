import express from 'express';
import User from '../models/user';
import { signIn } from '../validations/user';
import { parseError, sessionizeUser } from '../utils/helpers';
import { SESS_NAME } from '../config';

const sessionRouter = express.Router();

sessionRouter.post("", async (req, res) => {
    try {
        const { email, password } = req.body;
        await signIn.validateAsync({ email, password });

        const user = await User.findOne({ email });
        if(user && user.comparePasswords(password)) {
            const sessionUser = sessionizeUser(user);

            req.session.user = sessionUser;
            res.send(sessionUser);
        } else {
            throw new Error('Invalid login credentials');
        }
    } catch (err) {
        res.status(400).send(parseError(err));
    }
});

sessionRouter.delete("", ({ session }, res) => {
    try {
        const user = session.user;
        if(user) {
            session.destroy(err => {
                if(err) {
                    throw (err);
                }

                res.clearCookie(SESS_NAME);
                res.send(user);
            })
        } else {
            throw new Error("Something went wrong");
        }
    } catch (err) {
        res.status(422).send(parseError(err));
    }
});

sessionRouter.get("", ({ session: { user }}, res) => {
    res.send({ user });
});
  
export default sessionRouter;
