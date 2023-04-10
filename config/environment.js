const fs = require('fs');
const rfs = require('rotating-file-stream');

const path = require('path');

const logDirectory = path.join(__dirname, '../production_log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1d',
    path: logDirectory,
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'secret',
    db: 'socialmash_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'CHANGE IT',
            pass: 'CHANGE IT',
        },
    },

    google_client_id: 'CHANGE IT',
    google_client_secret: 'CHANGE IT',
    google_call_back_url: 'CHANGE IT',

    jwt_secret: 'secret',
    morgan: {
        mode: 'dev',
        option: { stream: accessLogStream },
    },
};

const production = {
    name: 'production',
    asset_path: process.env.SOCIALMASH_ASSET_PATH,
    session_cookie_key: process.env.SOCIALMASH_SESSION_COOKIE_KEY,
    db: process.env.SOCIALMASH_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SOCIALMASH_GMAIL_USERNAME,
            pass: process.env.SOCIALMASH_GMAIL_PASSWORD,
        },
    },
    google_client_id: process.env.SOCIALMASH_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.SOCIALMASH_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.SOCIALMASH_GOOGLE_CALLBACK_URL,
    jwt_secret: process.env.SOCIALMASH_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: {
            stream: accessLogStream,
        },
    },
};

// module.exports = development;
// module.exports = production;

module.exports =
    eval(process.env.SOCIALMASH_ENVIRONMENT) == undefined
        ? development
        : eval(process.env.SOCIALMASH_ENVIRONMENT);
