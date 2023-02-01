import nodemailer from 'nodemailer';

export const sendMail = async (data: string[], subject: string) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const text = data.join(' ');

    const html = data.join('</br>');

    await transporter.sendMail({
      from: process.env.CUSTOMER_SERVICE_EMAIL,
      to: process.env.CUSTOMER_SERVICE_EMAIL,
      subject,
      text,
      html
    });
  } catch (err) {
    console.log(err);
  }
};
