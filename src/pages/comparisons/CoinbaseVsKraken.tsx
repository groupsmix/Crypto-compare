import ComparisonTemplate from './ComparisonTemplate';

export default function CoinbaseVsKraken() {
  return (
    <ComparisonTemplate
      exchangeAId="coinbase"
      exchangeBId="kraken"
      verdict="Choose Coinbase for the simplest beginner experience and US regulation. Choose Kraken for better security, lower fees, and more trading features."
      chooseA={[
        'Are a complete beginner',
        'Want the most user-friendly interface',
        'Value FDIC insurance on USD deposits',
        'Want to earn free crypto through learning',
        'Prefer a publicly traded, fully transparent company',
      ]}
      chooseB={[
        'Want lower trading fees (0.16% vs 0.40%)',
        'Prioritize security (never been hacked)',
        'Want proof-of-reserves transparency',
        'Need futures and margin trading',
        'Value excellent customer support',
      ]}
      feesAnalysis="Kraken wins on fees with 0.16%/0.26% maker/taker vs Coinbase's 0.40%/0.60%. That's more than 2x cheaper. Kraken also offers futures trading at competitive rates. For regular traders, the fee savings on Kraken are substantial over time."
      securityAnalysis="Both are excellent on security, but Kraken edges ahead. Kraken has never been hacked in its 15+ year history and offers transparent proof-of-reserves audits. Coinbase is publicly traded (extra transparency) and offers FDIC insurance on USD deposits. Both offer 2FA, cold storage, and comprehensive security features."
      featuresAnalysis="Kraken offers more trading features: futures, margin trading, OTC desk, and staking. Coinbase focuses on simplicity: spot trading, staking, and the unique Coinbase Earn program where users learn about crypto and earn free tokens. Coinbase also has a broader ecosystem with Coinbase Wallet and Coinbase Commerce."
    />
  );
}
