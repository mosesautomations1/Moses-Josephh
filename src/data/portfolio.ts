export type PortfolioCategory =
  | 'All'
  | 'Skool Communities'
  | 'Web & Landing Pages'
  | 'Automation & CRM'
  | 'Course Platforms';

export interface PortfolioScreenshot {
  src: string;
  caption: string;
}

export interface PortfolioProject {
  id: string;
  index: string;
  title: string;
  client: string;
  category: string;
  filterGroup: Exclude<PortfolioCategory, 'All'>;
  featured?: boolean;
  isEditableSlot?: boolean;
  shortDescription: string;
  objective: string;
  servicesDelivered: string[];
  toolsUsed: string[];
  highlights: string[];
  primaryImage: string | null;
  gallery: PortfolioScreenshot[];
  relatedService: string;
}

export const PORTFOLIO_FILTERS: PortfolioCategory[] = [
  'All',
  'Skool Communities',
  'Web & Landing Pages',
  'Automation & CRM',
  'Course Platforms',
];

export const FEATURED_AND_VERIFIED_PROJECTS: PortfolioProject[] = [
  {
    id: 'wealth-rebuild-network',
    index: '01',
    title: 'Wealth Rebuild Network',
    client: 'Visionframe Consulting',
    category: 'Skool Community Setup & Branding',
    filterGroup: 'Skool Communities',
    featured: true,
    shortDescription:
      'A professionally structured Skool community designed to support credit education, funding guidance, and financial growth.',
    objective:
      'Establish a credible, easy-to-navigate Skool destination where members can access step-by-step credit repair resources, business funding guidance, and structured community discussions.',
    servicesDelivered: [
      'Complete Skool community setup & space organization',
      'Custom branded cover banner ("Learn. Apply. Transform") & icon styling',
      'About page positioning & conversion-oriented community description',
      'Streamlined Classroom, Calendar, Members & Leaderboards navigation',
      'Mobile-ready presentation & scalable growth structure',
    ],
    toolsUsed: ['Skool', 'Canva', 'ChatGPT', 'Google Drive'],
    highlights: [
      'Community setup',
      'Visual branding',
      'Community customization',
      'Member experience',
      'Organized presentation',
    ],
    primaryImage: '/assets/aistudio/Wealth_Rebuild_Network_Skool_Portfolio_Image_3ccbbc61.png',
    gallery: [
      {
        src: '/assets/aistudio/Wealth_Rebuild_Network_Skool_Portfolio_Image_3ccbbc61.png',
        caption: 'Wealth Rebuild Network — Skool desktop & mobile community showcase',
      },
    ],
    relatedService: 'Skool Community Setup & Customization',
  },
  {
    id: 'travelwiseher-community',
    index: '02',
    title: 'TravelWiseHer Community',
    client: 'TravelWiseHer by Catherine Pound',
    category: 'Community Landing Page Design',
    filterGroup: 'Web & Landing Pages',
    featured: true,
    shortDescription:
      'A modern, conversion-focused landing page and resource visual system designed for a women’s solo travel community.',
    objective:
      'Craft an inviting, trustworthy digital front door for women travelers 50+ that communicates safety, sisterhood, and clear membership value while driving community sign-ups.',
    servicesDelivered: [
      'Conversion-focused landing page design & section architecture',
      'Systeme.io full-page build with responsive mobile adaptation',
      'Course track previews ("Confidence & Mindset" and "Adventure & Culture")',
      'Custom Resource Library banner & brand-aligned graphic assets',
      'FAQ accordion & clear calls to action',
    ],
    toolsUsed: ['Systeme.io', 'WordPress', 'Elementor', 'Figma', 'Canva'],
    highlights: [
      'Landing page design',
      'Brand presentation',
      'Responsive layouts',
      'Clear messaging',
      'Conversion-focused CTAs',
    ],
    primaryImage: '/assets/aistudio/TravelWiseHer_Skool_Community_Portfolio_c1982ebd.png',
    gallery: [
      {
        src: '/assets/aistudio/TravelWiseHer_Skool_Community_Portfolio_c1982ebd.png',
        caption: 'TravelWiseHer — Multi-device landing page showcase',
      },
      {
        src: '/assets/aistudio/screencapture-cathypound63-systeme-io-travelwisehercommunity-2026-08-08-03_21_11_28d7c5b8.png',
        caption: 'Full Systeme.io live landing page build & course previews',
      },
      {
        src: '/assets/aistudio/ChatGPT_Image_Aug_14__2026__01_18_30_AM_76dd829b.png',
        caption: 'TravelWiseHer Resource Library custom banner design',
      },
    ],
    relatedService: 'Systeme.io Website & Sales Funnel Development',
  },
  {
    id: 'truee-automation',
    index: '03',
    title: 'Truee Automation',
    client: 'Truee / Next Form Community',
    category: 'Skool + Zapier + GoHighLevel Integration',
    filterGroup: 'Automation & CRM',
    featured: true,
    shortDescription:
      'An automated membership workflow connecting Skool with GoHighLevel through Zapier to streamline member onboarding and email delivery.',
    objective:
      'Eliminate manual copy-pasting of new Skool member sign-ups by automatically capturing membership question responses and enrolling leads directly into GoHighLevel onboarding workflows.',
    servicesDelivered: [
      'Skool "Answered Membership" trigger configuration via Zapier',
      'Dynamic field mapping for First Name, Last Name & Email',
      'LeadConnector / GoHighLevel "Add Lead to Workflow" integration',
      'Instant automated onboarding & welcome email sequence trigger',
      'Live workflow testing & verification',
    ],
    toolsUsed: ['Skool', 'Zapier', 'GoHighLevel', 'LeadConnector'],
    highlights: [
      'Membership response triggers',
      'Automated member onboarding',
      'Accurate data mapping',
      'Email workflow integration',
      'Reduced manual admin work',
    ],
    primaryImage: '/assets/aistudio/Truee_Zapier_SKool_Ghl_AUtomation_3a2aab07.png',
    gallery: [
      {
        src: '/assets/aistudio/Truee_Zapier_SKool_Ghl_AUtomation_3a2aab07.png',
        caption: 'Skool to GoHighLevel automation workflow overview',
      },
      {
        src: '/assets/aistudio/screencapture-zapier-editor-353293725-published-353293726-sample-2026-03-13-09_17_07_8c3ef5f3.png',
        caption: 'Published Zapier workflow editor mapping Skool answers to LeadConnector',
      },
    ],
    relatedService: 'Zapier Integration & Email Automation',
  },
  {
    id: 'unfair-advantage-circle',
    index: '04',
    title: 'Unfair Advantage — Bulletproof Academy',
    client: 'Unfair Advantage',
    category: 'Circle.so Community & Event Architecture',
    filterGroup: 'Course Platforms',
    shortDescription:
      'Structured Circle.so community spaces, tiered Inner Circle access, live training session scheduling, and custom event banner visuals.',
    objective:
      'Organize a multi-tier coaching community in Circle.so with intuitive navigation across CompetitorOS, The Bulletproof Academy, Inner Circle, and live Sunday training sessions.',
    servicesDelivered: [
      'Circle.so space group & tier navigation setup',
      'Upcoming Training Sessions & live event calendar configuration',
      'Custom branded banners ("Bulletproof Academy Sessions" & "Session 43")',
      'Event post details, reminders & attendee workflow organization',
    ],
    toolsUsed: ['Circle.so', 'Canva'],
    highlights: [
      'Multi-tier space organization',
      'Event calendar workflows',
      'Custom session cover graphics',
      'Clean member navigation',
    ],
    primaryImage:
      '/assets/aistudio/screencapture-unfairadvantage-circle-so-c-sunday-sessions-2026-03-17-14_52_15_f4ffcb65.png',
    gallery: [
      {
        src: '/assets/aistudio/screencapture-unfairadvantage-circle-so-c-sunday-sessions-2026-03-17-14_52_15_f4ffcb65.png',
        caption: 'Circle.so Bulletproof Academy upcoming training sessions hub',
      },
      {
        src: '/assets/aistudio/screencapture-unfairadvantage-circle-so-c-sunday-sessions-2026-04-06-10_58_09_99e33cb7.png',
        caption: 'Session 43 event configuration & custom cover banner',
      },
    ],
    relatedService: 'Circle.so, Mighty Networks & Kajabi Setup',
  },
  {
    id: 'staying-aligned-mighty',
    index: '05',
    title: 'Staying Aligned Community',
    client: 'Kristin Kymani',
    category: 'Mighty Networks Setup & Onboarding',
    filterGroup: 'Course Platforms',
    shortDescription:
      'Custom Mighty Networks space organization featuring a Start Here onboarding feed, Daily Alignment hub, episode discussions, and live events.',
    objective:
      'Build a welcoming, structured Mighty Networks community space that guides new members immediately from onboarding into daily reflection and episode conversations.',
    servicesDelivered: [
      'Mighty Networks space architecture & sidebar hierarchy',
      'Start Here onboarding post & welcome visual asset',
      'Dedicated spaces for Daily Alignment, Episode Discussions & Live Events',
      'Clean member directory & leaderboard configuration',
    ],
    toolsUsed: ['Mighty Networks', 'Canva'],
    highlights: [
      'Start Here onboarding space',
      'Structured topic channels',
      'Custom welcome visuals',
      'Member discussion organization',
    ],
    primaryImage:
      '/assets/aistudio/screencapture-staying-aligned-mn-co-spaces-23053611-feed-2026-03-10-01_41_56_9e82116c.webp',
    gallery: [
      {
        src: '/assets/aistudio/screencapture-staying-aligned-mn-co-spaces-23053611-feed-2026-03-10-01_41_56_9e82116c.webp',
        caption: 'Staying Aligned Mighty Networks Start Here space & community feed',
      },
    ],
    relatedService: 'Circle.so, Mighty Networks & Kajabi Setup',
  },
  {
    id: 'travelwiseher-matching-survey',
    index: '06',
    title: 'TravelWiseHer Member Matching Survey',
    client: 'TravelWiseHer',
    category: 'Interactive Form & Member Matching System',
    filterGroup: 'Web & Landing Pages',
    shortDescription:
      'An 8-section member matching survey crafted to connect solo women travelers with compatible travel companions.',
    objective:
      'Design a warm, intuitive multi-step survey experience that captures destination preferences, travel dates, and travel style to power meaningful community connections.',
    servicesDelivered: [
      '8-section intelligent matching survey flow',
      'Mobile-optimized layout for effortless completion',
      'Structured questions covering travel style, safety & interests',
      'Cohesive visual header & community brand integration',
    ],
    toolsUsed: ['Tally', 'Typeform', 'Canva'],
    highlights: [
      '8 structured survey sections',
      'Mobile-first form flow',
      'Brand-aligned visual header',
      'Community matching logic',
    ],
    primaryImage: '/assets/aistudio/TravelWiseher_Form_Survey_f05a0f6d.png',
    gallery: [
      {
        src: '/assets/aistudio/TravelWiseher_Form_Survey_f05a0f6d.png',
        caption: 'TravelWiseHer Travel Buddy Match Form — desktop & mobile views',
      },
    ],
    relatedService: 'Landing Page & Website Development',
  },
];

/**
 * Extended Portfolio Archive:
 * Additional Skool and Mighty Networks client builds with custom cover faces.
 */
export const EDITABLE_ARCHIVE_PROJECTS: PortfolioProject[] = [
  {
    id: 'ats-bcba-success-lab',
    index: '07',
    title: 'ATS BCBA Success Lab',
    client: 'ATS Behavior Analysis',
    category: 'Skool Community & Exam Prep Architecture',
    filterGroup: 'Skool Communities',
    shortDescription:
      'Skool community and structured exam-prep learning environment built for BCBA certification candidates.',
    objective:
      'Organize a focused study hub inside Skool featuring structured Classroom modules, exam-prep study tracks, pinned onboarding guides, and peer accountability discussions.',
    servicesDelivered: [
      'Complete Skool community setup & space categorization',
      'Classroom curriculum hierarchy & study module architecture',
      'Member onboarding flow & community guidelines structure',
    ],
    toolsUsed: ['Skool', 'Canva'],
    highlights: [
      'Exam-prep classroom architecture',
      'Structured study tracks',
      'Clear member navigation',
    ],
    primaryImage: '/src/assets/images/archive_ats_bcba_face_1795182462552.jpg',
    gallery: [
      {
        src: '/src/assets/images/archive_ats_bcba_face_1795182462552.jpg',
        caption: 'ATS BCBA Success Lab — Academic Skool Community & Study Architecture',
      },
    ],
    relatedService: 'Skool Community Setup & Customization',
  },
  {
    id: 'fortified-athlete',
    index: '08',
    title: 'Fortified Athlete',
    client: 'Fortified Athlete Coaching',
    category: 'Skool Community & Performance Hub',
    filterGroup: 'Skool Communities',
    shortDescription:
      'High-impact athletic coaching and performance training hub structured inside Skool for athlete progression.',
    objective:
      'Deliver a unified athletic training community where coaches host strength conditioning libraries, accountability check-ins, and member progression milestones.',
    servicesDelivered: [
      'Skool community architecture & performance categories',
      'Training program Classroom layout & resource library',
      'Visual branding & athlete onboarding rituals',
    ],
    toolsUsed: ['Skool', 'Canva'],
    highlights: [
      'Performance training hub',
      'Structured coaching modules',
      'Member accountability flow',
    ],
    primaryImage: '/src/assets/images/archive_fortified_athlete_face_1795182463206.jpg',
    gallery: [
      {
        src: '/src/assets/images/archive_fortified_athlete_face_1795182463206.jpg',
        caption: 'Fortified Athlete — Performance Coaching Community Hub',
      },
    ],
    relatedService: 'Online Community Building & Management',
  },
  {
    id: 'first-real-estate-deal-lab',
    index: '09',
    title: 'First Real Estate Deal Lab',
    client: 'First Deal Academy',
    category: 'Skool Community & Course Setup',
    filterGroup: 'Skool Communities',
    shortDescription:
      'Real estate investing education community and deal-analysis academy structured on Skool.',
    objective:
      'Create an approachable, step-by-step Skool learning environment that guides new real estate investors from deal sourcing and underwriting fundamentals to closing their first deal.',
    servicesDelivered: [
      'Skool setup & Classroom step-by-step course structure',
      'Deal-review discussion categories & pinned resource templates',
      'Onboarding checklist & member progression setup',
    ],
    toolsUsed: ['Skool', 'Canva'],
    highlights: [
      'Investor academy setup',
      'Step-by-step deal curriculum',
      'Structured peer discussion',
    ],
    primaryImage: '/src/assets/images/archive_real_estate_face_1795182463130.jpg',
    gallery: [
      {
        src: '/src/assets/images/archive_real_estate_face_1795182463130.jpg',
        caption: 'First Real Estate Deal Lab — Investor Education & Deal Analysis Community',
      },
    ],
    relatedService: 'Course Creation, Uploading & Course Architecture',
  },
  {
    id: 'flippd-lab',
    index: '10',
    title: 'Flippd Lab',
    client: 'Flippd Lab Community',
    category: 'Skool Community & Digital Systems',
    filterGroup: 'Skool Communities',
    shortDescription:
      'Organized Skool community, digital operations workspace, and member onboarding flow for Flippd Lab.',
    objective:
      'Build a sharp, action-ready Skool community paired with organized project resources and repeatable member onboarding workflows.',
    servicesDelivered: [
      'Skool community customization & category layout',
      'Member welcome sequence & resource hub structure',
      'Digital workflow & operational alignment',
    ],
    toolsUsed: ['Skool', 'Canva'],
    highlights: [
      'Custom community layout',
      'Streamlined onboarding flow',
      'Organized digital systems',
    ],
    primaryImage: '/src/assets/images/archive_flippd_lab_face_1795182462976.jpg',
    gallery: [
      {
        src: '/src/assets/images/archive_flippd_lab_face_1795182462976.jpg',
        caption: 'Flippd Lab — Skool Community & Digital Systems Build',
      },
    ],
    relatedService: 'Skool Community Setup & Customization',
  },
  {
    id: 'hyou2-mighty-networks',
    index: '11',
    title: 'HYOU2 Mighty Networks',
    client: 'HYOU2 Community',
    category: 'Mighty Networks Community Setup',
    filterGroup: 'Course Platforms',
    shortDescription:
      'Thoughtfully organized Mighty Networks community spaces, onboarding path, and live member hub for HYOU2.',
    objective:
      'Establish an engaging, welcoming Mighty Networks home where members move seamlessly through guided spaces, courses, and live community gatherings.',
    servicesDelivered: [
      'Mighty Networks spaces & navigation architecture',
      'Guided welcome onboarding & member directory setup',
      'Course & live event hub configuration',
    ],
    toolsUsed: ['Mighty Networks', 'Canva'],
    highlights: [
      'Mighty Networks space architecture',
      'Guided welcome path',
      'Course & event hub setup',
    ],
    primaryImage: '/src/assets/images/archive_hyou2_face_1795182463935.jpg',
    gallery: [
      {
        src: '/src/assets/images/archive_hyou2_face_1795182463935.jpg',
        caption: 'HYOU2 — Mighty Networks Community Architecture & Member Hub',
      },
    ],
    relatedService: 'Circle.so, Mighty Networks & Kajabi Setup',
  },
];
