import moment from 'moment';
import nodemailer from 'nodemailer';

const getUserId = (req) => {
  const secret = process.env.JWT_SECRET;
  let token = req.headers.authorization
    ? req.headers.authorization.split(" ")[1]
    : null;
  if (token) {
    let decoded = jwt.verify(token, secret);
    let userId = decoded._id;
    return userId;
  }
};

const sendEmail = async (to, subject, user) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    secure: false,
    auth: {
      user: process.env.SMTP_USERNAME,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const tempFilePath = path.join(__dirname, "../views/welcome.ejs");
  const template = await ejs.renderFile(tempFilePath, {
    name: user.name,
    email: user.email,
    password: user.password,
  });

  return transporter.sendMail({
    from: process.env.SMTP_MAIL,
    to: to,
    subject: subject,
    html: template,
  });
};

const generatePassword = () => {
  let password = "";
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 8; i++) {
    password += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return password;
};

function formatTimeToHiA(time) {
  const hour = time.getHours();
  const minute = time.getMinutes();
  const period = hour >= 12 ? 'PM' : 'AM';

  const hourIn12HourFormat = hour % 12 || 12; // Convert 24-hour format to 12-hour format

  return `${hourIn12HourFormat}:${minute.toString().padStart(2, '0')} ${period}`;
}

const dateFormatter = (time) => {
  return moment(time).format("MMM DD, YYYY");
};

export { getUserId, sendEmail, generatePassword ,formatTimeToHiA,dateFormatter};
