import nodemailer from 'nodemailer';

export const sendMail = async (data: string[], subject: string) => {
  try {
    const setting = {
      host: process.env.EMAIL_HOST,
      port: Number(process.env.EMAIL_PORT),
      secureConnection: false, // TLS requires secureConnection to be false
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      },
      tls: {
        ciphers: 'SSLv3'
      }
    };

    const transporter = nodemailer.createTransport(setting);

    const text = data.join(' ');

    const html = data.join('</br>');

    const option = {
      from: process.env.EMAIL_SENDER,
      to: process.env.CUSTOMER_SERVICE_EMAIL,
      subject,
      text,
      html
    };

    await transporter.sendMail(option);
  } catch (err) {
    console.log(err);
  }
};
