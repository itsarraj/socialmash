const nodeMailer = require('../config/nodemailer');

// creating a function that will send that mail

// this is another way of exporting a method
exports.newComment = (comment) => {
    let htmlString = nodeMailer.renderTemplate(
        { comment: comment },
        '/comments/new_comment.ejs'
    );

    console.log('Email Send To ', comment.user.email);

    nodeMailer.transporter.sendMail(
        {
            from: 'competitivedevelopernewsletter@gmail.com',
            to: comment.user.email,
            subject: 'New Comment',
            html: htmlString,
        },

        (err, info) => {
            if (err) {
                console.log('Error in sending mail ', err);
                return;
            }
            // console.log('Message sent ', info);
            return;
        }
    );
};
