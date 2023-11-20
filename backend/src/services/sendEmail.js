const mailer = require("./mailer");

const sendMail = ({ message }) => {
  mailer.sendMail(
    {
      from: "kpeset@zohomail.eu",
      to: message.email,
      subject: message.subject,
      text: message.text,
      html: message.html,
    },
    (err, info) => {
      if (err) console.error(err);
      else console.info(info);
    }
  );
};

module.exports = { sendMail };
