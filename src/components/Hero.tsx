import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowRight, ArrowUpRight, Mail } from 'lucide-react';
import { BRAND } from '../data/brand';

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  const portraitY = useTransform(scrollYProgress, [0, 1], [0, prefersReducedMotion ? 0 : 48]);
  const glowScale = useTransform(scrollYProgress, [0, 1], [1, prefersReducedMotion ? 1 : 1.08]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24 bg-[#071426] bg-architect-grid"
    >
      {/* Subtle electric-blue architectural ambient light */}
      <motion.div
        style={{ scale: glowScale }}
        aria-hidden="true"
        className="pointer-events-none absolute -top-28 right-[-8%] w-[640px] h-[640px] rounded-full bg-[radial-gradient(circle,rgba(22,119,255,0.22)_0%,rgba(36,87,197,0.08)_48%,transparent_72%)] blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-[-10%] w-[520px] h-[420px] rounded-full bg-[radial-gradient(circle,rgba(101,169,255,0.12)_0%,transparent_70%)] blur-2xl"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* LEFT SIDE */}
          <div className="lg:col-span-7 flex flex-col items-start">
            <motion.p
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="text-sm sm:text-base font-bold tracking-[0.16em] uppercase text-[#65A9FF] mb-4"
            >
              Hello, I&apos;m {BRAND.fullName}
            </motion.p>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="font-display font-extrabold text-[clamp(2.5rem,5vw,4.35rem)] leading-[1.06] tracking-tight text-white [text-wrap:balance]"
            >
              Build Smarter.
              <span className="block text-electric-gradient mt-1">Grow Faster.</span>
            </motion.h1>

            <p className="mt-5 font-display text-lg sm:text-xl font-bold text-white">
              {BRAND.title}
            </p>

            <div className="mt-5 space-y-4 text-base sm:text-[17px] font-semibold leading-relaxed text-[#DCE5F0] max-w-2xl">
              <p>
                I help coaches, creators, educators, and businesses build professional online
                communities, structured learning experiences, and connected digital systems.
              </p>
              <p>
                From Skool community setup and course architecture to website development, landing
                pages, and automation, I turn ideas into organized digital experiences designed to
                engage members and support business growth.
              </p>
            </div>

            {/* Three Functional Action Buttons */}
            <div className="mt-8 flex flex-wrap items-center gap-3.5">
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm sm:text-base font-bold whitespace-nowrap shrink-0 transition-all duration-200 shadow-[0_12px_30px_rgba(22,119,255,0.32)] hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <span>Explore My Portfolio</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/20 bg-[#0B1D38]/80 hover:bg-[#0B1D38] hover:border-[#65A9FF]/60 text-white text-sm sm:text-base font-bold whitespace-nowrap shrink-0 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <Mail className="w-4 h-4 text-[#65A9FF]" aria-hidden="true" />
                <span>Work With Me</span>
              </a>

              <a
                href={BRAND.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-transparent hover:border-white/15 text-[#DCE5F0] hover:text-white text-sm sm:text-base font-bold whitespace-nowrap shrink-0 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <span>View Fiverr Profile</span>
                <ArrowUpRight className="w-4 h-4 text-[#65A9FF]" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* RIGHT SIDE: Framed Portrait with Subtle Blue Rim Lighting & Parallax */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
            <motion.div
              style={{ y: portraitY }}
              className="relative w-full max-w-[440px]"
            >
              {/* Atmospheric blue halo behind portrait */}
              <div
                aria-hidden="true"
                className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[#1677FF]/30 via-[#2457C5]/15 to-transparent blur-2xl"
              />

              <div className="relative rounded-2xl overflow-hidden border border-[#65A9FF]/25 bg-[#0B1D38] shadow-[0_24px_60px_rgba(3,10,22,0.75)]">
                <div className="aspect-[5/6] w-full overflow-hidden bg-[#0B1D38]">
                  <img
                    src={BRAND.portraitSrc}
                    alt="Moses Joseph — Skool Expert, Community Builder and Course Architect"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-top"
                  />
                </div>

                {/* Scrim footer inside portrait frame with clean identity bar */}
                <div className="bg-gradient-to-t from-[#071426] via-[#071426]/95 to-[#0B1D38]/85 px-6 py-4 border-t border-white/10">
                  <p className="font-display font-extrabold text-white text-lg tracking-tight">
                    {BRAND.fullName}
                  </p>
                  <p className="text-sm text-[#65A9FF] font-bold mt-0.5">
                    {BRAND.brandName} · International Client Delivery
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width Expertise Bar Below Split Hero */}
        <div
          className="mt-14 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          <div className="flex flex-col">
            <span className="text-sm font-bold tracking-[0.12em] uppercase text-[#65A9FF]">
              Primary Specialty
            </span>
            <span className="mt-1.5 font-display text-lg font-extrabold text-white">
              Skool Community Expert
            </span>
            <span className="mt-1.5 text-[15px] font-semibold text-[#DCE5F0]">
              End-to-end setup, branding, onboarding &amp; member engagement structure.
            </span>
          </div>

          <div className="flex flex-col md:border-l md:border-white/10 md:pl-6">
            <span className="text-sm font-bold tracking-[0.12em] uppercase text-[#65A9FF]">
              Learning Design
            </span>
            <span className="mt-1.5 font-display text-lg font-extrabold text-white">
              Course Architect
            </span>
            <span className="mt-1.5 text-[15px] font-semibold text-[#DCE5F0]">
              Structured classrooms across Skool, Circle.so, Mighty Networks &amp; Kajabi.
            </span>
          </div>

          <div className="flex flex-col md:border-l md:border-white/10 md:pl-6">
            <span className="text-sm font-bold tracking-[0.12em] uppercase text-[#65A9FF]">
              Connected Systems
            </span>
            <span className="mt-1.5 font-display text-lg font-extrabold text-white">
              Digital Systems Specialist
            </span>
            <span className="mt-1.5 text-[15px] font-semibold text-[#DCE5F0]">
              Conversion landing pages, Zapier workflows, GoHighLevel CRM &amp; Notion hubs.
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
