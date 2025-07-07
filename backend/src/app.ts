// src/app.ts
import express, { Request, Response } from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { smtpSchema } from "./validate";
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(express.json());

const allowedOrigins = process.env.CORS_ORIGINS?.split(',') || [];

app.use(cors({ 
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));

app.post("/api/test-smtp", async (req:Request, res: Response) => {
  try {
    const parsed = smtpSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({ success: false, error: "Invalid input", details: parsed.error.flatten() });
      return
    }

    const { host, port, secure, auth, from, to } = parsed.data;
    
    const transporter = nodemailer.createTransport({ host, port, secure, auth });
    await transporter.verify();

    if (from && to) {
      await transporter.sendMail({
        from,
        to,
        subject: "SMTP Test",
        text: "This is a test email from your SMTP configuration.",
      });
      res.json({ success: true, result: "SMTP verified and test email sent." });
      return
    }

    res.json({ success: true, result: "SMTP connection verified successfully." });
  } catch (error: any) {
    console.error("SMTP error:", error);
    res.status(500).json({ success: false, error: error.message || "SMTP connection failed" });
  }
});

export default app;