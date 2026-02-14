import React from 'react';
import { Seo } from '../components/Seo';
import { ServicesHero } from '../components/ServicesHero';
import { ServicesList } from '../components/ServicesList';
import { Industries } from '../components/Industries';
import { CaseStudies } from '../components/CaseStudies';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { TestimonialsMarquee } from '../components/TestimonialsMarquee';
import { Pricing } from '../components/Pricing';
import { EmailShowcase } from '../components/EmailShowcase';

export const ServicesPage: React.FC = () => {
  const retentionMethodologyJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'INFOBYTES Retention Methodology',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Discovery & Audit',
        description: 'Technical analysis of email health and list deliverability.',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Retention Blueprinting',
        description: 'Strategic mapping of the customer lifecycle and segmentation.',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'High-Conversion Build',
        description: 'Deployment of advanced automated flows and SMS engines.',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Scale & A/B Testing',
        description: 'Data-driven optimization to maximize customer lifetime value.',
      },
    ],
  };

  const servicesCatalogJsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'Service',
    serviceType: 'E-commerce Retention Marketing',
    provider: {
      '@type': 'Organization',
      name: 'INFOBYTES',
      url: 'https://infobytes.io',
      logo: 'https://infobytes.io/logo.png',
    },
    description:
      'Retention marketing services across email automation, SMS messaging, platform migrations, and lifecycle strategy — built to increase customer LTV.',
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Retention Marketing Services',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Email Automation Engines',
            url: 'https://infobytes.io/services/email-automation-engines',
            description:
              'Custom lifecycle automation and flow architecture built on Klaviyo/Omnisend to grow retention revenue.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'SMS & Mobile Messaging',
            url: 'https://infobytes.io/services/sms-mobile-messaging',
            description:
              'Compliance-first SMS strategy and automation to drive immediate action and repeat purchases.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Platform Migration & Audit',
            url: 'https://infobytes.io/services/platform-migration-audit',
            description:
              'Seamless Klaviyo/Omnisend migrations with deliverability analysis and data integrity validation.',
          },
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: 'Lifecycle Strategy & CRO',
            url: 'https://infobytes.io/services/lifecycle-strategy-cro',
            description:
              'Lifecycle mapping and testing-driven CRO to improve conversion moments and increase customer LTV.',
          },
        },
      ],
    },
  };

  return (
    <>
      <Seo
        title="eCommerce Retention Strategy & Lifecycle Marketing | INFOBYTES"
        description="Revenue-first lifecycle marketing: Email Marketing Audit, Klaviyo Flow Optimization, and SMS Revenue Growth systems built to increase retention."
        jsonLdId="infobytes-services-retention-methodology"
        jsonLd={retentionMethodologyJsonLd}
      />
      <Seo jsonLdId="infobytes-services-offer-catalog" jsonLd={servicesCatalogJsonLd} />
      <ServicesHero />
      <ServicesList />
      <EmailShowcase />
      <Industries />
      <CaseStudies />
      <WhyChooseUs />
      <TestimonialsMarquee />
      <Pricing />
    </>
  );
};
