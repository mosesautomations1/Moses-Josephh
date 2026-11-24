import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { BRAND, NAV_ITEMS } from '../data/brand';
import { MJLogo } from './MJLogo';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = () => {
    setMobileOpen(false);
  };

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${
        scrolled
          ? 'bg-[#071426]/90 backdrop-blur-md border-b border-white/10 shadow-[0_12px_36px_rgba(0,0,0,0.35)]'
          : 'bg-[#071426]/65 backdrop-blur-sm border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-6 lg:gap-8">
        {/* Zone 1: MJ Logo + Moses Community Architect */}
        <a
          href="#home"
          className="flex items-center gap-3 shrink-0 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] rounded-lg"
        >
          <MJLogo size={38} className="transition-transform duration-200 group-hover:scale-105" />
          <span className="font-display font-extrabold text-base sm:text-lg tracking-tight text-white whitespace-nowrap shrink-0">
            {BRAND.brandName}
          </span>
        </a>

        {/* Zone 2: Primary navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden lg:flex items-center gap-7 text-sm font-bold text-[#DCE5F0]"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="relative py-1 whitespace-nowrap shrink-0 text-[#DCE5F0] hover:text-white transition-colors duration-150 after:absolute after:left-0 after:bottom-0 after:h-[1.5px] after:w-0 after:bg-[#65A9FF] after:transition-all after:duration-200 hover:after:w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF] rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href={BRAND.fiverrUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm font-semibold whitespace-nowrap shrink-0 transition-colors duration-200 shadow-[0_8px_24px_rgba(22,119,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-white/15 bg-[#0B1D38] text-white hover:border-[#65A9FF]/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Responsive Mobile Drawer */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-white/10 bg-[#071426]/98 backdrop-blur-xl">
          <nav
            aria-label="Mobile Navigation"
            className="max-w-7xl mx-auto px-4 py-5 flex flex-col gap-2"
          >
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleNavClick}
                className="px-3 py-3 rounded-lg text-base font-medium text-[#DCE5F0] hover:text-white hover:bg-[#0B1D38] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <a
              href={BRAND.fiverrUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleNavClick}
              className="mt-2 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm font-semibold transition-colors"
            >
              <span>Hire Me on Fiverr</span>
              <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
