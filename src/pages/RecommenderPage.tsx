import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Zap, ArrowLeft, RotateCcw, Star, ExternalLink, ChevronRight } from 'lucide-react';
import SEOHead from '../components/seo/SEOHead';
import { quizQuestions } from '../data/quizQuestions';
import { exchanges } from '../data/exchanges';
import { trackAffiliateClick } from '../hooks/useAffiliateTracker';

export default function RecommenderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: number, optionValue: string) => {
    setAnswers({ ...answers, [questionId]: optionValue });
    if (currentStep < quizQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResults(true);
    }
  };

  const results = useMemo(() => {
    if (!showResults) return [];
    const scores: Record<string, number> = {};
    exchanges.forEach((e) => {
      scores[e.id] = 0;
    });

    quizQuestions.forEach((q) => {
      const selectedValue = answers[q.id];
      if (selectedValue) {
        const option = q.options.find((o) => o.value === selectedValue);
        if (option) {
          Object.entries(option.scores).forEach(([exchangeId, score]) => {
            scores[exchangeId] = (scores[exchangeId] || 0) + score;
          });
        }
      }
    });

    return exchanges
      .map((e) => ({ exchange: e, score: scores[e.id] || 0 }))
      .sort((a, b) => b.score - a.score);
  }, [showResults, answers]);

  const maxScore = results.length > 0 ? results[0].score : 1;

  const reset = () => {
    setCurrentStep(0);
    setAnswers({});
    setShowResults(false);
  };

  const question = quizQuestions[currentStep];
  const progress = showResults ? 100 : ((currentStep) / quizQuestions.length) * 100;

  return (
    <>
      <SEOHead
        seo={{
          title: 'AI Exchange Recommender — Find Your Perfect Crypto Exchange | CryptoRank',
          description: 'Take our AI-powered quiz to find the best cryptocurrency exchange for your specific needs. Personalized recommendations based on your experience, location, and trading style.',
          keywords: ['crypto exchange quiz', 'best exchange for me', 'exchange recommender', 'AI crypto recommendation', 'which exchange should I use'],
        }}
      />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {!showResults ? (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-100 dark:bg-orange-950/50 text-orange-700 dark:text-orange-300 text-sm font-medium mb-4">
                <Zap className="w-3.5 h-3.5" />
                AI-Powered Recommendation
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Which Exchange Is Right for You?</h1>
              <p className="text-gray-600 dark:text-gray-400">Answer {quizQuestions.length} quick questions and we'll match you with the perfect exchange.</p>
            </div>

            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-500">Question {currentStep + 1} of {quizQuestions.length}</span>
                <span className="text-orange-500 font-medium">{Math.round(progress)}%</span>
              </div>
              <div className="h-2 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Question Card */}
            <div className="bg-white dark:bg-gray-900 rounded-2xl border border-gray-200 dark:border-gray-800 p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-6">{question.question}</h2>
              <div className="space-y-3">
                {question.options.map((option) => (
                  <button
                    key={option.value}
                    onClick={() => handleAnswer(question.id, option.value)}
                    className={`w-full text-left px-5 py-4 rounded-xl border transition-all hover:border-orange-300 dark:hover:border-orange-700 hover:bg-orange-50/50 dark:hover:bg-orange-950/20 ${
                      answers[question.id] === option.value
                        ? 'border-orange-400 bg-orange-50 dark:bg-orange-950/30 dark:border-orange-600'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <span className="font-medium">{option.label}</span>
                  </button>
                ))}
              </div>

              {currentStep > 0 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="mt-4 flex items-center gap-1.5 text-sm text-gray-500 hover:text-orange-500 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" /> Previous question
                </button>
              )}
            </div>
          </>
        ) : (
          <>
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 dark:bg-green-950/50 text-green-700 dark:text-green-300 text-sm font-medium mb-4">
                <Zap className="w-3.5 h-3.5" />
                Your Personalized Results
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold mb-2">Your Best Match</h1>
              <p className="text-gray-600 dark:text-gray-400">Based on your answers, here are our top recommendations for you.</p>
            </div>

            {/* Top Recommendation */}
            {results.length > 0 && (
              <div className="bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl p-1 mb-6">
                <div className="bg-white dark:bg-gray-900 rounded-xl p-6 sm:p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-16 h-16 rounded-2xl bg-orange-100 dark:bg-orange-950/50 flex items-center justify-center text-2xl font-bold text-orange-500">
                      {results[0].exchange.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-bold text-orange-500 bg-orange-100 dark:bg-orange-950/50 px-2 py-0.5 rounded-full">#1 BEST MATCH</span>
                      </div>
                      <h2 className="text-2xl font-bold">{results[0].exchange.name}</h2>
                      <div className="flex items-center gap-1 mt-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.round(results[0].exchange.rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300 dark:text-gray-600'
                            }`}
                          />
                        ))}
                        <span className="text-sm text-gray-500 ml-1">{results[0].exchange.rating}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-3xl font-bold text-orange-500">{Math.round((results[0].score / maxScore) * 100)}%</div>
                      <div className="text-xs text-gray-500">match</div>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4">{results[0].exchange.shortDescription}</p>

                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Fee</div>
                      <div className="font-bold">{results[0].exchange.makerFee}%</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Coins</div>
                      <div className="font-bold">{results[0].exchange.supportedCryptos}+</div>
                    </div>
                    <div className="bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3 text-center">
                      <div className="text-xs text-gray-500">Score</div>
                      <div className="font-bold text-orange-500">{results[0].exchange.overallScore}/100</div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={results[0].exchange.affiliateUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => trackAffiliateClick(results[0].exchange.id, 'recommender_top')}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                    >
                      Visit {results[0].exchange.name} <ExternalLink className="w-4 h-4" />
                    </a>
                    <Link
                      to={`/exchange/${results[0].exchange.id}`}
                      className="inline-flex items-center gap-1 px-5 py-3 bg-gray-100 dark:bg-gray-800 font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                    >
                      Review <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Other Results */}
            <div className="space-y-3">
              {results.slice(1).map((result, index) => (
                <div
                  key={result.exchange.id}
                  className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 p-4 flex items-center gap-4"
                >
                  <span className="text-lg font-bold text-gray-300 dark:text-gray-600 w-8">
                    #{index + 2}
                  </span>
                  <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-800 flex items-center justify-center font-bold text-orange-500">
                    {result.exchange.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold">{result.exchange.name}</h3>
                    <p className="text-xs text-gray-500">{result.exchange.shortDescription}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-orange-500">{Math.round((result.score / maxScore) * 100)}%</div>
                    <div className="text-xs text-gray-500">match</div>
                  </div>
                  <a
                    href={result.exchange.affiliateUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackAffiliateClick(result.exchange.id, 'recommender_list')}
                    className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-sm font-medium rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                  >
                    Visit
                  </a>
                </div>
              ))}
            </div>

            <div className="flex justify-center mt-8">
              <button
                onClick={reset}
                className="inline-flex items-center gap-2 px-6 py-3 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                <RotateCcw className="w-4 h-4" /> Retake Quiz
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
