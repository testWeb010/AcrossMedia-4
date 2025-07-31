import express from 'express';
import { body, validationResult } from 'express-validator';
import rateLimit from 'express-rate-limit';
import Admin from '../models/adminModel.mjs';
import { sendContactNotification } from '../utils/emailService.mjs';

const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 3, // Limit each IP to 3 requests per windowMs
  message: {
    error: 'Too many contact form submissions from this IP, please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Contact form submission
router.post('/submit', 
  contactLimiter,
  [
    body('name')
      .trim()
      .isLength({ min: 2, max: 100 })
      .withMessage('Name must be between 2 and 100 characters')
      .matches(/^[a-zA-Z\s]+$/)
      .withMessage('Name can only contain letters and spaces'),
    body('email')
      .isEmail()
      .normalizeEmail()
      .withMessage('Please provide a valid email address'),
    body('subject')
      .trim()
      .isLength({ min: 5, max: 200 })
      .withMessage('Subject must be between 5 and 200 characters'),
    body('message')
      .trim()
      .isLength({ min: 10, max: 1000 })
      .withMessage('Message must be between 10 and 1000 characters'),
  ],
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          error: 'Validation failed',
          details: errors.array()
        });
      }

      const { name, email, subject, message } = req.body;

      // Get all admins and superadmins from database
      const admins = await Admin.find({ 
        role: { $in: ['admin', 'superadmin'] } 
      }).select('email');

      if (admins.length === 0) {
        console.error('No admins found to send contact notification');
        return res.status(500).json({
          success: false,
          error: 'Unable to process your request at this time'
        });
      }

      // Send email to all admins
      const emailPromises = admins.map(admin => 
        sendContactNotification(admin.email, { name, email, subject, message })
      );

      await Promise.all(emailPromises);

      res.json({
        success: true,
        message: 'Your message has been sent successfully! We will get back to you soon.'
      });

    } catch (error) {
      console.error('Contact form submission error:', error);
      res.status(500).json({
        success: false,
        error: 'Failed to send message. Please try again later.'
      });
    }
  }
);

export default router;