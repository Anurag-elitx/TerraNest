import React, { useState } from 'react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    id: 1,
    question: "What is TerraNest and how does it work?",
    answer: "TerraNest is a platform that helps individuals and organizations track, reduce, and offset their carbon footprint. You can log daily actions, participate in challenges, connect with communities, and purchase verified carbon offsets. Our science-based calculations help you understand your environmental impact and make meaningful progress toward sustainability goals.",
    category: "General"
  },
  {
    id: 2,
    question: "How do you calculate carbon emissions and savings?",
    answer: "Our calculations are based on peer-reviewed research and established methodologies from organizations like the EPA, IPCC, and academic institutions. We use lifecycle assessments that consider the full environmental impact of actions, from production to disposal. Our data is regularly updated to reflect the latest scientific understanding.",
    category: "Calculations"
  },
  {
    id: 3,
    question: "Is TerraNest free to use?",
    answer: "Yes! TerraNest offers a comprehensive free tier that includes action tracking, community participation, challenges, and basic analytics. We also offer premium features for individuals and organizations that want advanced analytics, custom challenges, and priority support.",
    category: "Pricing"
  },
  {
    id: 4,
    question: "How do I verify that carbon offset projects are legitimate?",
    answer: "All carbon offset projects on our marketplace are verified by recognized standards like Verra (VCS), Gold Standard, Climate Action Reserve, or American Carbon Registry. We provide detailed project information, verification documents, and regular updates on project progress. You can view certificates and tracking information for all your purchases.",
    category: "Carbon Offsets"
  },
  {
    id: 5,
    question: "Can organizations and schools use TerraNest?",
    answer: "Absolutely! We offer specialized features for organizations including team dashboards, custom challenges, group analytics, and administrative controls. Schools can track campus-wide initiatives, and corporations can manage employee engagement programs. Contact us for a demo of our organizational features.",
    category: "Organizations"
  },
  {
    id: 6,
    question: "How accurate are the carbon footprint calculations?",
    answer: "Our calculations are based on the best available data and methodologies, but they are estimates. Individual circumstances can vary significantly. We provide ranges and confidence intervals where appropriate, and we're continuously improving our models based on new research and user feedback.",
    category: "Calculations"
  },
  {
    id: 7,
    question: "What types of actions can I track?",
    answer: "You can track actions across six main categories: Transportation (biking, public transit, electric vehicles), Energy (renewable energy, efficiency improvements), Food (plant-based meals, local sourcing), Waste (recycling, composting, reduction), Water (conservation, efficiency), and Other (tree planting, advocacy, education).",
    category: "Actions"
  },
  {
    id: 8,
    question: "How do challenges work?",
    answer: "Challenges are time-bound activities that encourage specific environmental actions. They can be global (open to everyone), organizational (for specific groups), or local (for geographic communities). Participants track their progress, earn points and badges, and can see leaderboards. Challenges help build motivation and community engagement.",
    category: "Challenges"
  },
  {
    id: 9,
    question: "Is my personal data secure and private?",
    answer: "Yes, we take data security and privacy very seriously. We use industry-standard encryption, secure hosting, and follow best practices for data protection. You control what information is public on your profile, and we never sell personal data to third parties. Please review our Privacy Policy for complete details.",
    category: "Privacy"
  },
  {
    id: 10,
    question: "Can I connect with other users?",
    answer: "Yes! TerraNest has robust community features. You can join topic-based communities, participate in discussions, share achievements, and collaborate on challenges. You can also create or join local groups, follow other users, and participate in forums focused on specific sustainability topics.",
    category: "Community"
  },
  {
    id: 11,
    question: "What happens to my data if I delete my account?",
    answer: "If you delete your account, we will remove your personal information within 30 days. However, anonymized data may be retained for research and platform improvement purposes. Any carbon offsets you've purchased will remain valid, and certificates will still be accessible through our verification system.",
    category: "Privacy"
  },
  {
    id: 12,
    question: "How often should I log actions?",
    answer: "You can log actions as frequently as you like! Some users log daily activities, while others update weekly or monthly. The platform is designed to be flexible. We recommend finding a rhythm that works for you - consistency is more important than frequency. You can also set up reminders to help build the habit.",
    category: "Actions"
  },
  {
    id: 13,
    question: "Do carbon offsets actually work?",
    answer: "When properly verified and monitored, carbon offsets can be an effective tool for climate action. However, they should complement, not replace, efforts to reduce emissions. We only work with projects that meet rigorous standards for additionality, permanence, and verification. We also provide education on the offset hierarchy: reduce first, then offset.",
    category: "Carbon Offsets"
  },
  {
    id: 14,
    question: "Can I export my data?",
    answer: "Yes, you can export your action history, impact calculations, and other personal data at any time through your account settings. Data is available in CSV and JSON formats. This ensures you maintain control over your information and can use it with other tools if desired.",
    category: "General"
  },
  {
    id: 15,
    question: "How do I report a problem or get support?",
    answer: "You can contact our support team through the Contact page, email support@terranest.com, or use the help chat feature in your dashboard. We typically respond within 24 hours. For urgent technical issues, we aim to respond within 4 hours during business days.",
    category: "Support"
  }
];

const categories = ["All", "General", "Calculations", "Actions", "Challenges", "Carbon Offsets", "Community", "Organizations", "Privacy", "Pricing", "Support"];

const FAQPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [openItems, setOpenItems] = useState<number[]>([]);

  const filteredFAQs = faqData.filter(faq => {
    const matchesCategory = selectedCategory === "All" || faq.category === selectedCategory;
    const matchesSearch = faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleItem = (id: number) => {
    setOpenItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-gray-600">
            Find answers to common questions about TerraNest and climate action.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <svg
              className="absolute left-3 top-3.5 h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {filteredFAQs.map(faq => (
            <div key={faq.id} className="bg-white rounded-lg shadow">
              <button
                onClick={() => toggleItem(faq.id)}
                className="w-full px-6 py-4 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:ring-inset"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {faq.question}
                    </h3>
                    <span className="text-sm text-primary font-medium">
                      {faq.category}
                    </span>
                  </div>
                  <svg
                    className={`h-5 w-5 text-gray-500 transform transition-transform ${
                      openItems.includes(faq.id) ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </div>
              </button>
              
              {openItems.includes(faq.id) && (
                <div className="px-6 pb-4">
                  <p className="text-gray-700 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No results */}
        {filteredFAQs.length === 0 && (
          <div className="text-center py-12">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No questions found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or browse different categories.
            </p>
          </div>
        )}

        {/* Contact Section */}
        <div className="mt-16 bg-primary rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Still have questions?
          </h2>
          <p className="text-green-100 mb-6">
            Can't find what you're looking for? Our support team is here to help.
          </p>
          <a
            href="/contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-primary bg-white hover:bg-gray-50"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;

