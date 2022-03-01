import nodemailer from 'nodemailer';
import { IContactInput } from '../@types';

export const sendMail = async (content: IContactInput) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ACCOUNT,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    const data = [
      `name: ${content.name} ${content.surname}`,
      `tel: ${content.mobile}`,
      `email: ${content.email}`,
      `area: ${content.area}`,
      `type: ${content.type}`,
      `customer?: ${content.iScustomer}`
    ];

    if (content.login) {
      data.push(`account: ${content.login}`);
    }

    if (content.content) {
      data.push(`message: ${content.content}`);
    }

    const text = data.join(' ');

    const html = data.join('</br>');

    await transporter.sendMail({
      from: process.env.CUSTOMER_SERVICE_EMAIL,
      to: process.env.CUSTOMER_SERVICE_EMAIL,
      subject: '[WCG國際站]客戶填寫諮詢表單',
      text,
      html
    });
  } catch (err) {
    console.log(err);
  }
};
