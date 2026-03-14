import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What is the best cryptocurrency exchange for beginners?',
    answer: 'For beginners, we recommend Coinbase for its simple interface and strong regulatory compliance, or Bitget for its copy trading feature that lets you follow expert traders. Both offer mobile apps and educational resources to help new users get started safely.',
  },
  {
    question: 'Which crypto exchange has the lowest trading fees?',
    answer: 'OKX offers the lowest maker fees at 0.08%, followed by Binance, Bybit, KuCoin, and Bitget at 0.1%. However, fees can vary based on your trading volume and whether you hold the exchange\'s native token. Our Fee Calculator tool helps you compare exact costs.',
  },
  {
    question: 'How does CryptoRanked rank exchanges?',
    answer: 'We evaluate exchanges across 50+ metrics including trading fees, security measures, supported cryptocurrencies, user experience, customer support, and regulatory compliance. Our AI-powered system weighs these factors to produce an overall score out of 100.',
  },
  {
    question: 'Are the exchange reviews on CryptoRanked independent?',
    answer: 'Yes. While we may earn affiliate commissions when you sign up through our links, our reviews and rankings are completely independent. We use the same objective criteria for every exchange and update our data regularly to ensure accuracy.',
  },
  {
    question: 'What is a DCA (Dollar Cost Averaging) calculator?',
    answer: 'A DCA calculator helps you plan a strategy of investing a fixed amount at regular intervals (daily, weekly, or monthly). This approach reduces the impact of price volatility. Our DCA Calculator shows you how much you\'ll invest over time and helps you compare costs across exchanges.',
  },
  {
    question: 'Which exchange is best for futures trading?',
    answer: 'Binance leads with up to 125x leverage and the deepest liquidity. Bybit is excellent for derivatives with a clean interface, while OKX offers advanced perpetual swap features. All three have competitive futures fees starting at 0.02% maker.',
  },
];

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="text-center mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
          Everything you need to know about comparing and choosing a crypto exchange.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden bg-white dark:bg-gray-900 transition-all"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
            >
              <span className="font-semibold text-gray-900 dark:text-white pr-4">
                {faq.question}
              </span>
              <ChevronDown
                className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${
                  openIndex === index ? 'rotate-180' : ''
                }`}
              />
            </button>
            {openIndex === index && (
              <div className="px-6 pb-4">
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed text-sm">
                  {faq.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
