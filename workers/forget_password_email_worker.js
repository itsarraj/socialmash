const queue = require('../config/kue');
const forgetPasswordMailer = require('../mailers/forget_password_mailer');

queue.process('pass-reset-mail', function (job, done) {
    console.log('emails worker is processing jobs of resetPass : ', job.data);

    forgetPasswordMailer.newResetPassword(job.data);
    done();
});
