import nodemailer from 'nodemailer';
import dotenv from 'dotenv';


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
    const approvalLink = `${backendUrl}/api/auth/approve/${pendingUser.approvalToken}`;
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Admin Registration Approval Request</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background-color: #007bff; color: #ffffff; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .button-container { text-align: center; margin-top: 20px; }
          .footer { margin-top: 20px; text-align: center; color: #777; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>AcrossMedia Admin Portal</h1>
            <h2>New Admin Registration - Approval Required</h2>
          </div>
          <div class="content">
            <p>Dear Superadmin,</p>
            <p>A new admin has registered and is awaiting your approval. Please review the details below:</p>
            <ul style="list-style-type: none; padding: 0;">
              <li><strong>Username:</strong> ${pendingUser.username}</li>
              <li><strong>Email:</strong> ${pendingUser.email}</li>
              <li><strong>Registration Date:</strong> ${new Date(pendingUser.createdAt).toLocaleString()}</li>
            </ul>
            <div class="button-container">
              <a href="${approvalLink}" class="button">Review & Approve</a>
            </div>
            <p>If the link above doesn't work, copy and paste this URL into your browser:</p>
            <p><a href="${approvalLink}">${approvalLink}</a></p>
          </div>
          <div class="footer">
            <p>This email was sent from AcrossMedia Admin Portal. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

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
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Admin Account Approved</title>
        <style>
          body { font-family: Arial, sans-serif; background-color: #f4f4f4; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
          .header { background-color: #28a745; color: #ffffff; padding: 15px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { padding: 20px; }
          .button { display: inline-block; padding: 10px 20px; background-color: #28a745; color: #ffffff; text-decoration: none; border-radius: 5px; margin: 10px 0; }
          .button-container { text-align: center; margin-top: 20px; }
          .footer { margin-top: 30px; font-size: 12px; color: #666; text-align: center; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Account Approved</h1>
          </div>
          <div class="content">
            <p>Dear ${username},</p>
            <p>Your account has been approved. You can now log in as an admin.</p>
            <div class="button-container">
              <a href="${process.env.CLIENT_URL}/admin/login" class="button">Login to Admin Portal</a>
            </div>
          </div>
          <div class="footer">
            <p>This email was sent from AcrossMedia Admin Portal. Please do not reply to this email.</p>
          </div>
        </div>
      </body>
      </html>
    `;

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
    const htmlContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            padding: 20px;
          }
          
          .email-container {
            max-width: 700px;
            margin: 0 auto;
            background: #ffffff;
            border-radius: 20px;
            overflow: hidden;
            box-shadow: 0 20px 40px rgba(0,0,0,0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
            padding: 40px 30px;
            text-align: center;
            position: relative;
            overflow: hidden;
          }
          
          .header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, #00f5ff, #ff1493);
            opacity: 0.1;
          }
          
          .logo-container {
            position: relative;
            z-index: 2;
            margin-bottom: 20px;
          }
          
          .logo {
            width: 60px;
            height: 60px;
            background: linear-gradient(135deg, #00f5ff, #ff1493);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 15px;
          }
          
          .header-title {
            color: #ffffff;
            font-size: 28px;
            font-weight: 700;
            margin-bottom: 8px;
            position: relative;
            z-index: 2;
          }
          
          .header-subtitle {
            color: #00f5ff;
            font-size: 16px;
            font-weight: 500;
            position: relative;
            z-index: 2;
          }
          
          .content {
            padding: 40px 30px;
          }
          
          .alert-banner {
            background: linear-gradient(135deg, #ff6b6b, #ffa500);
            color: white;
            padding: 20px;
            border-radius: 15px;
            margin-bottom: 30px;
            text-align: center;
            font-weight: 600;
            font-size: 18px;
          }
          
          .contact-info {
            background: linear-gradient(135deg, #f8f9ff, #e6f3ff);
            border-radius: 15px;
            padding: 30px;
            margin-bottom: 30px;
            border-left: 5px solid #00f5ff;
          }
          
          .info-row {
            display: flex;
            align-items: center;
            margin-bottom: 20px;
            padding: 15px 0;
            border-bottom: 1px solid #e0e7ff;
          }
          
          .info-row:last-child {
            border-bottom: none;
            margin-bottom: 0;
          }
          
          .info-label {
            font-weight: 700;
            color: #2d3748;
            font-size: 16px;
            min-width: 100px;
            margin-right: 15px;
          }
          
          .info-value {
            color: #4a5568;
            font-size: 16px;
            word-break: break-word;
          }
          
          .message-section {
            background: #f7fafc;
            border-radius: 15px;
            padding: 25px;
            border: 2px solid #e2e8f0;
          }
          
          .message-title {
            font-size: 18px;
            font-weight: 700;
            color: #2d3748;
            margin-bottom: 15px;
            display: flex;
            align-items: center;
          }
          
          .message-icon {
            width: 24px;
            height: 24px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            color: white;
            font-size: 14px;
          }
          
          .message-content {
            background: white;
            padding: 20px;
            border-radius: 10px;
            border-left: 4px solid #667eea;
            font-size: 15px;
            line-height: 1.7;
            color: #4a5568;
            white-space: pre-wrap;
            word-wrap: break-word;
          }
          
          .action-section {
            text-align: center;
            margin-top: 40px;
            padding: 30px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 15px;
            color: white;
          }
          
          .action-title {
            font-size: 20px;
            font-weight: 700;
            margin-bottom: 15px;
          }
          
          .action-text {
            font-size: 16px;
            margin-bottom: 25px;
            opacity: 0.9;
          }
          
          .reply-button {
            display: inline-block;
            background: linear-gradient(135deg, #00f5ff, #ff1493);
            color: white;
            text-decoration: none;
            padding: 15px 30px;
            border-radius: 50px;
            font-weight: 600;
            font-size: 16px;
            transition: all 0.3s ease;
            box-shadow: 0 10px 20px rgba(0,0,0,0.1);
          }
          
          .reply-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          }
          
          .footer {
            background: #1a1a1a;
            color: #a0a0a0;
            text-align: center;
            padding: 30px;
            font-size: 14px;
          }
          
          .footer-divider {
            width: 60px;
            height: 3px;
            background: linear-gradient(135deg, #00f5ff, #ff1493);
            margin: 0 auto 20px;
            border-radius: 2px;
          }
          
          .timestamp {
            background: #e2e8f0;
            color: #718096;
            padding: 8px 15px;
            border-radius: 20px;
            font-size: 14px;
            display: inline-block;
            margin-top: 20px;
          }
          
          @media (max-width: 600px) {
            .email-container {
              margin: 10px;
              border-radius: 15px;
            }
            
            .header, .content, .footer {
              padding: 25px 20px;
            }
            
            .header-title {
              font-size: 24px;
            }
            
            .info-row {
              flex-direction: column;
              align-items: flex-start;
            }
            
            .info-label {
              margin-bottom: 5px;
              margin-right: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="header">
            <div class="logo-container">
              <div class="logo">
                <span style="font-weight: bold; font-size: 24px;">AM</span>
              </div>
            </div>
            <h1 class="header-title">Across Media Solutions</h1>
            <p class="header-subtitle">New Contact Form Submission</p>
          </div>
          
          <div class="content">
            <div class="alert-banner">
              🚨 New Contact Form Submission Received!
            </div>
            
            <div class="contact-info">
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Subject:</span>
                <span class="info-value">${subject}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Submitted:</span>
                <span class="info-value">${new Date().toLocaleString('en-US', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  timeZoneName: 'short'
                })}</span>
              </div>
            </div>
            
            <div class="message-section">
              <div class="message-title">
                <span class="message-icon">💬</span>
                Message Details
              </div>
              <div class="message-content">${message}</div>
            </div>
            
            <div class="action-section">
              <h3 class="action-title">Ready to Respond?</h3>
              <p class="action-text">Click below to reply directly to this inquiry and start building an amazing partnership!</p>
              <a href="mailto:${email}?subject=Re: ${subject}" class="reply-button">
                Reply to ${name}
              </a>
            </div>
            
            <div class="timestamp">
              Message ID: AM-${Date.now().toString(36).toUpperCase()}
            </div>
          </div>
          
          <div class="footer">
            <div class="footer-divider"></div>
            <p><strong>Across Media Solutions</strong></p>
            <p>Transforming brands through strategic media solutions</p>
            <p style="margin-top: 15px; font-size: 12px; opacity: 0.7;">
              This email was automatically generated from your website's contact form.<br>
              Please do not reply to this email address.
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: adminEmail,
      subject: `New Contact Form Submission: ${subject}`,
      html: htmlContent,
      replyTo: email // Set reply-to as the customer's email
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(`Contact notification email sent to ${adminEmail}: ${info.messageId}`);
    return info;
  } catch (error) {
    console.error(`Error sending contact notification email to ${adminEmail}:`, error);
    throw error;
  }
};
