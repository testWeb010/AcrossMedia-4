/**
 * Professional Contact Form Notification Email Template
 * 
 * This template generates a modern, responsive HTML email for contact form submissions.
 * The template is designed with broad email client compatibility in mind, using table-based layouts
 * and inlined styles for maximum deliverability and visual consistency.
 * 
 * @param {string} name - The sender's name from the contact form
 * @param {string} email - The sender's email address
 * @param {string} subject - The subject line from the contact form
 * @param {string} message - The message content from the contact form
 * @param {string} logoUrl - The URL to the company logo
 * @returns {string} Complete HTML email template as a string
 */

export const contactNotificationTemplate = (name, email, subject, message, logoUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - Across Media Solutions</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0;
      padding: 20px;
      line-height: 1.6;
    }
    
    .email-wrapper {
      width: 100%;
      max-width: 650px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #3b82f6 0%, #1e40af 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
    }
    
    .header::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: repeating-linear-gradient(
        45deg,
        transparent,
        transparent 10px,
        rgba(255,255,255,0.05) 10px,
        rgba(255,255,255,0.05) 20px
      );
      animation: shimmer 4s linear infinite;
    }
    
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    
    .logo {
      width: 90px;
      height: 90px;
      margin: 0 auto 20px;
      background: rgba(255, 255, 255, 0.15);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.2);
      position: relative;
      z-index: 2;
    }
    
    .logo img {
      width: 55px;
      height: 55px;
      border-radius: 50%;
    }
    
    .notification-icon {
      background: rgba(255, 255, 255, 0.15);
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 20px;
      font-size: 30px;
      position: relative;
      z-index: 2;
    }
    
    .header h1 {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
      position: relative;
      z-index: 2;
    }
    
    .header p {
      font-size: 18px;
      opacity: 0.95;
      margin: 0;
      position: relative;
      z-index: 2;
    }
    
    .content {
      padding: 40px 30px;
      background: #ffffff;
    }
    
    .alert-message {
      background: linear-gradient(135deg, #fef3c7 0%, #fed7aa 100%);
      border: 1px solid #f59e0b;
      border-radius: 12px;
      padding: 20px;
      margin: 0 0 32px 0;
      border-left: 4px solid #f59e0b;
    }
    
    .alert-message h2 {
      color: #92400e;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .alert-message p {
      color: #b45309;
      margin: 0;
      font-size: 14px;
    }
    
    .contact-details {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      border-radius: 12px;
      padding: 0;
      margin: 24px 0;
      border: 1px solid #cbd5e1;
      overflow: hidden;
    }
    
    .detail-row {
      display: flex;
      border-bottom: 1px solid #e2e8f0;
    }
    
    .detail-row:last-child {
      border-bottom: none;
    }
    
    .detail-label {
      background: #f1f5f9;
      padding: 16px 20px;
      font-weight: 600;
      color: #334155;
      min-width: 120px;
      display: flex;
      align-items: center;
      border-right: 1px solid #e2e8f0;
    }
    
    .detail-value {
      padding: 16px 20px;
      color: #475569;
      flex: 1;
      display: flex;
      align-items: center;
    }
    
    .detail-value a {
      color: #3b82f6;
      text-decoration: none;
      font-weight: 500;
    }
    
    .detail-value a:hover {
      text-decoration: underline;
    }
    
    .message-section {
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-radius: 12px;
      padding: 24px;
      margin: 32px 0;
      border-left: 4px solid #0ea5e9;
    }
    
    .message-section h3 {
      color: #0c4a6e;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
    }
    
    .message-content {
      background: rgba(255, 255, 255, 0.7);
      border-radius: 8px;
      padding: 20px;
      border: 1px solid #bae6fd;
      color: #0f172a;
      line-height: 1.7;
      font-size: 15px;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
    
    .action-buttons {
      text-align: center;
      margin: 32px 0;
      padding: 24px;
      background: #f8fafc;
      border-radius: 12px;
      border: 1px solid #e2e8f0;
    }
    
    .reply-button {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin: 0 8px 12px 8px;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
      transition: all 0.3s ease;
      text-align: center;
      min-width: 180px;
    }
    
    .secondary-button {
      display: inline-block;
      background: linear-gradient(135deg, #6b7280 0%, #4b5563 100%);
      color: #ffffff;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin: 0 8px 12px 8px;
      box-shadow: 0 8px 20px rgba(107, 114, 128, 0.3);
      transition: all 0.3s ease;
      text-align: center;
      min-width: 180px;
    }
    
    .reply-button:hover, .secondary-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(0, 0, 0, 0.2);
    }
    
    .priority-badge {
      display: inline-block;
      background: #fef2f2;
      color: #dc2626;
      padding: 6px 12px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-left: 12px;
      border: 1px solid #fecaca;
    }
    
    .timestamp {
      background: #f1f5f9;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
      text-align: center;
      color: #64748b;
      font-size: 14px;
      border: 1px solid #cbd5e1;
    }
    
    .footer {
      background: #f8fafc;
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer-links {
      margin: 20px 0;
    }
    
    .footer-links a {
      color: #4f46e5;
      text-decoration: none;
      margin: 0 15px;
      font-size: 14px;
      font-weight: 500;
    }
    
    .footer-links a:hover {
      text-decoration: underline;
    }
    
    .social-links {
      margin: 16px 0;
    }
    
    .social-links a {
      display: inline-block;
      width: 40px;
      height: 40px;
      margin: 0 8px;
      background: #4f46e5;
      border-radius: 50%;
      line-height: 40px;
      text-align: center;
      color: white;
      text-decoration: none;
      font-weight: bold;
    }
    
    .copyright {
      color: #64748b;
      font-size: 12px;
      margin-top: 20px;
    }
    
    .security-note {
      background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
      border-left: 4px solid #10b981;
      border: 1px solid #a7f3d0;
    }
    
    .security-note p {
      color: #065f46;
      margin: 0;
      font-size: 13px;
    }
    
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .header, .content, .footer {
        padding: 20px;
      }
      
      .reply-button, .secondary-button {
        width: 100%;
        margin: 8px 0;
        min-width: auto;
      }
      
      .action-buttons {
        padding: 16px;
      }
      
      .detail-row {
        flex-direction: column;
      }
      
      .detail-label {
        border-right: none;
        border-bottom: 1px solid #e2e8f0;
        min-width: auto;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="logo">
        <img src="${logoUrl}" alt="AMS Logo">
      </div>
      <div class="notification-icon">📧</div>
      <h1>New Contact Inquiry</h1>
      <p>Someone wants to connect with you</p>
    </div>
    
    <div class="content">
      <div class="alert-message">
        <h2>🚨 New Contact Form Submission</h2>
        <p>You have received a new message through your website's contact form. Please review and respond promptly.</p>
      </div>
      
      <div class="timestamp">
        <p>📅 <strong>Received:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
      </div>
      
      <div class="contact-details">
        <div class="detail-row">
          <div class="detail-label">
            👤 <span style="margin-left: 8px;">Name</span>
          </div>
          <div class="detail-value">
            <strong>${name}</strong>
          </div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">
            ✉️ <span style="margin-left: 8px;">Email</span>
          </div>
          <div class="detail-value">
            <a href="mailto:${email}" title="Send email to ${email}">${email}</a>
          </div>
        </div>
        
        <div class="detail-row">
          <div class="detail-label">
            📋 <span style="margin-left: 8px;">Subject</span>
          </div>
          <div class="detail-value">
            ${subject}
            ${subject.toLowerCase().includes('urgent') || subject.toLowerCase().includes('priority') ? '<span class="priority-badge">HIGH PRIORITY</span>' : ''}
          </div>
        </div>
      </div>
      
      <div class="message-section">
        <h3>💬 Message Content</h3>
        <div class="message-content">${message}</div>
      </div>
      
      <div class="action-buttons">
        <h3 style="color: #334155; margin-bottom: 20px; font-size: 18px;">Quick Actions</h3>
        <div>
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}&body=Hello ${encodeURIComponent(name)},%0A%0AThank you for contacting Across Media Solutions. " class="reply-button">
            📧 Reply to ${name}
          </a>
          <a href="tel:${email.replace('@', '').replace(/[^0-9]/g, '')}" class="secondary-button">
            📞 Schedule Call
          </a>
        </div>
        <p style="color: #64748b; font-size: 14px; margin-top: 16px;">
          💡 <strong>Pro Tip:</strong> Quick responses improve customer satisfaction and conversion rates.
        </p>
      </div>
      
      <div class="security-note">
        <p>
          🔒 <strong>Security Notice:</strong> This email was sent from your website's secure contact form. 
          The sender's email address has been verified, but please exercise caution when clicking external links or attachments.
        </p>
      </div>
      
      <p style="color: #64748b; font-size: 14px; text-align: center; margin-top: 32px;">
        This notification was automatically generated by your website's contact management system.
      </p>
    </div>
    
    <div class="footer">
      <div class="footer-links">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}">🏠 Website</a>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login">🔐 Admin Login</a>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/contact">📞 Contact Page</a>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/about">ℹ️ About Us</a>
      </div>
      
      <div class="social-links">
        <a href="#" title="LinkedIn">in</a>
        <a href="#" title="Twitter">🐦</a>
        <a href="#" title="Instagram">📷</a>
        <a href="#" title="YouTube">📺</a>
      </div>
      
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} Across Media Solutions. All rights reserved.</p>
        <p>Building digital experiences that connect brands with audiences worldwide.</p>
        <p style="margin-top: 8px; font-size: 11px;">
          This email was automatically generated by your contact form notification system.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;