import React from 'react';
import { Link } from 'react-router-dom';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Terms of Service
          </h1>
          <p className="mt-4 text-gray-500">
            Last updated: June 15, 2023
          </p>
          
          <div className="mt-8 prose prose-green prose-lg text-gray-500">
            <h2>Agreement to Terms</h2>
            <p>
              These Terms of Service ("Terms") constitute a legally binding agreement between you and TerraNest ("we," "us," or "our") governing your access to and use of the TerraNest website, mobile application, and related services (collectively, the "Platform").
            </p>
            <p>
              By accessing or using our Platform, you agree to be bound by these Terms. If you do not agree to these Terms, you may not access or use the Platform.
            </p>
            
            <h2>Eligibility</h2>
            <p>
              To use the Platform, you must be at least 13 years of age. If you are under 18, you must have permission from a parent or guardian. By using the Platform, you represent and warrant that you meet these eligibility requirements.
            </p>
            
            <h2>Account Registration</h2>
            <p>
              To access certain features of the Platform, you must register for an account. When you register, you agree to provide accurate, current, and complete information and to update this information to maintain its accuracy. You are responsible for safeguarding your password and for all activities that occur under your account.
            </p>
            <p>
              We reserve the right to disable any user account if we believe you have violated these Terms or if we determine, in our sole discretion, that your account poses a security risk.
            </p>
            
            <h2>User Content</h2>
            <p>
              Our Platform allows you to post, link, store, share, and otherwise make available certain information, text, graphics, videos, or other material ("User Content"). You are solely responsible for the User Content that you post on or through the Platform.
            </p>
            <p>
              By posting User Content, you grant us a non-exclusive, transferable, sub-licensable, royalty-free, worldwide license to use, copy, modify, create derivative works based on, distribute, publicly display, publicly perform, and otherwise exploit in any manner such User Content in all formats and distribution channels now known or hereafter devised, without further notice to or consent from you, and without the requirement of payment to you or any other person or entity.
            </p>
            <p>
              You represent and warrant that: (i) you own the User Content or have the right to grant the rights and licenses contained in these Terms, and (ii) the posting of your User Content does not violate the privacy rights, publicity rights, copyrights, contract rights, or any other rights of any person.
            </p>
            
            <h2>Prohibited Conduct</h2>
            <p>
              You agree not to:
            </p>
            <ul>
              <li>Use the Platform for any illegal purpose or in violation of any local, state, national, or international law</li>
              <li>Violate or encourage others to violate the rights of third parties, including intellectual property rights</li>
              <li>Post, upload, or distribute any User Content that is unlawful, defamatory, libelous, inaccurate, or that a reasonable person could deem to be objectionable, profane, indecent, pornographic, harassing, threatening, hateful, or otherwise inappropriate</li>
              <li>Interfere with security-related features of the Platform</li>
              <li>Interfere with the operation of the Platform or any user's enjoyment of the Platform</li>
              <li>Use any robot, spider, crawler, scraper, or other automated means to access the Platform</li>
              <li>Attempt to circumvent any technological measure implemented by us to protect the Platform</li>
              <li>Attempt to decipher, decompile, disassemble, or reverse engineer any of the software used to provide the Platform</li>
            </ul>
            
            <h2>Intellectual Property Rights</h2>
            <p>
              The Platform and its content, features, and functionality are owned by TerraNest and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            <p>
              These Terms do not grant you any right, title, or interest in the Platform, its content, or our trademarks, logos, or other brand features.
            </p>
            
            <h2>Third-Party Links and Services</h2>
            <p>
              The Platform may contain links to third-party websites or services that are not owned or controlled by TerraNest. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and bar access to the Platform immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach these Terms.
            </p>
            <p>
              Upon termination, your right to use the Platform will immediately cease. If you wish to terminate your account, you may simply discontinue using the Platform or delete your account.
            </p>
            
            <h2>Disclaimer of Warranties</h2>
            <p>
              THE PLATFORM IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.
            </p>
            <p>
              WE DO NOT GUARANTEE THAT THE PLATFORM IS OR WILL REMAIN SECURE, COMPLETE, OR CORRECT, OR THAT ACCESS TO THE PLATFORM WILL BE UNINTERRUPTED. THE PLATFORM MAY INCLUDE INACCURACIES, ERRORS, AND MATERIALS THAT VIOLATE OR CONFLICT WITH THESE TERMS.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL TERRANEST BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL, USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO YOUR USE OF, OR INABILITY TO USE, THE PLATFORM.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without regard to its conflict of law provisions.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make changes, we will provide notice by posting the updated Terms on the Platform and updating the "Last Updated" date. Your continued use of the Platform after such notice constitutes your acceptance of the updated Terms.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p>
              TerraNest<br />
              Email: terms@terranest.com<br />
              Address: 123 Green Street, Eco City, EC 12345
            </p>
          </div>
          
          <div className="mt-10 flex justify-center">
            <Link to="/" className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
