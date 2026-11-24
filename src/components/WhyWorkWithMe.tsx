import { motion, useReducedMotion } from 'motion/react';

const PILLARS = [
  {
    number: '01',
    title: 'Strategic Thinking',
    description:
      "I focus on building organized digital experiences around each client's goals.",
  },
  {
    number: '02',
    title: 'Professional Design',
    description:
      'I prioritize clean, modern, and brand-aligned visual presentation.',
  },
  {
    number: '03',
    title: 'Structured Community Building',
    description:
      'I create organized environments that make it easier for members to navigate, learn, and engage.',
  },
  {
    number: '04',
    title: 'Technical Expertise',
    description:
      'I understand how to connect platforms, automation tools, websites, and business systems.',
  },
  {
    number: '05',
    title: 'Client-Focused Delivery',
    description:
      "I prioritize understanding project requirements and delivering solutions that match the client's vision.",
  },
  {
    number: '06',
    title: 'Growth-Oriented Solutions',
    description:
      'I build digital systems with usability, organization, and future expansion in mind.',
  },
] as const;

export function WhyWorkWithMe() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative py-20 md:py-28 bg-[#071426]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
            Why Work With Me
          </p>
          <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
            More Than a Service. A Complete Digital Solution.
          </h2>
          <p className="mt-4 text-base sm:text-lg font-semibold text-[#DCE5F0] leading-relaxed">
            Clients work with me because I bridge community architecture, thoughtful visual design,
            and reliable technical implementation under one roof.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden border border-white/10">
          {PILLARS.map((pillar, idx) => (
            <motion.div
              key={pillar.number}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{ duration: 0.4, delay: Math.min(idx * 0.05, 0.2), ease: [0.16, 1, 0.3, 1] }}
              className="bg-[#0B1D38] p-7 sm:p-8 flex flex-col justify-between hover:bg-[#0E2446] transition-colors duration-200"
            >
              <div>
                <span className="font-mono-tabular text-base font-bold text-[#65A9FF]">
                  {pillar.number}.
                </span>
                <h3 className="mt-3 font-display font-extrabold text-xl text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-base font-semibold text-[#DCE5F0] leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
