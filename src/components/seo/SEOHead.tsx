import { useEffect } from 'react';
import { SEOData } from '../../types';

interface SEOHeadProps {
  seo: SEOData;
}

export default function SEOHead({ seo }: SEOHeadProps) {
  useEffect(() => {
    document.title = seo.title;

    const setMeta = (name: string, content: string, property?: boolean) => {
      const attr = property ? 'property' : 'name';
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement;
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    setMeta('description', seo.description);
    setMeta('keywords', seo.keywords.join(', '));
    setMeta('og:title', seo.title, true);
    setMeta('og:description', seo.description, true);
    setMeta('og:type', 'website', true);
    if (seo.ogImage) setMeta('og:image', seo.ogImage, true);
    if (seo.canonicalUrl) setMeta('og:url', seo.canonicalUrl, true);
    setMeta('twitter:card', 'summary_large_image');
    setMeta('twitter:title', seo.title);
    setMeta('twitter:description', seo.description);

    if (seo.canonicalUrl) {
      let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'canonical';
        document.head.appendChild(link);
      }
      link.href = seo.canonicalUrl;
    }

    if (seo.structuredData) {
      let script = document.querySelector('#structured-data') as HTMLScriptElement;
      if (!script) {
        script = document.createElement('script');
        script.id = 'structured-data';
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(seo.structuredData);
    }
  }, [seo]);

  return null;
}
