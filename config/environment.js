const fs = require('fs');
const rfs = require('rotating-file-stream');

const path = require('path');

const logDirectory = path.join(__dirname, '../production_log');

fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log', {
    interval: '1hour',
    path: logDirectory,
});

const development = {
    name: 'development',
    asset_path: './assets',
    session_cookie_key: 'VmYq3s6v',
    db: 'socialmash_development',
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: 'animeshraj20192012ece@gmail.com',
            pass: 'yyzoppedyoejguih',
        },
    },

    google_client_id:
        '60501335444-35s3deb8k24iolpadk1emlovqiekffti.apps.googleusercontent.com',
    google_client_secret: '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',
    google_call_back_url: 'http://localhost:8000/users/auth/google/callback',
    jwt_secret: 'secret',
    morgan: {
        mode: 'dev',
        option: { stream: accessLogStream },
    },
};

const production = {
    name: 'production',
    asset_path: process.env.CODEIAL_ASSET_PATH,
    session_cookie_key: process.env.CODEIAL_SESSION_COOKIE_KEY,
    db: process.env.CODEIAL_DB,
    smtp: {
        service: 'gmail',
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.CODEIAL_GMAIL_USERNAME,
            pass: process.env.CODEIAL_GMAIL_PASSWORD,
        },
    },
    google_client_id: process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret: process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_call_back_url: process.env.CODEIAL_GOOGLE_CALLBACK_RURL,
    jwt_secret: process.env.CODEIAL_JWT_SECRET,
    morgan: {
        mode: 'combined',
        options: { stream: accessLogStream },
    },
};

module.exports = development;
