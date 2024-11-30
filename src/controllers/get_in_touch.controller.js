import nodemailer from "nodemailer";
import { asyncHandler } from "../utils/apiHandler.js";
import { apiError } from "../utils/apiError.js";
import { apiResponse } from "../utils/apiResponse.js";

const sendMail = asyncHandler(async (req, res) => {
  const { name, email, websiteLink, message } = req.body;

  if ([name, email, message].some((field) => !field || field.trim() === "")) {
    throw new apiError(400, "Please provide values for all required fields");
  }

  if (!email.includes("@gmail.com")) {
    throw new apiError(400, "Invalid email address, please use a valid format");
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.NODEMAILER_MAIL_ID,
        pass: process.env.NODEMAILER_MAIL_ID_PASSWORD,
      },
    });

    const emailText = `${name}\n${email}\n\n${message}${
      websiteLink ? `\n\nWebsite Link: ${websiteLink}` : ""
    }`;

    const mailOptions = {
      from: process.env.NODEMAILER_MAIL_ID,
      to: "2003hriteshkumarsingh@gmail.com",
      subject: "Portfolio message",
      text: emailText,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json(
        new apiResponse(
          200,
          "Email sent successfully to the registered email address"
        )
      );
  } catch (error) {
    throw new apiError(500, "Failed to send email, please try again later");
  }
});

export { sendMail };