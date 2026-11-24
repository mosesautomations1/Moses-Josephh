import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { Compass, Layers, Rocket, Search } from 'lucide-react';

const STEPS = [
  {
    step: 'Step 01',
    title: 'Discover',
    description:
      "Understand the client's vision, requirements, audience, and project goals.",
    icon: Search,
  },
  {
    step: 'Step 02',
    title: 'Strategize',
    description:
      'Plan the structure, functionality, branding, and digital experience.',
    icon: Compass,
  },
  {
    step: 'Step 03',
    title: 'Build',
    description:
      'Design, develop, customize, and integrate the required systems.',
    icon: Layers,
  },
  {
    step: 'Step 04',
    title: 'Deliver',
    description:
      'Test, refine, and deliver a professional solution ready for use.',
    icon: Rocket,
  },
] as const;

export function WorkProcess() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 55%'],
  });

  const lineScaleX = useTransform(scrollYProgress, [0, 1], [0.15, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 bg-[#0B1D38] border-y border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
            My Work Process
          </p>
          <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
            From Vision to Execution.
          </h2>
          <p className="mt-4 text-base sm:text-lg font-semibold text-[#DCE5F0] leading-relaxed">
            A clear, collaborative four-stage workflow built to keep every community launch,
            website build, and automation system structured from day one.
          </p>
        </div>

        {/* Animated Timeline Track (Desktop) */}
        <div className="relative mt-14">
          <div
            aria-hidden="true"
            className="hidden lg:block absolute top-8 left-0 right-0 h-[2px] bg-white/10"
          >
            <motion.div
              style={{
                scaleX: prefersReducedMotion ? 1 : lineScaleX,
                transformOrigin: 'left',
              }}
              className="h-full bg-gradient-to-r from-[#65A9FF] via-[#1677FF] to-[#2457C5]"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {STEPS.map((item, idx) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 'some' }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.08,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="relative flex flex-col"
                >
                  <div className="relative z-10 w-16 h-16 rounded-2xl bg-[#071426] border border-[#1677FF]/45 flex items-center justify-center shadow-[0_12px_30px_rgba(7,20,38,0.65)]">
                    <Icon className="w-6 h-6 text-[#65A9FF]" aria-hidden="true" />
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#071426] border border-white/10 p-6 flex-1">
                    <span className="font-mono-tabular text-sm font-bold uppercase tracking-[0.14em] text-[#65A9FF]">
                      {item.step}
                    </span>
                    <h3 className="mt-2 font-display font-extrabold text-xl text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2.5 text-[15px] font-semibold text-[#DCE5F0] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
