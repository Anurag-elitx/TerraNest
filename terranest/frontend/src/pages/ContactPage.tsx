import React, { useState } from 'react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    
    try {
      // In a real app, you would submit to your API
      // const response = await api.post('/contact', formData);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubmitSuccess(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
      });
    } catch (error) {
      setSubmitError('There was an error submitting your message. Please try again.');
      console.error('Contact form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-24 lg:px-8">
        <div className="divide-y-2 divide-gray-200">
          <div className="lg:grid lg:grid-cols-3 lg:gap-8">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Get in touch
            </h2>
            <div className="mt-8 grid grid-cols-1 gap-12 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-12 lg:mt-0 lg:col-span-2">
              <div>
                <h3 className="text-lg font-medium text-gray-900">Support</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>Having issues with your account or the platform?</p>
                  <p className="mt-1">Our support team is here to help.</p>
                  <p className="mt-3 font-medium">support@terranest.com</p>
                </div>
              </div>
              <div></div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Partnerships</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>Interested in partnering with TerraNest?</p>
                  <p className="mt-1">Let's explore how we can work together.</p>
                  <p className="mt-3 font-medium">partnerships@terranest.com</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Press</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>For media inquiries and press resources.</p>
                  <p className="mt-3 font-medium">press@terranest.com</p>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900">Join Our Team</h3>
                <div className="mt-2 text-base text-gray-500">
                  <p>Looking for career opportunities?</p>
                  <p className="mt-1">Check out our open positions.</p>
                  <p className="mt-3 font-medium">careers@terranest.com</p>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 pt-16 lg:grid lg:grid-cols-3 lg:gap-8">
            <h2 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
              Send us a message
            </h2>
            <div className="mt-8 lg:mt-0 lg:col-span-2">
              {submitSuccess ? (
                <div className="rounded-md bg-green-50 p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium text-green-800">Message sent successfully</h3>
                      <div className="mt-2 text-sm text-green-700">
                        <p>Thank you for reaching out! We've received your message and will get back to you as soon as possible.</p>
                      </div>
                      <div className="mt-4">
                        <button
                          type="button"
                          onClick={() => setSubmitSuccess(false)}
                          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-green-700 bg-green-100 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                          Send another message
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
                  {submitError && (
                    <div className="sm:col-span-2 rounded-md bg-red-50 p-4 mb-4">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-red-800">Error</h3>
                          <div className="mt-2 text-sm text-red-700">
                            <p>{submitError}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="firstName"
                        id="firstName"
                        autoComplete="given-name"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                        value={formData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last name</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="lastName"
                        id="lastName"
                        autoComplete="family-name"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                        value={formData.lastName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <div className="mt-1">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                        value={formData.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone</label>
                    <div className="mt-1">
                      <input
                        type="text"
                        name="phone"
                        id="phone"
                        autoComplete="tel"
                        className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                        value={formData.phone}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700">Subject</label>
                    <div className="mt-1">
                      <select
                        id="subject"
                        name="subject"
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border-gray-300 rounded-md"
                        value={formData.subject}
                        onChange={handleChange}
                      >
                        <option value="">Please select</option>
                        <option value="support">Support</option>
                        <option value="feedback">Feedback</option>
                        <option value="partnership">Partnership</option>
                        <option value="press">Press</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                    <div className="mt-1">
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        required
                        className="py-3 px-4 block w-full shadow-sm focus:ring-primary focus:border-primary border border-gray-300 rounded-md"
                        value={formData.message}
                        onChange={handleChange}
                      ></textarea>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <div className="flex items-start">
                      <div className="flex-shrink-0">
                        <input
                          id="privacy-policy"
                          name="privacy-policy"
                          type="checkbox"
                          required
                          className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                        />
                      </div>
                      <div className="ml-3">
                        <p className="text-base text-gray-500">
                          By submitting this form, I agree to the{' '}
                          <a href="/privacy" className="font-medium text-gray-700 underline">
                            Privacy Policy
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary disabled:opacity-50"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
