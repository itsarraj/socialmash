const nodeMailer = require('../config/nodemailer');

// creating a function that will send that mail

// this is another way of exporting a method
exports.newResetPassword = (user) => {
    let htmlString = nodeMailer.renderTemplate(
        { user: user },
        '/forget_password/forget_password.ejs'
    );
    console.log('Email Send To ', user.user.email);
    nodeMailer.transporter.sendMail(
        {
            from: 'competitivedevelopernewsletter@gmail.com',
            to: user.user.email,
            subject: 'New user',
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
