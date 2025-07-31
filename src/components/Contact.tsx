import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    general: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Client-side validation
  const validateField = (name: string, value: string) => {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Name is required';
        if (value.trim().length < 2) return 'Name must be at least 2 characters';
        if (value.trim().length > 100) return 'Name must be less than 100 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Name can only contain letters and spaces';
        return '';
      
      case 'email':
        if (!value.trim()) return 'Email is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Please enter a valid email address';
        return '';
      
      case 'subject':
        if (!value.trim()) return 'Subject is required';
        if (value.trim().length < 5) return 'Subject must be at least 5 characters';
        if (value.trim().length > 200) return 'Subject must be less than 200 characters';
        return '';
      
      case 'message':
        if (!value.trim()) return 'Message is required';
        if (value.trim().length < 10) return 'Message must be at least 10 characters';
        if (value.trim().length > 1000) return 'Message must be less than 1000 characters';
        return '';
      
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      subject: validateField('subject', formData.subject),
      message: validateField('message', formData.message),
      general: ''
    };
    
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
        general: ''
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Clear previous errors
    setErrors({
      name: '',
      email: '',
      subject: '',
      message: '',
      general: ''
    });

    // Validate form
    if (!validateForm()) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/contact/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
        setErrors({
          name: '',
          email: '',
          subject: '',
          message: '',
          general: ''
        });
      } else {
        // Handle validation errors from server
        if (data.details && Array.isArray(data.details)) {
          const serverErrors = {
            name: '',
            email: '',
            subject: '',
            message: '',
            general: ''
          };
          
          data.details.forEach((error: any) => {
            if (error.path && serverErrors.hasOwnProperty(error.path)) {
              serverErrors[error.path as keyof typeof serverErrors] = error.msg;
            }
          });
          
          setErrors(serverErrors);
        } else {
          setErrors(prev => ({
            ...prev,
            general: data.error || 'Failed to send message. Please try again.'
          }));
        }
      }
    } catch (error) {
      console.error('Contact form error:', error);
      setErrors(prev => ({
        ...prev,
        general: 'Failed to send message. Please check your connection and try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-gray-900 to-black relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-full px-6 py-3 mb-8">
            <MessageCircle className="w-4 h-4 text-cyan-400" />
            <span className="text-cyan-400 text-sm font-medium tracking-wider uppercase">Get In Touch</span>
          </div>
          
          <h2 className="text-5xl lg:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Let's Create Something
            </span>
            <br />
            <span className="bg-gradient-to-r from-cyan-400 to-pink-500 bg-clip-text text-transparent">
              Extraordinary
            </span>
          </h2>
          
          <p className="text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Ready to transform your brand? Let's discuss your vision and create 
            a strategic media solution that delivers exceptional results.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-10">
            <div>
              <h3 className="text-3xl font-bold text-white mb-8">Start Your Journey</h3>
              <p className="text-gray-300 leading-relaxed mb-10">
                We're passionate about bringing your vision to life through innovative media solutions. 
                Our team is ready to collaborate with you on creating impactful campaigns that resonate 
                with your audience and drive meaningful results.
              </p>
            </div>

            <div className="space-y-8">
              <div className="group flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Mail size={28} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg mb-1">Email</div>
                  <div className="text-gray-400">hello@acrossmedia.in</div>
                </div>
              </div>

              <div className="group flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Phone size={28} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg mb-1">Phone</div>
                  <div className="text-gray-400">+91 98765 43210</div>
                </div>
              </div>

              <div className="group flex items-center gap-6">
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={28} className="text-white" />
                </div>
                <div>
                  <div className="font-semibold text-white text-lg mb-1">Office</div>
                  <div className="text-gray-400">Mumbai, Maharashtra, India</div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Glowing border effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-pink-600 rounded-3xl blur opacity-20"></div>
            
            <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 border border-gray-700">
              <form onSubmit={handleSubmit} className="space-y-8">
                {errors.general && (
                  <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3">
                    <AlertCircle size={20} className="text-red-400 flex-shrink-0" />
                    <span className="text-red-400 text-sm">{errors.general}</span>
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">Name</label>
                    <input 
                      type="text" 
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      onBlur={() => {
                        const error = validateField('name', formData.name);
                        setErrors(prev => ({ ...prev, name: error }));
                      }}
                      className={`w-full px-6 py-4 bg-gray-700/50 border rounded-xl focus:ring-2 focus:border-transparent transition-all text-white placeholder-gray-400 ${
                        errors.name 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-cyan-500'
                      }`}
                      placeholder="Your name"
                    />
                    {errors.name && (
                      <div className="mt-2 flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                        <span className="text-red-400 text-sm">{errors.name}</span>
                      </div>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-white mb-3">Email</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      onBlur={() => {
                        const error = validateField('email', formData.email);
                        setErrors(prev => ({ ...prev, email: error }));
                      }}
                      className={`w-full px-6 py-4 bg-gray-700/50 border rounded-xl focus:ring-2 focus:border-transparent transition-all text-white placeholder-gray-400 ${
                        errors.email 
                          ? 'border-red-500 focus:ring-red-500' 
                          : 'border-gray-600 focus:ring-cyan-500'
                      }`}
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <div className="mt-2 flex items-center gap-2">
                        <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                        <span className="text-red-400 text-sm">{errors.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Subject</label>
                  <input 
                    type="text" 
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    onBlur={() => {
                      const error = validateField('subject', formData.subject);
                      setErrors(prev => ({ ...prev, subject: error }));
                    }}
                    className={`w-full px-6 py-4 bg-gray-700/50 border rounded-xl focus:ring-2 focus:border-transparent transition-all text-white placeholder-gray-400 ${
                      errors.subject 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-cyan-500'
                    }`}
                    placeholder="Project inquiry"
                  />
                  {errors.subject && (
                    <div className="mt-2 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <span className="text-red-400 text-sm">{errors.subject}</span>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-white mb-3">Message</label>
                  <textarea 
                    rows={6}
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    onBlur={() => {
                      const error = validateField('message', formData.message);
                      setErrors(prev => ({ ...prev, message: error }));
                    }}
                    className={`w-full px-6 py-4 bg-gray-700/50 border rounded-xl focus:ring-2 focus:border-transparent transition-all resize-none text-white placeholder-gray-400 ${
                      errors.message 
                        ? 'border-red-500 focus:ring-red-500' 
                        : 'border-gray-600 focus:ring-cyan-500'
                    }`}
                    placeholder="Tell us about your vision and how we can help bring it to life..."
                  ></textarea>
                  {errors.message && (
                    <div className="mt-2 flex items-center gap-2">
                      <AlertCircle size={16} className="text-red-400 flex-shrink-0" />
                      <span className="text-red-400 text-sm">{errors.message}</span>
                    </div>
                  )}
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting || Object.values(errors).some(error => error !== '')}
                  className="group relative overflow-hidden w-full bg-gradient-to-r from-cyan-500 to-pink-600 text-white px-8 py-5 rounded-xl font-semibold transition-all duration-300 hover:shadow-2xl hover:shadow-cyan-500/25 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-pink-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center gap-3">
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        <span>Send Message</span>
                      </>
                    )}
                  </div>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

