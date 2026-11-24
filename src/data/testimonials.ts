export interface TestimonialEntry {
  id: string;
  clientName: string;
  country: string;
  serviceCategory: string;
  duration: string;
  priceRange: string;
  timeframe: string;
  collaborationStatus: string;
  rating: number;
  quote: string;
  screenshotSrc: string;
  screenshotAlt: string;
  tabLabel: string;
}

export const FIVERR_SUMMARY = {
  overallRating: '5.0',
  totalReviews: 5,
  responseTime: '1 hour',
  repeatClientsLabel: '100% Repeat Collaborations',
};

export const VERIFIED_FIVERR_REVIEWS: TestimonialEntry[] = [
  {
    id: 'fiverr-elvisrosie63-3',
    clientName: 'elvisrosie63',
    country: 'Australia',
    serviceCategory: 'Email Automations',
    duration: '6 weeks',
    priceRange: '$100–$200',
    timeframe: '2 months ago',
    collaborationStatus: 'Ongoing collaboration',
    rating: 5,
    quote:
      'My project is quite involved and is evolving as it builds, Moses has been amazing with adapting and working around the scope of work. He has went above and beyond to ensure the successful outcome. I will definitely be doing further work with him.',
    screenshotSrc: '/assets/aistudio/image_a994dea8.png',
    screenshotAlt:
      'Verified 5-star Fiverr review from elvisrosie63 in Australia for Email Automations over a 6-week ongoing collaboration.',
    tabLabel: 'elvisrosie63 · Email Automations',
  },
  {
    id: 'fiverr-elvisrosie63-2',
    clientName: 'elvisrosie63',
    country: 'Australia',
    serviceCategory: 'Planning, Strategy & Setup',
    duration: '4 weeks',
    priceRange: '$200–$400',
    timeframe: '4 months ago',
    collaborationStatus: 'Ongoing collaboration',
    rating: 5,
    quote:
      'Very Happy with the work - this is my second order and I will be a repeat user due to the quality of the work.',
    screenshotSrc: '/assets/aistudio/image_66046d30.png',
    screenshotAlt:
      'Verified 5-star Fiverr review from repeat client elvisrosie63 in Australia for Planning, Strategy and Setup over 4 weeks.',
    tabLabel: 'elvisrosie63 · Second Order',
  },
  {
    id: 'fiverr-elvisrosie63-1',
    clientName: 'elvisrosie63',
    country: 'Australia',
    serviceCategory: 'Planning, Strategy & Setup',
    duration: '3 weeks',
    priceRange: '$200–$400',
    timeframe: '5 months ago',
    collaborationStatus: 'Ongoing collaboration',
    rating: 5,
    quote: 'Very Happy with the final product and would work with again.',
    screenshotSrc: '/assets/aistudio/image_b20f8c31.png',
    screenshotAlt:
      'Verified 5-star Fiverr review from elvisrosie63 in Australia for Planning, Strategy and Setup over 3 weeks.',
    tabLabel: 'elvisrosie63 · Strategy & Setup',
  },
  {
    id: 'fiverr-george9107-2',
    clientName: 'george9107',
    country: 'United States',
    serviceCategory: 'Planning, Strategy & Setup',
    duration: '11 days',
    priceRange: '$100–$200',
    timeframe: '6 months ago',
    collaborationStatus: 'Ongoing collaboration',
    rating: 5,
    quote: 'Great value I will definitely hire him again',
    screenshotSrc: '/assets/aistudio/image_7338071c.png',
    screenshotAlt:
      'Verified 5-star Fiverr review from george9107 in the United States for Planning, Strategy and Setup delivered in 11 days.',
    tabLabel: 'george9107 · 11-Day Build',
  },
  {
    id: 'fiverr-george9107-1',
    clientName: 'george9107',
    country: 'United States',
    serviceCategory: 'Planning, Strategy & Setup',
    duration: '7 days',
    priceRange: '$100–$200',
    timeframe: '6 months ago',
    collaborationStatus: 'Ongoing collaboration',
    rating: 5,
    quote: 'Amazing work I will definitely order again',
    screenshotSrc: '/assets/aistudio/image_0012c776.png',
    screenshotAlt:
      'Verified 5-star Fiverr review from george9107 in the United States for Planning, Strategy and Setup delivered in 7 days.',
    tabLabel: 'george9107 · 7-Day Build',
  },
];
