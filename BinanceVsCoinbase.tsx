import { getExchangeById } from '../../data/exchanges';
import CountryGuideTemplate from './CountryGuideTemplate';

export default function BestExchangeIndia() {
  return (
    <CountryGuideTemplate
      country="India"
      countryCode="IN"
      slug="india"
      heroDescription="Find the best crypto exchanges for Indian traders. Navigate India's 30% crypto tax and TDS rules while finding the best INR deposit options."
      rankedExchanges={[
        { exchange: getExchangeById('binance')!, note: 'Most popular international exchange in India. P2P INR trading available. Lowest fees.', available: true },
        { exchange: getExchangeById('okx')!, note: 'Growing presence in India. P2P INR deposits and competitive fees.', available: true },
        { exchange: getExchangeById('bybit')!, note: 'Available in India with P2P INR trading. Good for derivatives.', available: true },
        { exchange: getExchangeById('kucoin')!, note: 'Wide altcoin selection popular with Indian altcoin traders. P2P available.', available: true },
        { exchange: getExchangeById('bitget')!, note: 'Copy trading popular among Indian beginners. INR P2P available.', available: true },
      ]}
      regulations="India has a complex and evolving crypto regulatory landscape. Key points:

- Crypto is legal to trade in India following the Supreme Court's 2020 ruling
- A 30% flat tax on crypto profits was introduced in 2022 (no deduction for losses)
- 1% TDS (Tax Deducted at Source) applies to crypto transactions above \u20b910,000
- Losses from one crypto cannot be offset against gains from another
- Indian crypto exchanges (WazirX, CoinDCX) are also available but international exchanges offer more features
- The government continues to develop a comprehensive crypto regulatory framework"
      paymentMethods={['P2P Trading (INR)', 'UPI', 'Bank Transfer (NEFT/IMPS)', 'Credit Card', 'Debit Card', 'Paytm']}
      taxInfo="India has a strict 30% flat tax on ALL crypto profits with no distinction between short-term and long-term gains. You cannot offset losses from one crypto asset against gains from another. Additionally, 1% TDS applies to transactions above \u20b910,000/year. This is one of the highest crypto tax rates globally. Many Indian traders use international exchanges where TDS is not automatically deducted, but they are still legally required to report and pay taxes."
      tips={[
        'Use P2P trading on international exchanges for the best INR-to-crypto rates.',
        'Keep meticulous records — India\'s 30% flat tax requires accurate profit calculation.',
        'UPI payments through P2P are the fastest way to buy crypto with INR.',
        'Consider the 1% TDS impact on your trading strategy — frequent trading gets expensive.',
        'International exchanges often have more coins and lower fees than Indian ones.',
        'Consult a CA (Chartered Accountant) familiar with crypto for tax filing.',
      ]}
    />
  );
}
