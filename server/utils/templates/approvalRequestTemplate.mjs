export const approvalRequestTemplate = (backendUrl, token, username) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Approval Request - Across Media Solutions</title>
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
      max-width: 600px;
      margin: 0 auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    }
    
    .header {
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    
    .logo {
      width: 80px;
      height: 80px;
      margin: 0 auto 20px;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
    }
    
    .logo img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    
    .header p {
      font-size: 16px;
      opacity: 0.9;
      margin: 0;
    }
    
    .content {
      padding: 40px 30px;
      background: #ffffff;
    }
    
    .user-info {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 24px;
      border-radius: 12px;
      margin: 24px 0;
      border-left: 4px solid #4f46e5;
    }
    
    .user-info h3 {
      color: #1e293b;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 8px;
    }
    
    .user-info p {
      color: #64748b;
      margin: 4px 0;
    }
    
    .approval-button {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff;
      padding: 16px 32px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      margin: 24px 0;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
      transition: all 0.3s ease;
      text-align: center;
      min-width: 200px;
    }
    
    .approval-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(79, 70, 229, 0.4);
    }
    
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    
    .security-notice {
      background: #fef3cd;
      border: 1px solid #fbbf24;
      border-radius: 8px;
      padding: 16px;
      margin: 24px 0;
    }
    
    .security-notice p {
      color: #92400e;
      margin: 0;
      font-size: 14px;
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
    
    .copyright {
      color: #64748b;
      font-size: 12px;
      margin-top: 20px;
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
    
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .header, .content, .footer {
        padding: 20px;
      }
      
      .approval-button {
        width: 100%;
        padding: 18px;
      }
    }
  </style>
</head>
<body>
  <div class="email-wrapper">
    <div class="header">
      <div class="logo">
        <img src="https://res.cloudinary.com/daolwstwj/image/upload/v1753955157/Across-media_nqdg0b.ico" alt="AMS Logo">
      </div>
      <h1>Across Media Solutions</h1>
      <p>Admin Portal - New User Approval Required</p>
    </div>
    
    <div class="content">
      <h2 style="color: #1e293b; font-size: 24px; margin-bottom: 16px;">New Admin Registration</h2>
      
      <p style="color: #475569; font-size: 16px; margin-bottom: 24px;">
        Hello Administrator,
      </p>
      
      <p style="color: #475569; font-size: 16px; margin-bottom: 24px;">
        A new user has registered for admin access to the Across Media Solutions portal and requires your approval to proceed.
      </p>
      
      <div class="user-info">
        <h3>👤 User Details</h3>
        <p><strong>Username:</strong> ${username}</p>
        <p><strong>Registration Date:</strong> ${new Date().toLocaleDateString()}</p>
        <p><strong>Status:</strong> Pending Approval</p>
      </div>
      
      <p style="color: #475569; font-size: 16px; margin: 24px 0;">
        Please review the user's credentials and click the button below to grant admin access to the platform.
      </p>
      
      <div class="button-container">
        <a href="${backendUrl}/api/admin/approve/${token}" class="approval-button">
          ✅ Approve Admin Access
        </a>
      </div>
      
      <div class="security-notice">
        <p>
          <strong>🔒 Security Notice:</strong> Only approve users you trust with administrative privileges. 
          This action will grant full access to the admin dashboard and all its features.
        </p>
      </div>
      
      <p style="color: #64748b; font-size: 14px; margin-top: 32px;">
        If you did not expect this registration or have concerns about this request, please contact your IT security team immediately.
      </p>
    </div>
    
    <div class="footer">
      <div class="footer-links">
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}">🏠 Home</a>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/login">🔐 Admin Login</a>
        <a href="${process.env.FRONTEND_URL || 'http://localhost:5173'}/contact">📞 Contact</a>
      </div>
      
      <div class="social-links">
        <a href="#" title="LinkedIn">in</a>
        <a href="#" title="Twitter">🐦</a>
        <a href="#" title="Instagram">📷</a>
      </div>
      
      <div class="copyright">
        <p>&copy; ${new Date().getFullYear()} Across Media Solutions. All rights reserved.</p>
        <p>Building digital experiences that connect brands with audiences.</p>
      </div>
    </div>
  </div>
</body>
</html>
`;
