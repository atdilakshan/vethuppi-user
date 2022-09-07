// const nodeMailer = require("nodemailer");

// const sendEmail = async (options) => {
//   const transporter = nodeMailer.createTransport({
//     host: process.env.SMPT_HOST,
//     port: process.env.SMPT_PORT,
//     service: process.env.SMPT_SERVICE,
//     auth: {
//       user: process.env.SMPT_MAIL,
//       pass: process.env.SMPT_PASSWORD,
//     },
//   });

//   const mailOptions = {
//     from: process.env.SMPT_MAIL,
//     to: options.email,
//     subject: options.subject,
//     text: options.message,
//   };

//   await transporter.sendMail(mailOptions);
// };

// module.exports = sendEmail;

//const SMTPClient = require("emailjs");
const config = {
  service_id: "service_nksmwks", // service ID
  user_id: "0eyv900zJtQHaYgYT", // Publick Key
}
const sendEmail = async (data) => {
  data = {
      ...config,
      template_id: "template_1tn4pjm",  //template ID
      template_params: { ...data }
  }
  try {
      const response = await API.post("", data);
      return response.data;
  } catch (e) {
      throw e;
  }
};
module.exports = sendEmail;