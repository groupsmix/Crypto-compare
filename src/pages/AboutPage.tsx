import { Shield, Target, Users, Brain, TrendingUp, Zap } from 'lucide-react';
import SEO from '@/components/SEO';

export default function AboutPage() {
  return (
    <div className="min-h-screen py-24 px-4">
      <SEO
        title="عن كريبتو قارن - مهمتنا ورؤيتنا"
        description="كريبتو قارن هو الدليل العربي الأول لمقارنة منصات تداول العملات الرقمية بمساعدة الذكاء الاصطناعي. مراجعات مستقلة وموضوعية."
        path="/about"
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">عن كريبتو قارن</h1>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            نسعى لتقديم أفضل دليل عربي لمقارنة منصات تداول العملات الرقمية بمساعدة الذكاء الاصطناعي
          </p>
        </div>

        {/* Mission */}
        <div className="glass-card p-8 mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Target className="w-8 h-8 text-primary" />
            <h2 className="text-2xl font-bold text-white">مهمتنا</h2>
          </div>
          <p className="text-text-secondary leading-relaxed text-lg">
            نهدف إلى تمكين المستخدم العربي من اتخاذ قرارات مستنيرة عند اختيار منصة تداول العملات الرقمية.
            نقدم مراجعات شاملة وموضوعية، أدوات مقارنة تفاعلية، ومستشار ذكي مدعوم بالذكاء الاصطناعي
            لمساعدتك في اختيار المنصة الأنسب لاحتياجاتك.
          </p>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {[
            {
              icon: Shield,
              title: 'مراجعات مستقلة',
              description: 'جميع مراجعاتنا مبنية على تجربة فعلية ومعايير موضوعية واضحة',
            },
            {
              icon: Brain,
              title: 'ذكاء اصطناعي',
              description: 'نستخدم خوارزميات ذكية لتحليل بياناتك وترشيح أفضل منصة لك',
            },
            {
              icon: TrendingUp,
              title: 'أسعار حية',
              description: 'أسعار العملات الرقمية محدثة كل دقيقة مع مؤشر الخوف والطمع',
            },
            {
              icon: Zap,
              title: 'أدوات تفاعلية',
              description: 'حاسبة رسوم، جداول مقارنة، ومعالج توصيات تفاعلي',
            },
            {
              icon: Users,
              title: 'محتوى عربي',
              description: 'كل المحتوى مكتوب بالعربية خصيصاً للمستخدم العربي',
            },
            {
              icon: Shield,
              title: 'تحديث مستمر',
              description: 'نحدث بياناتنا باستمرار لضمان دقة المعلومات المقدمة',
            },
          ].map((feature) => (
            <div key={feature.title} className="glass-card p-6">
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-text-secondary text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="glass-card p-6 border-warning/20 bg-warning/5">
          <h3 className="text-lg font-bold text-warning mb-3">تحذير مهم</h3>
          <p className="text-text-secondary text-sm leading-relaxed">
            تداول العملات الرقمية ينطوي على مخاطر عالية وقد لا يكون مناسباً لجميع المستثمرين.
            المحتوى المقدم في هذا الموقع هو للأغراض التعليمية فقط ولا يُعد نصيحة مالية أو استثمارية.
            نحن لسنا مسؤولين عن أي خسائر ناتجة عن قراراتك الاستثمارية.
            تأكد من إجراء بحثك الخاص واستشارة مستشار مالي قبل اتخاذ أي قرارات استثمارية.
          </p>
        </div>
      </div>
    </div>
  );
}
