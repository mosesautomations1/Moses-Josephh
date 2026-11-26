import { ArrowUpRight, Mail } from 'lucide-react';
import { BRAND, NAV_ITEMS } from '../data/brand';
import { MJLogo } from './MJLogo';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#071426] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <a href="#home" className="inline-flex items-center gap-3">
              <MJLogo size={42} />
              <div>
                <p className="font-display font-extrabold text-lg text-white">
                  {BRAND.brandName}
                </p>
                <p className="text-sm font-bold text-[#65A9FF]">{BRAND.fullName}</p>
              </div>
            </a>

            <p className="text-base font-bold text-white">{BRAND.title}</p>
            <p className="text-[15px] font-semibold text-[#DCE5F0] max-w-md leading-relaxed">
              {BRAND.footerTagline}
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#65A9FF]">
              Navigation
            </h3>
            <ul className="mt-4 space-y-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="relative inline-block py-1 text-[15px] font-bold text-[#DCE5F0] hover:text-white transition-colors duration-200 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-gradient-to-r after:from-[#1677FF] after:to-[#65A9FF] after:transition-all after:duration-300 after:ease-out hover:after:w-full focus-visible:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] rounded"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Channels */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-[#65A9FF]">
              Connect Directly
            </h3>
            <div className="space-y-3">
              <a
                href={`mailto:${BRAND.email}`}
                className="flex items-center gap-2.5 text-[15px] font-bold text-[#DCE5F0] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-[#65A9FF] shrink-0" aria-hidden="true" />
                <span>{BRAND.email}</span>
              </a>

              <a
                href={BRAND.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#0B1D38] border border-white/15 hover:border-[#1677FF] text-[15px] font-bold text-white transition-colors"
              >
                <span>Fiverr: joseph_moses476</span>
                <ArrowUpRight className="w-4 h-4 text-[#65A9FF]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright Row */}
        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm font-semibold text-[#DCE5F0]">
          <p>
            &copy; {currentYear} {BRAND.fullName} · {BRAND.brandName}. All rights reserved.
          </p>
          <p>{BRAND.tagline}</p>
        </div>
      </div>
    </footer>
  );
}
