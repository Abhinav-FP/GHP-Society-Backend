const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const app = express();
const cors = require("cors");
const corsOptions = {
  origin: "*", // Allowed origins
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: '*', // Allow all headers
  credentials: true,
  optionsSuccessStatus: 200, // for legacy browsers
}

app.use(cors(corsOptions));
app.use(express.json({ limit: '2000mb' }));
app.use(express.urlencoded({ extended: true, limit: "2000mb" }));

const PORT = process.env.REACT_APP_SERVER_DOMAIN || 5100;

// Email logic
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST, // Gmail SMTP server
  port: process.env.MAIL_PORT, // Port for SSL
  secure: true, // Use SSL for port 465
  auth: {
    user: process.env.MAIL_USERNAME, // Your Gmail address
    pass: process.env.MAIL_PASSWORD, // Your app password
  },
});
const sendMail = async (mailOptions) => {
  try {
    const info = await transporter.sendMail(mailOptions);
    if (info.messageId) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("Mail error:", error);
    return false;
  }
};

app.post("/form", async(req, res) => {
  const {name, email, phone, society, message} = req.body;
  if(!name || !email || !phone || !society || !message){
    return res.status(400).json({
      message: "All fields are required",
      status: false,
    })
  }
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME}" <${process.env.MAIL_FROM_ADDRESS}>`, // sender address with name
    to: "a.mathur@internetbusinesssolutionsindia.com", // recipient addresses
    subject: `New inquiry received`, // Subject line
    html: `
        <html>
  <head>
    <title>Email template</title>
  </head>
  <body>
    <table cellspacing="0" cellpadding="0" style="width: 100%;max-width: 400px;margin: 0 auto;font-family: Arial; ">
      <tr>
        <td style="text-align: center;background:#ffff;padding: 10px 10px;">
          <a href="https://futureprofilez.com/">
            <img style="max-width:107px; height:58px" src="https://futureprofilez.com/wp-content/themes/fptheme/assets2/img/logo.png?dshf" alt="img">
          </a>
        </td>
      </tr>
      <tr>
        <td style="padding: 35.2px 19.2px 0; ">
          <p style="color: #4D4D4D;font-size: 14px;font-weight: 400; letter-spacing: -0.04em; text-align: left;line-height: 22px;margin: 0 0 8px;">Dear Admin,</p>
          <p style="color: #4D4D4D;font-size: 14px;font-weight: 400; letter-spacing: -0.04em; text-align: left;line-height: 22px;margin: 0 0 20.8px;">We have received a new inquiry.Please find the details attached below.</p>
        </td>
      </tr>
      <tr>
        <td colspan="2" style="border: solid 1px #ddd; padding:10px 20px;color: #4D4D4D;">
          <p style="font-size:14px;margin:0 0 9px 0;">
            <span style="font-weight:bold;display:inline-block;">Name </span> - <b style="font-weight:normal;margin:0">${name}</b>
          </p>
          <p style="font-size:14px;margin:0 0 9px 0;">
            <span style="font-weight:bold;display:inline-block;">Email </span> - ${email}
          </p>
          <p style="font-size:14px;margin:0 0 9px 0;">
            <span style="font-weight:bold;display:inline-block;">Phone No. </span> - ${phone}
          </p>
          <p style="font-size:14px;margin:0 0 9px 0;">
            <span style="font-weight:bold;display:inline-block;">Society </span> - ${society}
          </p>
          <p style="font-size:14px;margin:0 0 9px 0;">
            <span style="font-weight:bold;display:inline-block;">Message </span> -
          </p>
          <p style="font-size:14px;margin:0 0 9px 0;">${message}</p>
        </td>
      </tr>
      <tr>
      <tr>
        <td style="text-align: left;padding:19.2px; background: #ffff;text-align: center;">
          <div style="margin: 0 0 10px">
            <a href="#" target="blank" style="color:#4D4D4D; font-size:14px; text-decoration: none;">
              <img style="margin-right: 5px; vertical-align: top;" src="https://i.imgur.com/BncNmdi.png" alt="img">
              <span style="opacity: 0.8">Future Profilez</span>
            </a>
          </div>
          <div style="margin: 0 0 10px">
            <a href="#" target="blank" style="color:#4D4D4D; font-size:14px; text-decoration: none;">
              <img style="margin-right: 5px; vertical-align: middle;" src="https://i.imgur.com/C6UZOQ7.png" alt="img">
              <span style="opacity: 0.8">@FutureProfilez</span>
            </a>
          </div>
          <div>
            <a href="#" target="blank" style="color:#4D4D4D; font-size:14px; text-decoration: none;">
              <img style="margin-right: 5px; vertical-align: middle;" src="https://i.imgur.com/qalbEh5.png" alt="img">
              <span style="opacity: 0.8">@futureprofilez</span>
            </a>
          </div>
        </td>
      </tr>
      <td style="text-align: left;padding:19.2px 19.2px 1rem; border-top:1px solid rgba(0,0,0,.1); text-align: center;">
        <div style="margin: 0 0 10px">
          <img style="margin-right: 3px; vertical-align: top;" src="https://i.imgur.com/3OuZKWO.png" alt="img">
          <a href="#" style="color:#4D4D4D; font-size:14px; text-decoration: none; opacity: 0.8;">01412282790</a>
          <span style="opacity: 0.8;color:#4D4D4D;font-size:14px;">/</span>
          <a href="#" style="color:#4D4D4D; font-size:14px; text-decoration: none; opacity: 0.8;">01412282298</a>
          <span style="opacity: 0.8;color:#4D4D4D;font-size:14px;">/</span>
          <a href="#" style="color:#4D4D4D; font-size:14px; text-decoration: none; opacity: 0.8;">90018-69684</a>
        </div>
        <div style="margin: 0 0 10px">
          <img style="margin-right: 3px; vertical-align: middle;" src="https://i.imgur.com/QFBWsuV.png" alt="img">
          <a href="#" style="color:#4D4D4D; font-size:14px; text-decoration: none; opacity: 0.8;">bvbpschool74@gmail.com</a>
          <span style="opacity: 0.8;color:#4D4D4D;font-size:14px;">/</span>
          <a href="#" style="color:#4D4D4D; font-size:14px; text-decoration: none; opacity: 0.8;">bvbpschool@yahoo.com</a>
        </div>
        <div style="line-height: 24px;">
          <a href="#" target="blank" style="color:#4D4D4D; font-size:14px; text-decoration: none;">
            <img style="margin-right: 3px; vertical-align: middle;" src="https://i.imgur.com/x4NTArq.png" alt="img">
            <span style="opacity: 0.8"> D-105, B Devi Marg, G4 Golden Oak Banipark, Jaipur 302016</span>
          </a>
        </div>
      </td>
      </tr>
    </table>
  </body>
</html>
          `,
  };

  try {
    const sendMailResponse = await sendMail(mailOptions);

    if (!sendMailResponse) {
      throw new Error("Failed to send email");
    }

    console.log("Email sent successfully");

    return res.status(201).json({
      status: true,
      message: "Enquiry Added Successfully!",
    });
  } catch (error) {
    console.error("Error in sending email:", error);
    return res.status(500).json({
      status: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

app.get("/", (req, res) => {
  res.json({
    msg: 'Hello World',
    status: 200,
  });
});

const server = app.listen(PORT, () => console.log("Server is running at port : " + PORT));
server.timeout = 360000; // 6 minutes