export const approvalRequestTemplate = (backendUrl, token, username) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Account Approval Request</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .header {
      text-align: center;
      padding-bottom: 20px;
      border-bottom: 1px solid #dddddd;
    }
    .content {
      padding: 20px 0;
    }
    .footer {
      text-align: center;
      padding-top: 20px;
      font-size: 12px;
      color: #777777;
      border-top: 1px solid #dddddd;
    }
    .button {
      display: inline-block;
      padding: 10px 20px;
      margin: 20px 0;
      background-color: #28a745;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h2>Account Approval Request</h2>
    </div>
    <div class="content">
      <p>Hello,</p>
      <p>A new user, <strong>${username}</strong>, has registered and is awaiting your approval.</p>
      <p>Please review their details and click the button below to approve their account.</p>
      <a href="${backendUrl}/api/admin/approve/${token}" class="button">Approve User</a>
      <p>If you did not expect this, please ignore this email.</p>
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} Across Media Solutions. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;
