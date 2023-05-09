// Importing the kue module from '../config/kue'
const queue = require('../config/kue');

// Importing the comments_mailer module for sending comments-related emails
const commentsMailer = require('../mailers/comments_mailer');

// Processing jobs of type 'comment-emails' in the queue
queue.process('comment-emails', function (job, done) {
    // Logging the job data to the console
    console.log('emails worker is processing jobs of Comments: ', job.data);

    // Invoking the 'newComment' function from commentsMailer module to send the email
    commentsMailer.newComment(job.data);

    // Marking the job as done
    done();
});
