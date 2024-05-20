require("dotenv").config();
const client = require("@sendgrid/mail");
const logger = require("../config/logger");

const sendEmail = async (emailTo, subject, body, attachments) => {
  client.setApiKey(process.env.SENDGRID_API_KEY);

  const message = {
    personalizations: [
      {
        to: emailTo.split(",").map((email) => ({
          email: email.trim(),
        })),
      },
    ],
    from: {
      email: process.env.SENDGRID_EMAIL_FROM,
      name: "Faturamento Europartner",
    },
    subject: subject,
    content: [
      {
        type: "text/html",
        value: body,
      },
    ],
    attachments: attachments.map(({ filename, fileBuffer }) => ({
      content: fileBuffer.toString("base64"),
      filename: filename,
      disposition: "attachment",
    })),
  };

  try {
    await client.send(message);
  } catch (error) {
    logger.error(`${error.stack}`);
    throw new Error("Erro ao enviar e-mail");
  }
};

module.exports = { sendEmail };
