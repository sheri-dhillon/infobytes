import React from 'react';
import { Seo } from '../components/Seo';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { Services } from '../components/Services';
import { Momentum } from '../components/Momentum';
import { Testimonials } from '../components/Testimonials';
import { Pricing } from '../components/Pricing';
import { FAQ } from '../components/FAQ';
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
        jsonLd={{
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: [
            {
              '@type': 'Question',
              name: 'What is the role of a retention marketing agency compared to a growth agency?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'While growth agencies focus on top-of-funnel acquisition (Ads/SEO), a retention marketing agency like INFOBYTES focuses on maximizing the value of the customers you already have. We specialize in email marketing automation and SMS strategies that increase Customer Lifetime Value (CLV) and reduce your dependency on expensive ad spend.'
              }
            },
            {
              '@type': 'Question',
              name: 'Why do you specialize specifically in Klaviyo and Omnisend?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  "We believe in mastery over mediocrity. As a certified Klaviyo expert and Omnisend partner team, we have deep technical knowledge of these platforms' unique data science capabilities. This allows us to build more complex segments and higher-converting flows than generalist agencies that try to support every platform."
              }
            },
            {
              '@type': 'Question',
              name: 'How much revenue should my eCommerce store generate from email and SMS?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'For a healthy, scaling brand, email and SMS marketing should account for 30% to 45% of total store revenue. If your current retention channels are contributing less than 20%, you are likely leaving significant revenue on the table due to unoptimized flows or poor list hygiene.'
              }
            },
            {
              '@type': 'Question',
              name: 'Does INFOBYTES handle both strategy and implementation?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'Yes. We are a full-service partner. Our team handles everything from high-level lifecycle strategy and journey mapping to the technical build-out of flows, custom template design, and ongoing A/B testing. We provide the expertise so your team can focus on product and operations.'
              }
            },
            {
              '@type': 'Question',
              name: 'How long does it take to see a measurable ROI from your services?',
              acceptedAnswer: {
                '@type': 'Answer',
                text:
                  'Most clients see an immediate lift in engagement within the first 30 days. However, a full retention engine—including advanced behavioral triggers and fully optimized SMS synchronization—typically reaches peak performance within 60 to 90 days as we gather enough data to refine our A/B tests.'
              }
            }
          ]
        }}
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