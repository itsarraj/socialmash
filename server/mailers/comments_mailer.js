// Importing the nodemailer module from '../config/nodemailer'
const nodeMailer = require('../config/nodemailer');

// Exporting a function named 'newComment' as part of the module
exports.newComment = (comment) => {
    // Generating an HTML string for the email body by rendering an EJS template
    let htmlString = nodeMailer.renderTemplate(
        { comment: comment },
        '/comments/new_comment.ejs'
    );

    // Logging the email recipient's email address to the console
    console.log('Email Sent To ', comment.user.email);

    // Sending an email using the configured nodemailer transporter
    nodeMailer.transporter.sendMail(
        {
            from: 'competitivedevelopernewsletter@gmail.com', // Sender's email address
            to: comment.user.email, // Recipient's email address
            subject: 'New Comment', // Subject of the email
            html: htmlString, // HTML content of the email body
        },
        (err, info) => {
            if (err) {
                // Logging an error message if email sending fails
                console.log('Error in sending email: ', err);
                return;
            }
            // Returning without any action upon successful email sending
            return;
        }
    );
};
