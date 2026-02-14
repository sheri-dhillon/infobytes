import React, { useEffect } from 'react';

type JsonLd = Record<string, any>;

interface SeoProps {
  title?: string;
  description?: string;
  jsonLd?: JsonLd;
  jsonLdId?: string;
}

function upsertMetaDescription(content: string) {
  const head = document.head;
  let meta = head.querySelector('meta[name="description"]') as HTMLMetaElement | null;
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('name', 'description');
    head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}

function upsertJsonLd(id: string, jsonLd: JsonLd) {
  const head = document.head;
  const existing = head.querySelector(`#${CSS.escape(id)}`);
  if (existing) existing.remove();

  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.id = id;
  script.text = JSON.stringify(jsonLd);
  head.appendChild(script);

  return () => {
    script.remove();
  };
}

export const Seo: React.FC<SeoProps> = ({ title, description, jsonLd, jsonLdId }) => {
  useEffect(() => {
    if (title) document.title = title;
    if (description) upsertMetaDescription(description);

    if (jsonLd && jsonLdId) {
      return upsertJsonLd(jsonLdId, jsonLd);
    }

    return;
  }, [title, description, jsonLd, jsonLdId]);

  return null;
};
