const queue = require('../config/kue');
const commentsMailer = require('../mailers/comments_mailer');

queue.process('comment-emails', function (job, done) {
    console.log('emails worker is processing jobs of Comments: ', job.data);

    commentsMailer.newComment(job.data);
    done();
});
