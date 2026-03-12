import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Brain, ArrowLeft, ArrowRight, Star, ExternalLink, RotateCcw } from 'lucide-react';
import { recommenderQuestions, getRecommendation } from '@/data/recommender';
import { exchanges } from '@/data/exchanges';

export default function RecommenderPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (value: string) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    if (currentStep < recommenderQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const recommendation = showResult ? getRecommendation(answers) : null;
  const primaryExchange = recommendation ? exchanges.find((e) => e.id === recommendation.primary) : null;
  const secondaryExchange = recommendation ? exchanges.find((e) => e.id === recommendation.secondary) : null;

  return (
    <div className="min-h-screen py-24 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent mb-6">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">المستشار الذكي</h1>
          <p className="text-text-secondary text-lg">
            أجب على بعض الأسئلة البسيطة وسنرشح لك أفضل منصة تناسب احتياجاتك
          </p>
        </div>

        {!showResult ? (
          <div className="glass-card p-8">
            {/* Progress */}
            <div className="flex items-center gap-2 mb-8">
              {recommenderQuestions.map((_, i) => (
                <div
                  key={i}
                  className={`flex-1 h-2 rounded-full transition-all duration-500 ${
                    i < currentStep ? 'bg-primary' : i === currentStep ? 'bg-primary/50' : 'bg-white/10'
                  }`}
                />
              ))}
            </div>

            <div className="mb-2 text-text-secondary text-sm">
              سؤال {currentStep + 1} من {recommenderQuestions.length}
            </div>

            <h2 className="text-2xl font-bold text-white mb-8">
              {recommenderQuestions[currentStep].question}
            </h2>

            <div className="space-y-3">
              {recommenderQuestions[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(option.value)}
                  className="w-full flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all text-right group"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="text-white font-medium group-hover:text-primary transition-colors">
                    {option.label}
                  </span>
                  <ArrowLeft className="w-5 h-5 text-text-secondary group-hover:text-primary mr-auto opacity-0 group-hover:opacity-100 transition-all" />
                </button>
              ))}
            </div>

            {currentStep > 0 && (
              <button
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setAnswers(answers.slice(0, -1));
                }}
                className="mt-6 flex items-center gap-2 text-text-secondary hover:text-white transition-colors text-sm"
              >
                <ArrowRight className="w-4 h-4" />
                السؤال السابق
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-6 animate-slide-up">
            <div className="glass-card p-8 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-success/20 mb-4">
                <Star className="w-8 h-8 text-success" />
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">نتيجة التحليل الذكي</h2>
              <p className="text-text-secondary">{recommendation?.reason}</p>
            </div>

            {primaryExchange && (
              <div className="glass-card p-6 border-2 border-primary/30">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold">الخيار الأول</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={primaryExchange.logo} alt={primaryExchange.name} className="w-16 h-16 rounded-xl p-1 bg-white/10" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/64x64/1a1a2e/f7931a?text=${primaryExchange.name[0]}`; }} />
                  <div>
                    <h3 className="text-2xl font-bold text-white">{primaryExchange.nameAr}</h3>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-primary fill-primary" />
                      <span className="text-primary font-bold">{primaryExchange.rating}/5</span>
                      <span className="text-text-secondary text-sm">- {primaryExchange.users} مستخدم</span>
                    </div>
                  </div>
                </div>
                <p className="text-text-secondary text-sm mb-4">{primaryExchange.description}</p>
                {primaryExchange.referralBonus && (
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 mb-4">
                    <span className="text-primary text-sm font-medium">{primaryExchange.referralBonus}</span>
                  </div>
                )}
                <div className="flex gap-3">
                  <Link to={`/exchange/${primaryExchange.id}`} className="flex-1 text-center py-3 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all font-medium">
                    تفاصيل كاملة
                  </Link>
                  <a href={primaryExchange.referralLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-primary to-primary-dark text-white hover:opacity-90 transition-all font-medium">
                    <ExternalLink className="w-4 h-4" />
                    سجل الآن
                  </a>
                </div>
              </div>
            )}

            {secondaryExchange && (
              <div className="glass-card p-6">
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-bold">البديل الممتاز</span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <img src={secondaryExchange.logo} alt={secondaryExchange.name} className="w-12 h-12 rounded-xl p-1 bg-white/10" onError={(e) => { (e.target as HTMLImageElement).src = `https://placehold.co/48x48/1a1a2e/00d4ff?text=${secondaryExchange.name[0]}`; }} />
                  <div>
                    <h3 className="text-xl font-bold text-white">{secondaryExchange.nameAr}</h3>
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-primary fill-primary" />
                      <span className="text-primary font-bold text-sm">{secondaryExchange.rating}/5</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Link to={`/exchange/${secondaryExchange.id}`} className="flex-1 text-center py-2.5 rounded-xl bg-white/5 text-white hover:bg-white/10 transition-all text-sm font-medium">
                    تفاصيل كاملة
                  </Link>
                  <a href={secondaryExchange.referralLink} target="_blank" rel="noopener noreferrer" className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-accent/10 text-accent hover:bg-accent/20 transition-all text-sm font-medium">
                    <ExternalLink className="w-4 h-4" />
                    زيارة المنصة
                  </a>
                </div>
              </div>
            )}

            <button
              onClick={reset}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white/5 border border-white/10 text-text-secondary hover:text-white hover:bg-white/10 transition-all"
            >
              <RotateCcw className="w-4 h-4" />
              أعد الاختبار
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
