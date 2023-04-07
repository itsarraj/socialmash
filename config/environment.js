const development = {
    name: 'development',
    asset_path: '/assets',
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
};

const production = {
    name: 'production',
};

module.exports = development;
