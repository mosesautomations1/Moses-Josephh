export type ServiceCategory =
  | 'All'
  | 'Community & Courses'
  | 'Web & Funnels'
  | 'Automation & Systems'
  | 'Content & Search';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  category: Exclude<ServiceCategory, 'All'>;
  description: string;
  deliverables: string[];
  iconName:
    | 'Layers'
    | 'Users'
    | 'GraduationCap'
    | 'Palette'
    | 'Compass'
    | 'Layout'
    | 'Workflow'
    | 'Smartphone'
    | 'Cpu'
    | 'Zap'
    | 'Database'
    | 'Newspaper'
    | 'Search';
  isPrimary?: boolean;
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  'All',
  'Community & Courses',
  'Web & Funnels',
  'Automation & Systems',
  'Content & Search',
];

export const SERVICES: ServiceItem[] = [
  {
    id: 'skool-setup',
    number: '01',
    title: 'Skool Community Setup & Customization',
    category: 'Community & Courses',
    description:
      'End-to-end Skool community architecture—from branded cover visuals, About page positioning, and category organization to onboarding pinned posts and member levels.',
    deliverables: [
      'Complete space & category structuring',
      'Custom banner, thumbnail & About copy layout',
      'Gamification levels & onboarding flow',
    ],
    iconName: 'Layers',
    isPrimary: true,
  },
  {
    id: 'community-building',
    number: '02',
    title: 'Online Community Building & Management',
    category: 'Community & Courses',
    description:
      'Structured engagement systems, discussion rituals, calendar event workflows, and clear member navigation designed to keep members active and retained.',
    deliverables: [
      'Engagement frameworks & welcome sequences',
      'Event calendar & live session structure',
      'Community guidelines & moderation workflows',
    ],
    iconName: 'Users',
    isPrimary: true,
  },
  {
    id: 'course-architecture',
    number: '03',
    title: 'Course Creation, Uploading & Course Architecture',
    category: 'Community & Courses',
    description:
      'Logical curriculum structuring inside Skool Classroom and course platforms—organizing modules, lessons, downloadable resources, and unlock tiers cleanly.',
    deliverables: [
      'Module & lesson hierarchy design',
      'Video, resource & checklist uploading',
      'Tiered course access & drip alignment',
    ],
    iconName: 'GraduationCap',
    isPrimary: true,
  },
  {
    id: 'community-branding',
    number: '04',
    title: 'Community Branding & Graphic Design',
    category: 'Community & Courses',
    description:
      'Cohesive visual identity systems including Skool covers, course thumbnails, event banners, and resource library graphics tailored to your brand.',
    deliverables: [
      'Skool & Circle cover banners',
      'Course module thumbnails & event cards',
      'Consistent brand typography & palette',
    ],
    iconName: 'Palette',
  },
  {
    id: 'circle-mighty-kajabi',
    number: '05',
    title: 'Circle.so, Mighty Networks & Kajabi Setup',
    category: 'Community & Courses',
    description:
      'Multi-platform community configuration across Circle.so, Mighty Networks, and Kajabi—tailored spaces, member directories, events, and course hubs.',
    deliverables: [
      'Space groups & access permissions',
      'Event templates & live workshop setup',
      'Branded onboarding & member hubs',
    ],
    iconName: 'Compass',
  },
  {
    id: 'landing-page-web',
    number: '06',
    title: 'Landing Page & Website Development',
    category: 'Web & Funnels',
    description:
      'Modern, responsive websites and community landing pages structured around clear messaging, visual credibility, and conversion-focused calls to action.',
    deliverables: [
      'Responsive desktop & mobile layouts',
      'Conversion-oriented copy hierarchy',
      'Fast, clean front-end implementation',
    ],
    iconName: 'Layout',
  },
  {
    id: 'systeme-io',
    number: '07',
    title: 'Systeme.io Website & Sales Funnel Development',
    category: 'Web & Funnels',
    description:
      'Complete Systeme.io landing pages, opt-in funnels, course access pages, and automated email follow-up sequences built for seamless conversion.',
    deliverables: [
      'Custom Systeme.io community & sales pages',
      'Lead capture & opt-in workflows',
      'Email tag & campaign triggers',
    ],
    iconName: 'Workflow',
  },
  {
    id: 'carrd-design',
    number: '08',
    title: 'Carrd Website Design',
    category: 'Web & Funnels',
    description:
      'Focused, fast-loading one-page websites and creator hub pages on Carrd—ideal for community waitlists, speaker profiles, and direct conversion links.',
    deliverables: [
      'Clean single-page architecture',
      'Mobile-first visual polish',
      'Custom domain & form integration',
    ],
    iconName: 'Smartphone',
  },
  {
    id: 'ghl-crm',
    number: '09',
    title: 'GoHighLevel CRM & Workflow Automation',
    category: 'Automation & Systems',
    description:
      'Connected GoHighLevel pipelines, contact tagging, automated onboarding sequences, and LeadConnector workflows built for reliable client and member follow-up.',
    deliverables: [
      'CRM pipeline & contact field mapping',
      'Automated welcome email & SMS workflows',
      'Form & calendar trigger integrations',
    ],
    iconName: 'Cpu',
  },
  {
    id: 'zapier-automation',
    number: '10',
    title: 'Zapier Integration & Email Automation',
    category: 'Automation & Systems',
    description:
      'Reliable Zapier bridges connecting Skool membership answers, Typeform/Tally surveys, Google Sheets, email tools, and GoHighLevel without manual entry.',
    deliverables: [
      'Skool membership trigger workflows',
      'Multi-step data parsing & field mapping',
      'Error-tested live automation pipelines',
    ],
    iconName: 'Zap',
  },
  {
    id: 'notion-workspace',
    number: '11',
    title: 'Notion Dashboard, CRM & Workspace Development',
    category: 'Automation & Systems',
    description:
      'Organized Notion operating systems—client portals, content calendars, course production trackers, and relational CRMs designed for daily clarity.',
    deliverables: [
      'Custom relational databases & views',
      'Client & member portal templates',
      'Clean team SOP & project dashboards',
    ],
    iconName: 'Database',
  },
  {
    id: 'ghost-cms',
    number: '12',
    title: 'Ghost CMS Website & Newsletter Setup',
    category: 'Content & Search',
    description:
      'Publication-grade Ghost CMS websites with membership tiers, clean editorial themes, and integrated newsletter delivery for writers and educators.',
    deliverables: [
      'Theme customization & navigation setup',
      'Newsletter & member tier configuration',
      'Clean publishing & tag taxonomy',
    ],
    iconName: 'Newspaper',
  },
  {
    id: 'seo-aeo-geo',
    number: '13',
    title: 'SEO, AEO & Generative Engine Optimization',
    category: 'Content & Search',
    description:
      'Search, Answer Engine, and Generative Engine Optimization—semantic HTML, structured Schema.org data, and clear authority content built for modern discovery.',
    deliverables: [
      'Technical on-page SEO & metadata',
      'Schema.org structured data implementation',
      'AEO & AI-search content structuring',
    ],
    iconName: 'Search',
  },
];
