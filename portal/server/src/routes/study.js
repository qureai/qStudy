import express from 'express';
import Study from '../models/study';
import { parseError }  from '../utils/helpers';

const studyRouter = express.Router();

const requiresLogin = (req, res, next) => {
    if(req.session && req.session.user && req.session.user.user_id) {
        return next();
    } else {
        return res.status(401).send({ message: "You must be logged in to view this page." });
    }
};

studyRouter.post("", requiresLogin, async (req, res) => {
    try {
        const query = {
            user_id: 0
        };

        if(req.session && req.session.user && req.session.user.user_id) {
            query.user_id = req.session.user.user_id
        }
           
        await Study.find(query, (err, result) => {
            if(err) {
                console.log(err);
                res.status(500).send(null);
            }

            res.status(200).send(result);
        });
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
                res.status(500).send("Study not updated");
            }
        });

        res.status(200).send("Study updated successfully");
    } catch (err) {
        res.status(500).send(parseError(err));
    }
});

export default studyRouter;
