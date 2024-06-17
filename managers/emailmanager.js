const nodemailer = require("nodemailer");
const emailmanager = async(to, text, html, subject) => {

    var transport = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "f18a0edf5b3998",
          pass: "a49f91f962f094"
        }
      });
    
      await transport.sendMail({
        to:to,
        from:"info@expensetracker.com",
        text: text,
        html:html,
        subject:subject,
      })

};

module.exports = emailmanager