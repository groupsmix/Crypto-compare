import CountryGuideTemplate from './CountryGuideTemplate';

export default function BestExchangeIndia() {
  return (
    <CountryGuideTemplate
      country="India"
      countryCode="india"
      intro="India has one of the world's largest crypto communities. Despite a 30% flat tax on crypto gains and 1% TDS, millions of Indians actively trade crypto. Here are the best exchanges for Indian traders in 2026."
      regulations="Cryptocurrency is legal in India following the Supreme Court's 2020 ruling that lifted the RBI banking ban. However, India imposed a 30% flat tax on crypto gains (no deductions for losses) and 1% TDS (Tax Deducted at Source) on transactions above INR 10,000/year. The tax regime is harsh but trading is fully legal."
      paymentMethods={['UPI', 'Bank Transfer (INR)', 'IMPS/NEFT/RTGS', 'P2P Trading', 'Net Banking', 'Debit Card']}
      taxInfo="India has a 30% flat tax on ALL crypto gains — no distinction between short-term and long-term, and losses from one crypto cannot offset gains from another. Additionally, 1% TDS is deducted on transactions above INR 10,000/year. No deductions or exemptions are available. This is one of the harshest crypto tax regimes globally."
      recommendations={[
        { id: 'binance', reason: 'Supports INR deposits via P2P and bank transfer. Lowest trading fees globally. Most popular international exchange in India.', bestFor: 'Active traders wanting lowest fees' },
        { id: 'okx', reason: 'Good INR P2P support, competitive fees, and Web3 wallet for DeFi exploration.', bestFor: 'DeFi-interested Indian traders' },
        { id: 'kucoin', reason: 'Huge altcoin selection (700+), P2P for INR, no KYC for basic trading.', bestFor: 'Altcoin traders' },
      ]}
      tips={[
        'Be aware of the 30% flat tax — plan your trades accordingly',
        'UPI is the fastest way to deposit INR via P2P trading',
        'Indian exchanges (WazirX, CoinDCX) exist but have higher fees than international options',
        'Keep detailed records for ITR filing — you must report all crypto transactions',
        'Consider DCA (Dollar Cost Averaging) to manage volatility',
        'Never invest money you cannot afford to lose — the 30% tax means you keep less profit',
      ]}
    />
  );
}
