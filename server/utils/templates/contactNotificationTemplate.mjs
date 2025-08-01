/**
 * @file contactNotificationTemplate.mjs
 * @description Exports a professional HTML email template for contact form submissions.
 */

/**
 * Generates a professional HTML email template for a new contact form submission.
 * This template is designed for maximum compatibility with various email clients by using inlined CSS and table-based layouts.
 *
 * @param {string} name - The name of the person who submitted the form.
 * @param {string} email - The email address of the person who submitted the form.
 * @param {string} subject - The subject of the message.
 * @param {string} message - The content of the message.
 * @param {string} logoUrl - The URL for the company logo to be displayed in the header.
 * @returns {string} The complete HTML email as a string.
 */
export const contactNotificationTemplate = (name, email, subject, message, logoUrl) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
  <!-- The style block is a fallback and for reference. All critical styles are inlined. -->
  <style>
    body {
      margin: 0;
      padding: 0;
      width: 100% !important;
      -webkit-text-size-adjust: 100%;
      -ms-text-size-adjust: 100%;
    }
  </style>
</head>
<body style="margin: 0; padding: 0; background-color: #f4f7f6; font-family: Arial, Helvetica, sans-serif;">
  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
    <tr>
      <td style="padding: 20px 0;">
        <!-- Main Container -->
        <table align="center" border="0" cellpadding="0" cellspacing="0" width="600" style="max-width: 600px; margin: 0 auto; border-collapse: collapse;">
          <tr>
            <td style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); overflow: hidden;">
              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                
                <!-- Header: Logo -->
                <tr>
                  <td style="padding: 40px 30px 20px 30px; text-align: center;">
                    <img src="${logoUrl}" alt="Across Media Solutions Logo" width="150" style="max-width: 150px; height: auto; display: block; margin: 0 auto;">
                  </td>
                </tr>
                
                <!-- Header: Main Title -->
                <tr>
                  <td style="padding: 0 30px 20px 30px; text-align: center;">
                    <h1 style="font-size: 24px; font-weight: bold; color: #333333; margin: 0;">New Contact Form Submission</h1>
                  </td>
                </tr>
                
                <!-- Body: Introduction -->
                <tr>
                  <td style="padding: 0 30px 30px 30px; font-size: 16px; line-height: 1.5; color: #555555; text-align: left;">
                    <p style="margin: 0;">You have received a new message from your website's contact form.</p>
                  </td>
                </tr>

                <!-- Body: Submission Details -->
                <tr>
                  <td style="padding: 0 30px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="border-collapse: collapse; border: 1px solid #eeeeee; border-radius: 4px;">
                      <tr>
                        <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-size: 16px; color: #333333; background-color: #fcfcfc;">
                          <strong style="color: #555555;">Name:</strong>
                        </td>
                        <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-size: 16px; color: #333333;">
                          ${name}
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-size: 16px; color: #333333; background-color: #fcfcfc;">
                          <strong style="color: #555555;">Email:</strong>
                        </td>
                        <td style="padding: 12px 15px; border-bottom: 1px solid #eeeeee; font-size: 16px; color: #333333;">
                          <a href="mailto:${email}" style="color: #007bff; text-decoration: none;">${email}</a>
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 12px 15px; font-size: 16px; color: #333333; background-color: #fcfcfc;">
                          <strong style="color: #555555;">Subject:</strong>
                        </td>
                        <td style="padding: 12px 15px; font-size: 16px; color: #333333;">
                          ${subject}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Body: Message Content Section -->
                <tr>
                  <td style="padding: 30px 30px;">
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">
                      <tr>
                        <td>
                          <h2 style="font-size: 18px; font-weight: bold; color: #333333; margin: 0 0 15px 0;">Message Content</h2>
                        </td>
                      </tr>
                      <tr>
                        <td style="background-color: #f4f7f6; border-radius: 4px; padding: 20px;">
                          <p style="margin: 0; font-size: 15px; line-height: 1.6; color: #555555; white-space: pre-wrap; word-wrap: break-word;">${message}</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- CTA Button -->
                <tr>
                  <td style="padding: 0 30px 40px 30px; text-align: center;">
                    <a href="mailto:${email}?subject=Re%3A%20${encodeURIComponent(subject)}" style="background-color: #007bff; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 5px; font-size: 16px; font-weight: bold; display: inline-block;">Reply to ${name}</a>
                  </td>
                </tr>
                
                <!-- Footer -->
                <tr>
                  <td style="padding: 20px 30px; background-color: #ffffff;">
                    <hr style="border: 0; border-top: 1px solid #eeeeee;">
                  </td>
                </tr>
                <tr>
                  <td style="padding: 0 30px 30px 30px; text-align: center; font-size: 12px; color: #999999; line-height: 1.4;">
                    <p style="margin: 0 0 5px 0;"><strong>Across Media Solutions</strong></p>
                    <p style="margin: 0;">This is an automated notification. Please do not reply directly to this email.</p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`;