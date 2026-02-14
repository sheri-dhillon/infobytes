import React from 'react';
import { Seo } from '../components/Seo';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Momentum } from '../components/Momentum';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ, buildFaqPageJsonLd } from '../components/FAQ';
import { TrustedBy } from '../components/TrustedBy';

export const HomePage: React.FC = () => {
  return (
    <>
      <Seo
        jsonLdId="infobytes-home-review-schema"
        jsonLd={{
          '@context': 'https://schema.org/',
          '@type': 'Service',
          name: 'E-commerce Retention Marketing',
          provider: {
            '@type': 'LocalBusiness',
            name: 'INFOBYTES'
          },
          aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: '4.9',
            reviewCount: '214'
          },
          review: [
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Jonas Wadel' },
              reviewBody:
                "Working with this team changed our entire retention strategy. As true Klaviyo experts, they didn’t just set up basic email flows — they built an automation engine that keeps revenue compounding week after week.",
              reviewRating: { '@type': 'Rating', ratingValue: '5' }
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Thomas Poppa' },
              reviewBody:
                'The communication was exceptional. They cleaned up our segmentation and turned email + SMS into a structured automation system that actually drives repeat purchases.',
              reviewRating: { '@type': 'Rating', ratingValue: '5' }
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Muhammad Afzaal' },
              reviewBody:
                'They were extremely detail-oriented with our retention setup — from behavioral triggers to flow logic. The end result was a cleaner lifecycle system that performs consistently.',
              reviewRating: { '@type': 'Rating', ratingValue: '5' }
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Marcus Sterling' },
              reviewBody:
                "Their lifecycle strategy work was transformative. They mapped the journey, found drop-offs we didn’t see, and helped us tighten the funnel with practical CRO improvements.",
              reviewRating: { '@type': 'Rating', ratingValue: '5' }
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Michael Park' },
              reviewBody:
                'Clean process, strong technical execution, and great communication. The migration/audit work gave us a solid foundation and improved confidence in deliverability and data integrity.',
              reviewRating: { '@type': 'Rating', ratingValue: '5' }
            }
          ]
        }}
      />
      <Seo
        jsonLdId="infobytes-home-pricing-schema"
        jsonLd={{
          '@context': 'https://schema.org/',
          '@type': 'Product',
          name: 'Retention Marketing Monthly Retainer',
          offers: {
            '@type': 'AggregateOffer',
            lowPrice: '349',
            highPrice: '699',
            priceCurrency: 'USD'
          }
        }}
      />
      <Seo
        jsonLdId="infobytes-home-faq-schema"
        jsonLd={buildFaqPageJsonLd()}
      />
      <Hero />
      <About />
      <Services />
      <Momentum />
      <TrustedBy />
      <Testimonials />
      <Pricing />
      <FAQ />
    </>
  );
};