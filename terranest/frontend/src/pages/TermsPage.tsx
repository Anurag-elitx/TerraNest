import React from 'react';

const TermsPage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-lg text-gray-600">
            Last updated: June 15, 2023
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-700 leading-relaxed">
              By accessing and using TerraNest ("we," "our," or "us"), you accept and agree to be bound by the 
              terms and provision of this agreement. If you do not agree to abide by the above, please do not 
              use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description of Service</h2>
            <p className="text-gray-700 mb-4">
              TerraNest is a platform that helps individuals and organizations track and reduce their carbon 
              footprint through:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Action tracking and impact measurement</li>
              <li>Community challenges and engagement</li>
              <li>Educational resources and content</li>
              <li>Carbon offset marketplace</li>
              <li>Community forums and networking</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Accounts</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Account Creation</h3>
            <p className="text-gray-700 mb-4">
              To use certain features of our service, you must create an account. You agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and update your account information</li>
              <li>Keep your password secure and confidential</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized use</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Account Termination</h3>
            <p className="text-gray-700 mb-6">
              We reserve the right to terminate or suspend accounts that violate these terms, engage in 
              fraudulent activity, or pose a security risk to our platform or users.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acceptable Use</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Permitted Uses</h3>
            <p className="text-gray-700 mb-4">
              You may use TerraNest to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Track your environmental actions and impact</li>
              <li>Participate in challenges and community activities</li>
              <li>Share experiences and knowledge with other users</li>
              <li>Purchase verified carbon offsets</li>
              <li>Access educational content and resources</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Prohibited Uses</h3>
            <p className="text-gray-700 mb-4">
              You agree not to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Violate any applicable laws or regulations</li>
              <li>Infringe on intellectual property rights</li>
              <li>Post false, misleading, or fraudulent information</li>
              <li>Harass, abuse, or harm other users</li>
              <li>Distribute spam, malware, or malicious content</li>
              <li>Attempt to gain unauthorized access to our systems</li>
              <li>Use automated tools to scrape or harvest data</li>
              <li>Impersonate others or create fake accounts</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">User Content</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Your Content</h3>
            <p className="text-gray-700 mb-4">
              You retain ownership of content you post on TerraNest. By posting content, you grant us a 
              non-exclusive, worldwide, royalty-free license to use, display, and distribute your content 
              in connection with our services.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Content Standards</h3>
            <p className="text-gray-700 mb-4">
              All user content must:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>Be accurate and truthful</li>
              <li>Respect others' privacy and rights</li>
              <li>Be relevant to environmental and sustainability topics</li>
              <li>Comply with community guidelines</li>
              <li>Not contain offensive, harmful, or inappropriate material</li>
            </ul>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Content Moderation</h3>
            <p className="text-gray-700 mb-6">
              We reserve the right to review, moderate, and remove content that violates these terms or 
              our community guidelines. We may also suspend or terminate accounts of users who repeatedly 
              violate our content policies.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Carbon Offset Marketplace</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Third-Party Projects</h3>
            <p className="text-gray-700 mb-4">
              Carbon offset projects are provided by third-party organizations. While we verify project 
              credentials and standards compliance, we do not guarantee project outcomes or permanence.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Purchase Terms</h3>
            <ul className="list-disc pl-6 text-gray-700 mb-6">
              <li>All sales are final unless otherwise specified</li>
              <li>Offset certificates will be issued within 30 days of purchase</li>
              <li>Prices are subject to change without notice</li>
              <li>Payment processing is handled by secure third-party providers</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Intellectual Property</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Our Rights</h3>
            <p className="text-gray-700 mb-4">
              TerraNest and its content, features, and functionality are owned by us and protected by 
              international copyright, trademark, and other intellectual property laws.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Limited License</h3>
            <p className="text-gray-700 mb-6">
              We grant you a limited, non-exclusive, non-transferable license to access and use TerraNest 
              for personal or internal business purposes, subject to these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Privacy and Data Protection</h2>
            <p className="text-gray-700 mb-6">
              Your privacy is important to us. Please review our Privacy Policy, which also governs your 
              use of the service, to understand our practices regarding the collection and use of your 
              personal information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Disclaimers and Limitations</h2>
            
            <h3 className="text-xl font-medium text-gray-900 mb-3">Service Availability</h3>
            <p className="text-gray-700 mb-4">
              We strive to maintain service availability but do not guarantee uninterrupted access. 
              We may suspend or discontinue services for maintenance, updates, or other operational reasons.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Accuracy of Information</h3>
            <p className="text-gray-700 mb-4">
              While we strive for accuracy in our carbon calculations and environmental data, we make no 
              warranties about the completeness, reliability, or accuracy of this information.
            </p>

            <h3 className="text-xl font-medium text-gray-900 mb-3">Limitation of Liability</h3>
            <p className="text-gray-700 mb-6">
              To the fullest extent permitted by law, TerraNest shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, 
              whether incurred directly or indirectly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Indemnification</h2>
            <p className="text-gray-700 mb-6">
              You agree to defend, indemnify, and hold harmless TerraNest and its affiliates from and 
              against any claims, damages, costs, and expenses arising from your use of our services or 
              violation of these terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Governing Law</h2>
            <p className="text-gray-700 mb-6">
              These terms shall be governed by and construed in accordance with the laws of the State of 
              California, without regard to its conflict of law provisions. Any disputes shall be resolved 
              in the courts of San Francisco County, California.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Changes to Terms</h2>
            <p className="text-gray-700 mb-6">
              We reserve the right to modify these terms at any time. We will notify users of material 
              changes via email or through our platform. Continued use of our services after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Severability</h2>
            <p className="text-gray-700 mb-6">
              If any provision of these terms is found to be unenforceable or invalid, that provision 
              will be limited or eliminated to the minimum extent necessary so that the remaining terms 
              will remain in full force and effect.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contact Information</h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about these Terms of Service, please contact us:
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Email:</strong> legal@terranest.com
              </p>
              <p className="text-gray-700 mb-2">
                <strong>Address:</strong> 123 Green Street, San Francisco, CA 94102
              </p>
              <p className="text-gray-700">
                <strong>Phone:</strong> +1 (555) 123-4567
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Acknowledgment</h2>
            <p className="text-gray-700 mb-6">
              By using TerraNest, you acknowledge that you have read these Terms of Service, understand 
              them, and agree to be bound by them. If you do not agree to these terms, you must not use 
              our services.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
