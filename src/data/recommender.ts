import type { RecommenderAnswer } from '@/types';

export const recommenderQuestions: RecommenderAnswer[] = [
  {
    question: "ما هو مستوى خبرتك في تداول العملات الرقمية؟",
    options: [
      { label: "مبتدئ تماماً", value: "beginner", icon: "🌱" },
      { label: "لدي بعض الخبرة", value: "intermediate", icon: "📊" },
      { label: "محترف / متداول نشط", value: "advanced", icon: "🚀" }
    ]
  },
  {
    question: "ما هو هدفك الرئيسي؟",
    options: [
      { label: "شراء وحفظ (HODL)", value: "hodl", icon: "💎" },
      { label: "تداول يومي نشط", value: "trading", icon: "📈" },
      { label: "دخل سلبي (Staking)", value: "staking", icon: "💰" },
      { label: "تداول بالنسخ", value: "copy", icon: "🔄" }
    ]
  },
  {
    question: "ما الأهم بالنسبة لك؟",
    options: [
      { label: "أقل رسوم ممكنة", value: "low_fees", icon: "💸" },
      { label: "أمان عالي", value: "security", icon: "🔒" },
      { label: "سهولة الاستخدام", value: "ease", icon: "✨" },
      { label: "أكبر عدد عملات", value: "variety", icon: "🪙" }
    ]
  },
  {
    question: "في أي منطقة تتواجد؟",
    options: [
      { label: "الشرق الأوسط / الخليج", value: "middle_east", icon: "🏜️" },
      { label: "شمال أفريقيا", value: "north_africa", icon: "🌍" },
      { label: "أوروبا", value: "europe", icon: "🇪🇺" },
      { label: "أخرى", value: "other", icon: "🌐" }
    ]
  }
];

export function getRecommendation(answers: string[]): { primary: string; secondary: string; reason: string } {
  const [experience, goal, priority, region] = answers;

  if (goal === "copy") {
    return {
      primary: "bitget",
      secondary: "bybit",
      reason: "بيتغيت هي الأفضل في التداول بالنسخ مع أكبر عدد من المتداولين المحترفين. باي بيت خيار ممتاز أيضاً."
    };
  }

  if (priority === "low_fees") {
    return {
      primary: "mexc",
      secondary: "okx",
      reason: "MEXC تقدم صفر رسوم على التداول الفوري! OKX تقدم رسوماً من الأقل في السوق (0.08%)."
    };
  }

  if (priority === "variety") {
    return {
      primary: "mexc",
      secondary: "kucoin",
      reason: "MEXC تدعم أكثر من 1800 عملة و KuCoin تدعم 700+ عملة مع إدراج سريع للعملات الجديدة."
    };
  }

  if (priority === "security") {
    return {
      primary: "binance",
      secondary: "okx",
      reason: "بينانس تتصدر في الأمان بتقييم 95/100 مع صندوق SAFU لحماية المستخدمين. OKX تأتي بتقييم أمان 92/100."
    };
  }

  if (experience === "beginner") {
    if (region === "middle_east") {
      return {
        primary: "bybit",
        secondary: "binance",
        reason: "باي بيت مقرها في دبي مع واجهة سهلة جداً للمبتدئين ودعم عربي ممتاز. بينانس خيار ممتاز أيضاً."
      };
    }
    return {
      primary: "binance",
      secondary: "bybit",
      reason: "بينانس هي الأكبر والأكثر أماناً مع واجهة Lite للمبتدئين. باي بيت بديل ممتاز بواجهة أبسط."
    };
  }

  if (goal === "staking") {
    return {
      primary: "binance",
      secondary: "kucoin",
      reason: "بينانس تقدم أكبر تشكيلة من خيارات الستيكنج مع عوائد تنافسية. كوكوين تقدم خيارات مرنة ممتازة."
    };
  }

  if (goal === "trading" && experience === "advanced") {
    return {
      primary: "okx",
      secondary: "binance",
      reason: "OKX تقدم أدوات تداول احترافية متقدمة مع رسوم منخفضة. بينانس تقدم أعلى سيولة في السوق."
    };
  }

  return {
    primary: "binance",
    secondary: "bybit",
    reason: "بينانس هي الخيار الأشمل مع أكبر سيولة وأكثر الخدمات. باي بيت بديل ممتاز خاصة للمنطقة العربية."
  };
}
