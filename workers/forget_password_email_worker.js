const queue = require('../config/kue');
const forgetPasswordMailer = require('../mailers/forget_password_mailer');

queue.process('emails', function (job, done) {
    console.log(
        'emails worker is processing jobs of Reset Password: ',
        job.data
    );

    console.log(job.data);

    // forgetPasswordMailer.newResetPassword(job.data);
    // done();
});
