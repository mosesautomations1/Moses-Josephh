import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Eye,
  Layers,
  X,
} from 'lucide-react';
import {
  EDITABLE_ARCHIVE_PROJECTS,
  FEATURED_AND_VERIFIED_PROJECTS,
  PORTFOLIO_FILTERS,
  type PortfolioCategory,
  type PortfolioProject,
} from '../data/portfolio';

interface PortfolioProps {
  onInquireProject: (serviceTitle: string, projectName: string) => void;
}

export function Portfolio({ onInquireProject }: PortfolioProps) {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategory>('All');
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const filteredVerified =
    activeFilter === 'All'
      ? FEATURED_AND_VERIFIED_PROJECTS
      : FEATURED_AND_VERIFIED_PROJECTS.filter((p) => p.filterGroup === activeFilter);

  const filteredArchive =
    activeFilter === 'All'
      ? EDITABLE_ARCHIVE_PROJECTS
      : EDITABLE_ARCHIVE_PROJECTS.filter((p) => p.filterGroup === activeFilter);

  const openProjectModal = (project: PortfolioProject) => {
    setSelectedProject(project);
    setActiveImageIndex(0);
  };

  useEffect(() => {
    if (!selectedProject) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedProject]);

  return (
    <section
      id="portfolio"
      className="relative scroll-mt-20 py-20 md:py-28 bg-[#0B1D38] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header + Filter Controls */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
              Featured Portfolio
            </p>
            <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
              Selected Projects. Real Work. Digital Experiences.
            </h2>
            <p className="mt-4 text-base sm:text-lg font-semibold text-[#DCE5F0] leading-relaxed">
              Verified Skool communities, conversion landing pages, Zapier &amp; GoHighLevel
              automations, and multi-platform community spaces built for real clients.
            </p>
          </div>

          {/* Interactive Portfolio Category Filter */}
          <div
            role="tablist"
            aria-label="Filter portfolio projects"
            className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-xl bg-[#071426] border border-white/10 self-start"
          >
            {PORTFOLIO_FILTERS.map((filter) => {
              const isActive = activeFilter === filter;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-3.5 py-2 rounded-lg text-sm font-bold whitespace-nowrap shrink-0 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] ${
                    isActive
                      ? 'bg-[#1677FF] text-white shadow-sm'
                      : 'text-[#DCE5F0] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>
        </div>

        {/* Verified Showcase Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {filteredVerified.map((project, idx) => (
            <motion.article
              key={project.id}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.45, delay: Math.min(idx * 0.06, 0.24), ease: [0.16, 1, 0.3, 1] }}
              className={`group flex flex-col rounded-2xl overflow-hidden bg-[#071426] border transition-all duration-200 hover:-translate-y-1 ${
                project.featured
                  ? 'border-[#1677FF]/40 shadow-[0_18px_45px_rgba(3,10,22,0.65)] hover:border-[#65A9FF]/70'
                  : 'border-white/10 hover:border-[#65A9FF]/45'
              }`}
            >
              {/* Project Preview Media */}
              <button
                type="button"
                onClick={() => openProjectModal(project)}
                className="relative aspect-[3/2] w-full overflow-hidden bg-[#050C17] border-b border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
                aria-label={`View ${project.title} project details`}
              >
                {project.primaryImage ? (
                  <img
                    src={project.primaryImage}
                    alt={`${project.title} — ${project.category}`}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full transition-transform duration-500 group-hover:scale-[1.02] ${
                      project.featured || project.id === 'travelwiseher-matching-survey'
                        ? 'object-contain bg-[#050C17]'
                        : 'object-cover object-top'
                    }`}
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#0B1D38] to-[#071426]">
                    <Layers className="w-8 h-8 text-[#65A9FF] mb-2" />
                    <span className="text-base font-bold text-white">{project.title}</span>
                  </div>
                )}
              </button>

              {/* Card Content */}
              <div className="flex-1 flex flex-col justify-between p-6">
                <div>
                  <div className="flex items-center justify-between gap-2 text-sm">
                    <p className="font-bold text-[#65A9FF] truncate">
                      {project.category}
                    </p>
                    <span className="font-mono-tabular font-bold text-[#DCE5F0] shrink-0">
                      {project.index}
                      {project.gallery.length > 1 ? ` · ${project.gallery.length} screens` : ''}
                    </span>
                  </div>
                  <h3 className="mt-2 font-display font-extrabold text-xl text-white tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-2.5 text-[15px] font-semibold text-[#DCE5F0] leading-relaxed">
                    {project.shortDescription}
                  </p>

                  {/* Unboxed Typographic Tool List (Zero-Pill Rule) */}
                  <p className="mt-4 pt-3.5 border-t border-white/10 text-sm font-semibold text-[#DCE5F0]/90">
                    {project.toolsUsed.join(' · ')}
                  </p>
                </div>

                <div className="mt-6">
                  <button
                    type="button"
                    onClick={() => openProjectModal(project)}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#0B1D38] hover:bg-[#1677FF] border border-white/15 hover:border-[#1677FF] text-white text-sm font-bold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
                  >
                    <Eye className="w-4 h-4" aria-hidden="true" />
                    <span>View Project</span>
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Extended Portfolio Archive with Full Cover Faces */}
        {filteredArchive.length > 0 && (
          <div className="mt-16 pt-12 border-t border-white/10">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
                  Additional Community Builds
                </p>
                <h3 className="mt-2 font-display font-extrabold text-2xl sm:text-3xl text-white">
                  Extended Portfolio Archive
                </h3>
                <p className="mt-2 text-base font-semibold text-[#DCE5F0] max-w-2xl leading-relaxed">
                  Completed Skool and Mighty Networks community setups featuring structured learning
                  spaces, member onboarding, and brand alignment.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArchive.map((project) => (
                <article
                  key={project.id}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-[#071426] border border-white/15 hover:border-[#65A9FF]/60 transition-all duration-200 hover:-translate-y-1 shadow-[0_14px_34px_rgba(3,10,22,0.5)]"
                >
                  {/* Visual Cover Face */}
                  <button
                    type="button"
                    onClick={() => openProjectModal(project)}
                    className="relative aspect-[16/9] w-full overflow-hidden bg-[#050C17] border-b border-white/10 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
                    aria-label={`View ${project.title} project details`}
                  >
                    {project.primaryImage ? (
                      <img
                        src={project.primaryImage}
                        alt={`${project.title} — ${project.category}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-5 text-center bg-[#0B1D38]">
                        <Layers className="w-7 h-7 text-[#65A9FF] mb-2" />
                        <span className="text-base font-bold text-white">{project.title}</span>
                      </div>
                    )}
                  </button>

                  {/* Project Info */}
                  <div className="flex-1 flex flex-col justify-between p-6">
                    <div>
                      <div className="flex items-center justify-between gap-2 text-sm">
                        <span className="font-bold text-[#65A9FF] truncate">
                          {project.category}
                        </span>
                        <span className="font-mono-tabular font-bold text-[#DCE5F0] shrink-0">
                          {project.index}
                        </span>
                      </div>

                      <h4 className="mt-2 font-display font-extrabold text-xl text-white">
                        {project.title}
                      </h4>
                      <p className="mt-2.5 text-[15px] font-semibold text-[#DCE5F0] leading-relaxed">
                        {project.shortDescription}
                      </p>
                    </div>

                    <div className="mt-5 pt-4 border-t border-white/10 flex items-center justify-between gap-3">
                      <span className="text-sm font-semibold text-[#DCE5F0]/90">
                        {project.toolsUsed.join(' · ')}
                      </span>
                      <button
                        type="button"
                        onClick={() => openProjectModal(project)}
                        className="inline-flex items-center gap-1.5 text-sm font-bold text-[#65A9FF] hover:text-white transition-colors whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] rounded"
                      >
                        <span>View Project</span>
                        <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-project-title"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#040B16]/85 backdrop-blur-md"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#0B1D38] border border-white/15 shadow-[0_32px_90px_rgba(0,0,0,0.75)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between gap-4 px-6 py-4 bg-[#0B1D38]/95 backdrop-blur-md border-b border-white/10">
              <div>
                <p className="text-sm font-bold text-[#65A9FF]">
                  {selectedProject.category} · {selectedProject.client}
                </p>
                <h3
                  id="modal-project-title"
                  className="font-display font-extrabold text-xl sm:text-2xl text-white"
                >
                  {selectedProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close project case study"
                className="inline-flex items-center justify-center w-10 h-10 rounded-lg bg-[#071426] border border-white/15 text-[#DCE5F0] hover:text-white hover:border-[#65A9FF]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-8">
              {/* Media Gallery */}
              {selectedProject.gallery.length > 0 && (
                <div className="space-y-3">
                  <div className="rounded-xl overflow-hidden border border-white/10 bg-[#071426] max-h-[480px] overflow-y-auto">
                    <img
                      src={selectedProject.gallery[activeImageIndex]?.src}
                      alt={
                        selectedProject.gallery[activeImageIndex]?.caption ||
                        selectedProject.title
                      }
                      referrerPolicy="no-referrer"
                      className="w-full h-auto object-contain"
                    />
                  </div>
                  <p className="text-sm font-semibold text-[#DCE5F0]">
                    {selectedProject.gallery[activeImageIndex]?.caption}
                  </p>

                  {selectedProject.gallery.length > 1 && (
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      {selectedProject.gallery.map((shot, idx) => (
                        <button
                          key={shot.src}
                          type="button"
                          onClick={() => setActiveImageIndex(idx)}
                          className={`px-3.5 py-2 rounded-lg text-sm font-bold border transition-colors ${
                            idx === activeImageIndex
                              ? 'bg-[#1677FF] border-[#1677FF] text-white'
                              : 'bg-[#071426] border-white/15 text-[#DCE5F0] hover:border-[#65A9FF]/50'
                          }`}
                        >
                          Screen {idx + 1}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Case Study Details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                <div className="md:col-span-7 space-y-4">
                  <div>
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#65A9FF]">
                      Project Objective
                    </h4>
                    <p className="mt-2 text-base font-semibold text-[#DCE5F0] leading-relaxed">
                      {selectedProject.objective}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-display font-bold text-sm uppercase tracking-wider text-[#65A9FF]">
                      Services Delivered
                    </h4>
                    <ul className="mt-3 space-y-2.5">
                      {selectedProject.servicesDelivered.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2.5 text-[15px] font-semibold text-[#DCE5F0]"
                        >
                          <CheckCircle2
                            className="w-4 h-4 text-[#1677FF] shrink-0 mt-1"
                            aria-hidden="true"
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="md:col-span-5 space-y-5 bg-[#071426] rounded-xl p-5 border border-white/10 self-start">
                  <div>
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#65A9FF]">
                      Key Highlights
                    </h4>
                    <ul className="mt-2.5 space-y-1.5 text-[15px] font-semibold text-[#DCE5F0]">
                      {selectedProject.highlights.map((h) => (
                        <li key={h}>· {h}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-white/10">
                    <h4 className="text-sm font-bold uppercase tracking-wider text-[#65A9FF]">
                      Platforms &amp; Tools Used
                    </h4>
                    <p className="mt-2 text-base text-white font-bold">
                      {selectedProject.toolsUsed.join(' · ')}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-col gap-2.5">
                    <button
                      type="button"
                      onClick={() => {
                        const service = selectedProject.relatedService;
                        const title = selectedProject.title;
                        setSelectedProject(null);
                        onInquireProject(service, title);
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm font-bold transition-colors"
                    >
                      <span>Build Something Similar</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>

                    <a
                      href="https://www.fiverr.com/joseph_moses476"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border border-white/15 hover:border-[#65A9FF]/50 text-[#DCE5F0] hover:text-white text-sm font-bold transition-colors"
                    >
                      <span>Hire Me on Fiverr</span>
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
