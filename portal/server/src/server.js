import express from 'express';
import mongoose from 'mongoose';
import session from 'express-session';
import connectStore from 'connect-mongo';
import cors from 'cors';
import { loginRouter, sessionRouter, studyRouter } from './routes/index';
import { PORT, NODE_ENV, MONGO_URI, SESS_NAME, SESS_SECRET, SESS_LIFETIME } from './config';

(async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    }
    catch (err) {
        console.log(err);
    }
})();

let corsOptions = {
    origin: true,
    credentials: true
};

const app = express();
app.use(cors(corsOptions));
const MongoStore = connectStore(session);

// Obscure backend
app.disable('x-powered-by');

// Parse HTTP requests and JSON payload
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    name: SESS_NAME,
    secret: SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection,
        collection: 'session',
        ttl: parseInt(SESS_LIFETIME) / 1000
    }),
    cookie: {
        sameSite: true,
        secure: NODE_ENV === 'production',
        maxAge: parseInt(SESS_LIFETIME)
    }
}));

// Routes
const apiRouter = express.Router();
app.use('/api', apiRouter);
apiRouter.use('/login', loginRouter);
apiRouter.use('/session', sessionRouter);
apiRouter.use('/studies', studyRouter);

// Set port to listen requests
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
});
