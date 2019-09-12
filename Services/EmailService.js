const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.SENDGRID_API_KEY);
module.exports = {
  async sendMail(data) {
    try {
      const msg = {
        to: data.email,
        from: "support@useoutbox.com",
        subject: data.subject,
        text: data.text,
        html: data.html
      };
      sgMail.send(msg);
    } catch (error) {
        throw new Error(error);
    }
  }
};
