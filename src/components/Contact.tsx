import { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUpRight, CheckCircle2, Mail, Send, AlertCircle } from 'lucide-react';
import { BRAND } from '../data/brand';
import { SERVICES } from '../data/services';

interface ContactProps {
  preselectedService: string;
  projectContext?: string;
}

type SubmitState = 'idle' | 'submitting' | 'success' | 'error';

export function Contact({ preselectedService, projectContext }: ContactProps) {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [service, setService] = useState(
    preselectedService || SERVICES[0].title
  );
  const [projectDetails, setProjectDetails] = useState('');
  const [submitState, setSubmitState] = useState<SubmitState>('idle');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [submittedId, setSubmittedId] = useState('');
  const [emailDelivered, setEmailDelivered] = useState(false);

  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (preselectedService) {
      setService(preselectedService);
    }
  }, [preselectedService]);

  useEffect(() => {
    if (projectContext) {
      setProjectDetails((prev) =>
        prev.trim()
          ? prev
          : `I'm interested in a build similar to "${projectContext}". Here are my goals:`
      );
    }
  }, [projectContext]);

  const handleFocusForm = () => {
    nameInputRef.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitState('submitting');
    setFeedbackMessage('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName,
          email,
          service,
          projectDetails,
          source: projectContext
            ? `Project Inquiry Form (Similar to: ${projectContext})`
            : 'Project Inquiry Form',
        }),
      });

      const data = (await response.json()) as {
        success?: boolean;
        emailSent?: boolean;
        id?: string;
        message?: string;
        error?: string;
      };

      if (!response.ok || !data.success) {
        setSubmitState('error');
        setEmailDelivered(false);
        setFeedbackMessage(
          data.error ||
            'Unable to submit your inquiry right now. Please use the direct email button.'
        );
        return;
      }

      setSubmitState('success');
      setEmailDelivered(Boolean(data.emailSent));
      setSubmittedId(data.id || '');
      setFeedbackMessage(
        data.message || 'Your project inquiry has been received.'
      );
    } catch {
      setSubmitState('error');
      setFeedbackMessage(
        `Network error while sending your inquiry. Please email ${BRAND.email} directly.`
      );
    }
  };

  const mailtoHref = `mailto:${BRAND.email}?subject=${encodeURIComponent(
    `Project Inquiry: ${service}`
  )}&body=${encodeURIComponent(
    `Hello Moses,\n\nName: ${fullName || '[Your Name]'}\nService Needed: ${service}\n\nProject Details:\n${projectDetails || '[Share your community or digital project goals]'}`
  )}`;

  return (
    <section
      id="contact"
      className="relative py-20 md:py-28 bg-[#0B1D38] border-t border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* LEFT COLUMN: Direct Contact Info & Primary Channels */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-sm font-bold tracking-[0.16em] uppercase text-[#65A9FF]">
                Contact
              </p>
              <h2 className="mt-3 font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] leading-[1.14] tracking-tight text-white [text-wrap:balance]">
                Let&apos;s Build Something Exceptional.
              </h2>
              <p className="mt-4 text-base sm:text-lg font-semibold text-[#DCE5F0] leading-relaxed">
                Have a community idea, a digital project, or a business system you want to bring
                to life? Let&apos;s discuss your vision and explore how I can help.
              </p>
            </div>

            {/* Direct Identity & Contact Details */}
            <div className="rounded-2xl bg-[#071426] border border-white/10 p-6 space-y-5">
              <div>
                <span className="text-sm uppercase tracking-wider text-[#65A9FF] font-bold">
                  Specialist
                </span>
                <p className="mt-1 font-display font-extrabold text-xl text-white">
                  {BRAND.fullName}
                </p>
                <p className="text-[15px] font-semibold text-[#DCE5F0]">{BRAND.title}</p>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-sm uppercase tracking-wider text-[#65A9FF] font-bold">
                  Email
                </span>
                <a
                  href={`mailto:${BRAND.email}`}
                  className="mt-1 block text-base font-bold text-white hover:text-[#65A9FF] transition-colors break-all"
                >
                  {BRAND.email}
                </a>
              </div>

              <div className="pt-4 border-t border-white/10">
                <span className="text-sm uppercase tracking-wider text-[#65A9FF] font-bold">
                  Fiverr Profile
                </span>
                <a
                  href={BRAND.fiverrUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1.5 text-base font-bold text-white hover:text-[#65A9FF] transition-colors break-all"
                >
                  <span>fiverr.com/joseph_moses476</span>
                  <ArrowUpRight className="w-4 h-4 text-[#65A9FF] shrink-0" aria-hidden="true" />
                </a>
              </div>
            </div>

            {/* Three Requested Action Buttons */}
            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={BRAND.fiverrUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm sm:text-base font-bold whitespace-nowrap transition-colors shadow-[0_12px_28px_rgba(22,119,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <span>HIRE ME ON FIVERR</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href={`mailto:${BRAND.email}?subject=${encodeURIComponent(
                  'Community & Digital Project Inquiry'
                )}`}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/20 bg-[#071426] hover:border-[#65A9FF]/60 text-white text-sm sm:text-base font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <Mail className="w-4 h-4 text-[#65A9FF]" aria-hidden="true" />
                <span>SEND ME AN EMAIL</span>
              </a>

              <button
                type="button"
                onClick={handleFocusForm}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-lg border border-white/15 hover:border-white/30 text-white text-sm sm:text-base font-bold whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
              >
                <span>LET&apos;S DISCUSS YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4 text-[#65A9FF]" aria-hidden="true" />
              </button>
            </div>
          </div>

          {/* RIGHT COLUMN: Functional Contact Form Backed by /api/contact */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-[#071426] border border-white/10 p-6 sm:p-8 lg:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
              <h3 className="font-display font-extrabold text-2xl sm:text-3xl text-white">
                Project Inquiry Form
              </h3>
              <p className="mt-2 text-base font-semibold text-[#DCE5F0]">
                Share your requirements below and your inquiry will be routed directly to Moses.
              </p>

              {submitState === 'success' ? (
                <div className="mt-8 rounded-xl bg-[#0B1D38] border border-[#1677FF]/45 p-6 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-6 h-6 text-[#65A9FF] shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-display font-extrabold text-xl text-white">
                        {emailDelivered ? 'Inquiry Sent' : 'Inquiry Saved'}
                      </h4>
                      <p className="mt-1.5 text-[15px] font-semibold text-[#DCE5F0]">
                        {feedbackMessage}
                      </p>
                      {submittedId && (
                        <p className="mt-2 font-mono-tabular text-sm font-bold text-[#65A9FF]">
                          Reference ID: {submittedId}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/10 flex flex-wrap gap-3">
                    <a
                      href={mailtoHref}
                      className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] text-white text-sm font-bold transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      <span>Open in Email App</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitState('idle');
                        setEmailDelivered(false);
                        setFullName('');
                        setEmail('');
                        setProjectDetails('');
                      }}
                      className="px-4 py-2.5 rounded-lg border border-white/15 text-sm font-bold text-white hover:border-[#65A9FF]/50 transition-colors"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="contact-full-name"
                        className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
                      >
                        Full Name *
                      </label>
                      <input
                        ref={nameInputRef}
                        id="contact-full-name"
                        name="fullName"
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Your full name"
                        className="w-full px-4 py-3 rounded-lg bg-[#0B1D38] border border-white/15 text-base font-semibold text-white placeholder:text-white/45 focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] transition-colors"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="contact-email"
                        className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
                      >
                        Email Address *
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 rounded-lg bg-[#0B1D38] border border-white/15 text-base font-semibold text-white placeholder:text-white/45 focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-service"
                      className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
                    >
                      Service Required *
                    </label>
                    <select
                      id="contact-service"
                      name="service"
                      value={service}
                      onChange={(e) => setService(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1D38] border border-white/15 text-base font-semibold text-white focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] transition-colors"
                    >
                      {SERVICES.map((item) => (
                        <option key={item.id} value={item.title} className="bg-[#071426] text-white">
                          {item.number}. {item.title}
                        </option>
                      ))}
                      <option value="Custom Community & Systems Package" className="bg-[#071426] text-white">
                        Custom Community &amp; Systems Package
                      </option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="contact-details"
                      className="block text-sm font-bold uppercase tracking-wider text-white mb-2"
                    >
                      Project Details *
                    </label>
                    <textarea
                      id="contact-details"
                      name="projectDetails"
                      required
                      rows={5}
                      value={projectDetails}
                      onChange={(e) => setProjectDetails(e.target.value)}
                      placeholder="Tell me about your community vision, platform preferences (Skool, Circle.so, Systeme.io, GoHighLevel, Zapier), timeline, and goals..."
                      className="w-full px-4 py-3 rounded-lg bg-[#0B1D38] border border-white/15 text-base font-semibold text-white placeholder:text-white/45 focus:outline-none focus:border-[#1677FF] focus:ring-1 focus:ring-[#1677FF] transition-colors"
                    />
                  </div>

                  {submitState === 'error' && feedbackMessage && (
                    <div
                      role="alert"
                      className="flex items-start gap-2.5 rounded-lg bg-red-950/50 border border-red-400/35 px-4 py-3 text-sm font-semibold text-red-200"
                    >
                      <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                      <span>{feedbackMessage}</span>
                    </div>
                  )}

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <button
                      type="submit"
                      disabled={submitState === 'submitting'}
                      className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-lg bg-[#1677FF] hover:bg-[#2457C5] disabled:opacity-60 text-white text-sm sm:text-base font-bold whitespace-nowrap transition-colors shadow-[0_12px_28px_rgba(22,119,255,0.28)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#65A9FF]"
                    >
                      <Send className="w-4 h-4" aria-hidden="true" />
                      <span>
                        {submitState === 'submitting' ? 'Sending Inquiry...' : 'Send Project Inquiry'}
                      </span>
                    </button>

                    <a
                      href={mailtoHref}
                      className="text-sm font-bold text-[#DCE5F0] hover:text-[#65A9FF] transition-colors"
                    >
                      Prefer your email client? Draft in Mail
                    </a>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
