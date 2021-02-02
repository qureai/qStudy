import express from 'express';
import Study from '../models/study';
import { parseError }  from '../utils/helpers';

const studyRouter = express.Router();

const requiresLogin = (req, res, next) => {
    if(req.session && req.session.user && req.session.user.userId) {
        return next();
    } else {
        return res.status(401).send({ message: "You must be logged in to view this page." });
    }
};

studyRouter.post("", requiresLogin, async (req, res) => {
    try {
        const study = await Study.find({});
        if(study) {
            res.status(200).send(study);
        }
        else {
            res.status(404).send(null);
        }
    } catch (err) {
        res.status(500).send(parseError(err));
    }
});

studyRouter.post("/update", requiresLogin, async (req, res) => {
    try {
        const data = req.body;
        const myquery = { study_id: data.study_id };
        const newStudy = { $set: data };

        await Study.updateOne(myquery, newStudy, (err, res) => {
            if(err) {
                console.log(err);
            }
        });

        res.status(200).send("Study updated successfully");
    } catch (err) {
        res.status(500).send(parseError(err));
    }
});

export default studyRouter;
