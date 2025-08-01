import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { approvalRequestTemplate } from './templates/approvalRequestTemplate.mjs';
import { approvalNotificationTemplate } from './templates/approvalNotificationTemplate.mjs';
import { contactNotificationTemplate } from './templates/contactNotificationTemplate.mjs';


// Load environment variables
dotenv.config();

// Configure transporter (Update these details with your email service credentials)
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.EMAIL_PORT) || 587,
  secure: process.env.EMAIL_SECURE === 'true', // Use secure setting from environment variable
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASS  // Your email password or app-specific password
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Function to send approval request email
export const sendApprovalRequestEmail = async (superadminEmail, pendingUser) => {
  try {
    // Use the backend URL for the approval link
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
    const htmlContent = approvalRequestTemplate(backendUrl, pendingUser.approvalToken, pendingUser.username);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Use EMAIL_USER as sender if EMAIL_FROM is not set
      to: superadminEmail,
      subject: 'New Admin Registration - Approval Required',
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    // console.log(`Approval request email sent to ${superadminEmail}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending approval request email to ${superadminEmail}:`, error);
    throw error;
  }
};

// Function to send approval notification email
export const sendApprovalNotification = async (userEmail, username) => {
  try {
    const loginUrl = process.env.FRONTEND_URL || 'http://localhost:5173/login';
    const htmlContent = approvalNotificationTemplate(username, loginUrl);

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER, // Use EMAIL_USER as sender if EMAIL_FROM is not set
      to: userEmail,
      subject: 'AcrossMedia Admin Account Approved',
      html: htmlContent
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Approval notification email sent to ${userEmail}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending approval notification email to ${userEmail}:`, error);
    throw error;
  }
};

// Function to send contact form notification email
export const sendContactNotification = async (adminEmail, contactData) => {
  try {
    const { name, email, subject, message } = contactData;
    const logoUrl ='https://res.cloudinary.com/daolwstwj/image/upload/v1753955157/Across-media_nqdg0b.ico'; // Example: A generic logo placeholder

    const htmlContent = contactNotificationTemplate(
      name,
      email,
      subject,
      message,
      logoUrl
    );

    // Configure the email options.
    const mailOptions = {
      // Use a "name-addr" format for a more professional appearance.
      from: `"Across Media Solutions" <${process.env.EMAIL_FROM || process.env.EMAIL_USER}>`,
      to: adminEmail,
      // Create a more informative subject line for easier filtering in the inbox.
      subject: `New Inquiry from ${name}: ${subject}`,
      html: htmlContent,
      // The 'replyTo' header is crucial. It ensures that hitting "Reply" in the email client
      // will reply to the customer, not the notification system.
      replyTo: email
    };

    // Send the email using the pre-configured transporter.
    const info = await transporter.sendMail(mailOptions);
    console.log(`Contact notification email sent successfully to ${adminEmail}: ${info.messageId}`);
    return info;

  } catch (error) {
    console.error(`Error sending contact notification email to ${adminEmail}:`, error);
    // Re-throw the error so the calling function (e.g., an API endpoint)
    // can handle it and respond appropriately.
    throw new Error('Failed to send contact notification email.');
  }
};
