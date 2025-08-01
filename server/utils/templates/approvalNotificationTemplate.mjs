export const approvalNotificationTemplate = (username, loginUrl) => `
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
    .button { display: inline-block; padding: 10px 20px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; }
    .button-container { text-align: center; margin-top: 20px; }
    .footer { margin-top: 20px; text-align: center; color: #777; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>AcrossMedia Admin Portal</h1>
      <h2>Your Admin Account has been Approved!</h2>
    </div>
    <div class="content">
      <p>Hello ${username},</p>
      <p>Congratulations! Your admin account for the AcrossMedia Admin Portal has been approved.</p>
      <p>You can now log in to your account and access the admin dashboard.</p>
      <div class="button-container">
        <a href="${loginUrl}" class="button">Login to Your Account</a>
      </div>
      <p>If the link above doesn't work, copy and paste this URL into your browser:</p>
      <p><a href="${loginUrl}">${loginUrl}</a></p>
    </div>
    <div class="footer">
      <p>This email was sent from AcrossMedia Admin Portal. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;
