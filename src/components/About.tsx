import { motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { BRAND, CORE_EXPERTISE } from '../data/brand';

export function About() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="about"
      className="relative py-20 md:py-28 bg-[#0B1D38] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Portrait & Brand Showcase Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#071426] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <div className="aspect-[4/4.5] w-full overflow-hidden">
                <img
                  src={BRAND.portraitSrc}
                  alt="Moses Joseph — Digital Community Builder and Systems Specialist"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-5 border-t border-white/10 flex items-center justify-between gap-4">
                <div>
                  <p className="font-display font-extrabold text-white text-base">
                    {BRAND.fullName}
                  </p>
                  <p className="text-sm font-semibold text-[#DCE5F0] mt-0.5">
                    {BRAND.brandName}
                  </p>
                </div>
                <span className="text-sm font-bold text-[#65A9FF] whitespace-nowrap">
                  Skool &amp; Systems Specialist
                </span>
              </div>
            </div>
          </motion.div>

          {/* Biography & Expertise Column */}
          <motion.div
            initial={prefersReducedMotion ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 'some' }}
            transition={{ duration: 0.55, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7"
          >
            <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
              About Moses Joseph
            </p>
            <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
              Building Communities. Creating Digital Experiences.
            </h2>

            <div className="mt-6 space-y-4 text-[#DCE5F0] text-base sm:text-[17px] font-semibold leading-relaxed">
              <p>
                I&apos;m Moses Joseph, a digital community builder and systems specialist passionate
                about helping businesses, creators, and entrepreneurs establish professional online
                communities and digital experiences.
              </p>
              <p>
                My work combines community strategy, visual design, course organization, website
                development, and automation to help clients bring their ideas to life.
              </p>
              <p>
                Whether it&apos;s building a Skool community from scratch, organizing an online
                academy, designing a conversion-focused landing page, or connecting different
                business tools, I focus on creating solutions that are professional, structured,
                and easy to use.
              </p>
              <p className="text-white font-bold">
                I believe a successful online community is more than just a platform. It&apos;s an
                experience built around organization, engagement, accessibility, and growth.
              </p>
            </div>

            {/* Core Areas of Expertise */}
            <div className="mt-8 pt-8 border-t border-white/10">
              <h3 className="font-display text-base font-bold tracking-wide text-[#65A9FF] uppercase">
                Core Areas of Expertise
              </h3>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {CORE_EXPERTISE.map((area) => (
                  <li key={area} className="flex items-start gap-2.5 text-[15px] font-semibold text-white">
                    <CheckCircle2
                      className="w-5 h-5 text-[#1677FF] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href={BRAND.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm sm:text-base font-bold whitespace-nowrap shrink-0 transition-colors shadow-[0_10px_28px_rgba(22,119,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <span>Connect on Fiverr</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${BRAND.email}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 rounded-lg border border-white/15 hover:border-[#65A9FF]/50 text-[#DCE5F0] hover:text-white text-sm sm:text-base font-bold whitespace-nowrap shrink-0 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <span>{BRAND.email}</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
