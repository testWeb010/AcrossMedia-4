export const approvalNotificationTemplate = (username, loginUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Across Media Solutions Admin Portal</title>
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
      background: linear-gradient(135deg, #10b981 0%, #059669 100%);
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
      animation: shimmer 3s linear infinite;
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
    
    .success-icon {
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
    
    .welcome-message {
      text-align: center;
      margin-bottom: 32px;
    }
    
    .welcome-message h2 {
      color: #1e293b;
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 16px;
    }
    
    .welcome-message p {
      color: #64748b;
      font-size: 16px;
      line-height: 1.7;
    }
    
    .user-card {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 24px;
      border-radius: 12px;
      margin: 24px 0;
      border-left: 4px solid #10b981;
      text-align: center;
    }
    
    .user-card h3 {
      color: #1e293b;
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .features-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 16px;
      margin: 32px 0;
    }
    
    .feature-item {
      background: #f8fafc;
      padding: 20px;
      border-radius: 8px;
      text-align: center;
      border: 1px solid #e2e8f0;
    }
    
    .feature-item .emoji {
      font-size: 24px;
      margin-bottom: 8px;
      display: block;
    }
    
    .feature-item h4 {
      color: #1e293b;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 4px;
    }
    
    .feature-item p {
      color: #64748b;
      font-size: 12px;
      margin: 0;
    }
    
    .login-button {
      display: inline-block;
      background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);
      color: #ffffff;
      padding: 18px 36px;
      border-radius: 12px;
      text-decoration: none;
      font-weight: 600;
      font-size: 18px;
      margin: 32px 0;
      box-shadow: 0 8px 20px rgba(79, 70, 229, 0.3);
      transition: all 0.3s ease;
      text-align: center;
      min-width: 250px;
    }
    
    .login-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 12px 28px rgba(79, 70, 229, 0.4);
    }
    
    .button-container {
      text-align: center;
      margin: 32px 0;
    }
    
    .backup-link {
      background: #f1f5f9;
      padding: 16px;
      border-radius: 8px;
      margin: 24px 0;
      border: 1px solid #cbd5e1;
    }
    
    .backup-link p {
      color: #475569;
      font-size: 14px;
      margin-bottom: 8px;
    }
    
    .backup-link a {
      color: #4f46e5;
      word-break: break-all;
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
    
    .next-steps {
      background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
      padding: 24px;
      border-radius: 12px;
      margin: 24px 0;
      border-left: 4px solid #3b82f6;
    }
    
    .next-steps h3 {
      color: #1e40af;
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 12px;
    }
    
    .next-steps ul {
      color: #1e40af;
      padding-left: 20px;
      margin: 0;
    }
    
    .next-steps li {
      margin-bottom: 8px;
      font-size: 14px;
    }
    
    @media only screen and (max-width: 600px) {
      body {
        padding: 10px;
      }
      
      .header, .content, .footer {
        padding: 20px;
      }
      
      .login-button {
        width: 100%;
        padding: 20px;
      }
      
      .features-grid {
        grid-template-columns: 1fr;
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
      <div class="success-icon">✅</div>
      <h1>Welcome to the Team!</h1>
      <p>Your admin account has been approved</p>
    </div>
    
    <div class="content">
      <div class="welcome-message">
        <h2>🎉 Congratulations, ${username}!</h2>
        <p>Your admin account for <strong>Across Media Solutions</strong> has been successfully approved. You now have full access to our administrative dashboard and all its powerful features.</p>
      </div>
      
      <div class="user-card">
        <h3>👋 Welcome ${username}</h3>
        <p style="color: #64748b; margin: 0;">Admin Status: <span style="color: #10b981; font-weight: 600;">APPROVED ✓</span></p>
      </div>
      
      <div class="features-grid">
        <div class="feature-item">
          <span class="emoji">📊</span>
          <h4>Dashboard</h4>
          <p>Analytics & Insights</p>
        </div>
        <div class="feature-item">
          <span class="emoji">👥</span>
          <h4>User Management</h4>
          <p>Manage team members</p>
        </div>
        <div class="feature-item">
          <span class="emoji">🎥</span>
          <h4>Content</h4>
          <p>Videos & Projects</p>
        </div>
        <div class="feature-item">
          <span class="emoji">⚙️</span>
          <h4>Settings</h4>
          <p>System configuration</p>
        </div>
      </div>
      
      <div class="button-container">
        <a href="${loginUrl}" class="login-button">
          🚀 Access Admin Dashboard
        </a>
      </div>
      
      <div class="next-steps">
        <h3>🎯 Next Steps</h3>
        <ul>
          <li>Complete your profile setup in the dashboard</li>
          <li>Explore the admin features and tools available</li>
          <li>Set up your notification preferences</li>
          <li>Review the user management and content sections</li>
        </ul>
      </div>
      
      <div class="backup-link">
        <p><strong>🔗 Can't click the button above?</strong></p>
        <p>Copy and paste this link into your browser:</p>
        <a href="${loginUrl}">${loginUrl}</a>
      </div>
      
      <p style="color: #64748b; font-size: 14px; margin-top: 32px; text-align: center;">
        If you have any questions or need assistance, our support team is here to help. Welcome aboard! 🌟
      </p>
    </div>
    
    <div class="footer">
      <div class="footer-links">
        <a href="${loginUrl.replace('/login', '')}">🏠 Home</a>
        <a href="${loginUrl}">🔐 Admin Login</a>
        <a href="${loginUrl.replace('/login', '/contact')}">📞 Support</a>
        <a href="${loginUrl.replace('/login', '/about')}">ℹ️ About</a>
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
          This email was sent from our secure notification system. Please do not reply directly to this email.
        </p>
      </div>
    </div>
  </div>
</body>
</html>
`;
