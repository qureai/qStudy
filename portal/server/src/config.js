export const {
    PORT = 5001,
    NODE_ENV = 'development',
    MONGO_URI = 'mongodb://qStudy_root:bigcamp93@mongodb:27017/qStudy_db?authSource=admin',
    SESS_NAME = 'qStudy',
    SESS_SECRET = 'qStudy!session', //keep random string in env
    SESS_LIFETIME = 1000 * 60 * 60 * 24
} = process.env;

