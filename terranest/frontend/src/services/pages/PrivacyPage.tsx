import React from 'react';

const PrivacyPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-lg text-gray-600">
            Last updated: June 15, 2023
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Introduction</h2>
            <p className="text-gray-700 leading-relaxed">
              At TerraNest, we are committed to protecting your privacy and ensuring the security of your personal information. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our 
              platform and services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Personal Information</h3>
            <p className="text-gray-700 mb-4">
              We collect information you provide directly to us, such as:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Name and email address when you create an account</li>
              <li>Profile information including bio, location, and profile picture</li>
              <li>Organization details for corporate and school accounts</li>
              <li>Communication preferences and settings</li>
              <li>Messages and content you post in communities</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Usage Information</h3>
            <p className="text-gray-700 mb-4">
              We automatically collect certain information about your use of our services:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Actions you log and challenges you participate in</li>
              <li>Pages visited and features used</li>
              <li>Device information and browser type</li>
              <li>IP address and general location data</li>
              <li>Cookies and similar tracking technologies</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide, maintain, and improve our services</li>
              <li>Calculate and track your environmental impact</li>
              <li>Enable community features and facilitate connections</li>
              <li>Send you updates, newsletters, and important notifications</li>
              <li>Respond to your comments, questions, and customer service requests</li>
              <li>Analyze usage patterns to improve user experience</li>
              <li>Detect, prevent, and address technical issues and security threats</li>
              <li>Comply with legal obligations and enforce our terms of service</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Information Sharing and Disclosure</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Public Information</h3>
            <p className="text-gray-700 mb-4">
              Some information is public by default:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Your profile name and bio</li>
              <li>Posts and comments in public communities</li>
              <li>Challenge participation and achievements (unless you opt out)</li>
              <li>Leaderboard rankings (anonymized unless you opt in)</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Third-Party Services</h3>
            <p className="text-gray-700 mb-4">
              We may share information with trusted third parties who assist us in operating our platform:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Cloud hosting and data storage providers</li>
              <li>Analytics and performance monitoring services</li>
              <li>Email and communication service providers</li>
              <li>Carbon offset project verification partners</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Legal Requirements</h3>
            <p className="text-gray-700 mb-6">
              We may disclose your information if required by law, regulation, legal process, or governmental request, 
              or to protect the rights, property, or safety of TerraNest, our users, or others.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Data Security</h2>
            <p className="text-gray-700 mb-4">
              We implement appropriate technical and organizational measures to protect your personal information:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security audits and vulnerability assessments</li>
              <li>Access controls and authentication requirements</li>
              <li>Employee training on data protection practices</li>
              <li>Incident response procedures for security breaches</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Your Rights and Choices</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Account Management</h3>
            <p className="text-gray-700 mb-4">
              You can access and update your account information at any time through your profile settings.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Privacy Controls</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Choose what information is public on your profile</li>
              <li>Control email notification preferences</li>
              <li>Opt out of leaderboards and public rankings</li>
              <li>Manage community participation settings</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Data Rights</h3>
            <p className="text-gray-700 mb-4">
              Depending on your location, you may have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Request access to your personal information</li>
              <li>Correct inaccurate or incomplete data</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict certain processing activities</li>
              <li>Data portability for information you've provided</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
            <p className="text-gray-700 mb-4">
              We use cookies and similar technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Remember your preferences and settings</li>
              <li>Analyze site traffic and usage patterns</li>
              <li>Provide personalized content and recommendations</li>
              <li>Improve site performance and user experience</li>
            </ul>
            <p className="text-gray-700 mb-6">
              You can control cookie settings through your browser preferences. Note that disabling certain 
              cookies may affect the functionality of our services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Children's Privacy</h2>
            <p className="text-gray-700 mb-6">
              Our services are not intended for children under 13 years of age. We do not knowingly collect 
              personal information from children under 13. If you are a parent or guardian and believe your 
              child has provided us with personal information, please contact us immediately.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">International Data Transfers</h2>
            <p className="text-gray-700 mb-6">
              Your information may be transferred to and processed in countries other than your own. 
              We ensure appropriate safeguards are in place to protect your personal information in 
              accordance with applicable data protection laws.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-700 mb-6">
              We may update this Privacy Policy from time to time. We will notify you of any material 
              changes by posting the new policy on this page and updating the "Last updated" date. 
              We encourage you to review this policy periodically.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> privacy@terranest.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 123 Green Street, San Francisco, CA 94102
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;
