import { Request, Response } from "express";
import nodeMailer from "nodemailer";

import { passwordRecoveryPage } from "../../utils/passwordRecoveryPage";

import { User } from "../../models/User";

export const passwordRecovery = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "E-mail is required",
      });
    }

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({
        message: "There is no user registered with this email",
      });
    }

    const transporter = nodeMailer.createTransport({
      service: "gmail",
      host: "smtp.gmail.com",
      auth: {
        user: process.env.NODEMAILER_USER,
        pass: process.env.NODEMAILER_PASSWORD,
      },
    });

    const textHtml = passwordRecoveryPage(
      user.name,
      "https://project-manager-api-robson-carvalho.vercel.app/"
    );

    const mailOptions = {
      from: process.env.NODEMAILER_USER,
      to: email,
      subject: "Password Recovery - Project Manager",
      html: textHtml,
    };

    await transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        return res.status(500).json({ message: err });
      }

      return res.status(200).json({
        message:
          "The password has been sent to the email provided! Please check your password in the spam box.",
      });
    });
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
