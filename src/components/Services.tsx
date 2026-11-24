import { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  Compass,
  Cpu,
  Database,
  GraduationCap,
  Layers,
  Layout,
  Newspaper,
  Palette,
  Search,
  Smartphone,
  Users,
  Workflow,
  Zap,
} from 'lucide-react';
import {
  SERVICES,
  SERVICE_CATEGORIES,
  type ServiceCategory,
  type ServiceItem,
} from '../data/services';

const ICON_MAP = {
  Layers,
  Users,
  GraduationCap,
  Palette,
  Compass,
  Layout,
  Workflow,
  Smartphone,
  Cpu,
  Zap,
  Database,
  Newspaper,
  Search,
} as const;

interface ServicesProps {
  onSelectService: (serviceTitle: string) => void;
}

export function Services({ onSelectService }: ServicesProps) {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>('All');
  const prefersReducedMotion = useReducedMotion();

  const primaryServices = SERVICES.filter((s) => s.isPrimary);
  const secondaryServices = SERVICES.filter((s) => !s.isPrimary);

  const visibleSecondary =
    activeCategory === 'All'
      ? secondaryServices
      : SERVICES.filter((s) => s.category === activeCategory);

  const handleRequestService = (title: string) => {
    onSelectService(title);
    const el = document.getElementById('contact');
    el?.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <section id="services" className="relative py-20 md:py-28 bg-[#071426]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
            Services &amp; Capabilities
          </p>
          <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
            Digital Solutions Built Around Your Vision.
          </h2>
          <p className="mt-4 text-base sm:text-lg font-semibold text-[#DCE5F0] leading-relaxed">
            Every community and digital business system is architected for clarity, member
            retention, and scalable growth—led by specialized Skool &amp; course infrastructure.
          </p>
        </div>

        {/* Primary Specialty Tier: Skool & Course Architecture (Services 01-03) */}
        <div className="mt-12">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="font-display text-sm sm:text-base font-bold uppercase tracking-[0.12em] text-[#65A9FF]">
              Primary Specialty · Skool &amp; Course Architecture
            </h3>
            <span className="hidden sm:inline text-sm font-bold text-[#DCE5F0]">
              Core Flagship Offerings
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {primaryServices.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                featured
                index={idx}
                onRequest={handleRequestService}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
          </div>
        </div>

        {/* Filterable Specialized Capabilities (Services 04-13) */}
        <div className="mt-16 pt-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-8">
            <div>
              <h3 className="font-display text-2xl font-extrabold text-white">
                Complete Digital &amp; Automation Suite
              </h3>
              <p className="mt-1.5 text-base font-semibold text-[#DCE5F0]">
                Websites, funnels, CRM workflows, workspaces, and search visibility.
              </p>
            </div>

            {/* Interactive Segmented Filter Tabs */}
            <div
              role="tablist"
              aria-label="Filter services by category"
              className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#0B1D38] border border-white/10"
            >
              {SERVICE_CATEGORIES.map((category) => {
                const isActive = activeCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setActiveCategory(category)}
                    className={`px-3.5 py-2 rounded-lg text-sm font-bold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] ${
                      isActive
                        ? 'bg-[#1677FF] text-white shadow-sm'
                        : 'text-[#DCE5F0] hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {visibleSecondary.map((service, idx) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={idx}
                onRequest={handleRequestService}
                prefersReducedMotion={Boolean(prefersReducedMotion)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

interface ServiceCardProps {
  service: ServiceItem;
  featured?: boolean;
  index: number;
  onRequest: (title: string) => void;
  prefersReducedMotion: boolean;
}

function ServiceCard({
  service,
  featured = false,
  index,
  onRequest,
  prefersReducedMotion,
}: ServiceCardProps) {
  const Icon = ICON_MAP[service.iconName];

  return (
    <motion.article
      initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.25), ease: [0.16, 1, 0.3, 1] }}
      className={`group flex flex-col justify-between rounded-2xl p-6 sm:p-7 transition-all duration-200 hover:-translate-y-1 ${
        featured
          ? 'bg-gradient-to-b from-[#0F274B] to-[#0B1D38] border border-[#1677FF]/45 shadow-[0_16px_40px_rgba(7,20,38,0.65)] hover:border-[#65A9FF]/70'
          : 'bg-[#0B1D38] border border-white/10 hover:border-[#65A9FF]/45'
      }`}
    >
      <div>
        <div className="flex items-start justify-between gap-4">
          <div
            className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
              featured
                ? 'bg-[#1677FF] text-white shadow-[0_8px_20px_rgba(22,119,255,0.35)]'
                : 'bg-[#071426] border border-white/10 text-[#65A9FF] group-hover:border-[#65A9FF]/40'
            }`}
          >
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <span className="font-mono-tabular text-sm font-bold text-[#65A9FF]">
            {service.number}
          </span>
        </div>

        <p className="mt-5 text-sm font-bold text-[#65A9FF] tracking-wide">
          {service.category}
        </p>

        <h4 className="mt-1.5 font-display font-extrabold text-xl text-white leading-snug">
          {service.title}
        </h4>

        <p className="mt-3 text-[15px] font-semibold text-[#DCE5F0] leading-relaxed">
          {service.description}
        </p>

        <ul className="mt-5 pt-4 border-t border-white/10 space-y-2">
          {service.deliverables.map((item) => (
            <li key={item} className="text-sm font-semibold text-[#DCE5F0] flex items-start gap-2">
              <span className="text-[#65A9FF] font-bold mt-0.5" aria-hidden="true">
                —
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 pt-4 border-t border-white/10">
        <button
          type="button"
          onClick={() => onRequest(service.title)}
          className="inline-flex items-center gap-2 text-sm font-bold text-[#65A9FF] hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] rounded"
        >
          <span>Inquire About This Service</span>
          <ArrowRight
            className="w-4 h-4 transition-transform duration-150 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </button>
      </div>
    </motion.article>
  );
}
