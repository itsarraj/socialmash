// Importing the kue module from '../config/kue'
const queue = require('../config/kue');

// Importing the forget_password_mailer module for sending password reset emails
const forgetPasswordMailer = require('../mailers/forget_password_mailer');

// Processing jobs of type 'pass-reset-mail' in the queue
queue.process('pass-reset-mail', function (job, done) {
    // Logging the job data to the console
    console.log('emails worker is processing jobs of resetPass : ', job.data);

    // Invoking the 'newResetPassword' function from forgetPasswordMailer module to send the email
    forgetPasswordMailer.newResetPassword(job.data);

    // Marking the job as done
    done();
});
