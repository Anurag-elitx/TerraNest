import React, { useState } from 'react';

const FAQPage: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenItem(openItem === index ? null : index);
  };

  const faqs = [
    {
      question: "What is TerraNest?",
      answer: "TerraNest is a platform that helps individuals and communities take meaningful climate action through practical steps, challenges, and community engagement. We provide tools to track your environmental impact, connect with like-minded people, and make sustainable choices easier."
    },
    {
      question: "How do I get started?",
      answer: "Getting started is easy! Simply create an account, complete your profile, and you'll receive personalized action recommendations based on your lifestyle. You can start tracking your actions, join challenges, and connect with the community right away."
    },
    {
      question: "How are carbon emissions calculated?",
      answer: "We calculate carbon emissions using established methodologies from environmental research. For each action, we consider factors like energy consumption, transportation methods, and resource use. Our calculations are regularly reviewed and updated to ensure accuracy."
    },
    {
      question: "Are the actions really making a difference?",
      answer: "Yes! While individual actions may seem small, their collective impact is significant. Our platform aggregates the impact of all users, showing how community efforts add up. Additionally, many actions create ripple effects by influencing others and supporting sustainable businesses and policies."
    },
    {
      question: "What are challenges and how do they work?",
      answer: "Challenges are time-bound activities focused on specific sustainability goals. They might involve reducing plastic use, cutting transportation emissions, or adopting plant-based meals. You can join challenges, track your progress, and earn rewards upon completion. Challenges can be global, local, or organization-specific."
    },
    {
      question: "How do organizations use TerraNest?",
      answer: "Organizations like schools and businesses use TerraNest to engage their members in sustainability initiatives, track collective impact, create custom challenges, and foster a culture of environmental responsibility. We offer special features for organizational accounts to manage and motivate their communities."
    },
    {
      question: "Is my data private?",
      answer: "We take privacy seriously. Your personal information is protected and never sold to third parties. You control what you share with the community. Aggregate, anonymized data may be used to improve our platform and demonstrate collective impact. Please see our Privacy Policy for more details."
    },
    {
      question: "How can I offset my remaining carbon footprint?",
      answer: "After reducing your emissions through actions, you can offset remaining emissions through our verified carbon offset projects. These projects, ranging from reforestation to renewable energy, are carefully vetted to ensure they deliver real climate benefits. You can purchase offsets directly through our platform."
    },
    {
      question: "How can I get involved beyond individual actions?",
      answer: "Beyond personal actions, you can join or create community groups, participate in local events, share resources and tips, and invite friends to join TerraNest. We also provide information on advocacy opportunities and ways to support systemic change."
    },
    {
      question: "I have a suggestion or found a bug. How can I report it?",
      answer: "We welcome your feedback! Please use our Contact form to report bugs, suggest features, or share your experience. Your input helps us improve TerraNest for everyone."
    }
  ];

  return (
    <div className="bg-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto divide-y-2 divide-gray-200">
          <h2 className="text-center text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently asked questions
          </h2>
          <dl className="mt-6 space-y-6 divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="pt-6">
                <dt className="text-lg">
                  <button
                    onClick={() => toggleItem(index)}
                    className="text-left w-full flex justify-between items-start text-gray-400"
                  >
                    <span className="font-medium text-gray-900">{faq.question}</span>
                    <span className="ml-6 h-7 flex items-center">
                      <svg
                        className={`${openItem === index ? '-rotate-180' : 'rotate-0'} h-6 w-6 transform transition-transform duration-200 ease-in-out`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </span>
                  </button>
                </dt>
                <dd className={`mt-2 pr-12 transition-all duration-200 ease-in-out ${openItem === index ? 'block opacity-100' : 'hidden opacity-0'}`}>
                  <p className="text-base text-gray-500">{faq.answer}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="mt-20 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-gray-900">
            Still have questions?
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            If you couldn't find the answer to your question, please contact us directly.
          </p>
          <div className="mt-6">
            <a
              href="/contact"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;