import 'dotenv/config';
import express from 'express';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const envPort = process.env.PORT;
const nginxPort = process.env.NGINX_PORT;
const resolvedPort =
  envPort && nginxPort && envPort === nginxPort
    ? Number(process.env.DEFAULT_APP_PORT || 3000)
    : Number(envPort || process.env.DEFAULT_APP_PORT || 3000);

const isProduction = process.env.NODE_ENV === 'production';
const INQUIRIES_DIR = path.join(__dirname, 'data');
const INQUIRIES_FILE = path.join(INQUIRIES_DIR, 'inquiries.json');
const DEFAULT_RECIPIENT_EMAIL = 'mosesautomations@gmail.com';

interface ContactInquiry {
  id: string;
  fullName: string;
  email: string;
  service: string;
  projectDetails: string;
  source: string;
  submittedAt: string;
}

interface SmtpConfig {
  host: string;
  port: number;
  secure: boolean;
  user: string;
  pass: string;
  from: string;
  recipientEmail: string;
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function sanitizeHeader(value: string): string {
  return value.replace(/[\r\n]+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function stripWrappingQuotes(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1).trim();
  }
  return trimmed;
}

function getSmtpConfig(): { config: SmtpConfig | null; missing: string[] } {
  const host = stripWrappingQuotes(process.env.SMTP_HOST || '');
  const user = stripWrappingQuotes(process.env.SMTP_USER || '').trim();
  const rawPass = stripWrappingQuotes(process.env.SMTP_PASS || '');
  const pass = host.toLowerCase().includes('gmail.com')
    ? rawPass.replace(/\s+/g, '')
    : rawPass;
  const rawPort = stripWrappingQuotes(process.env.SMTP_PORT || '');
  const rawSecure = stripWrappingQuotes(process.env.SMTP_SECURE || '').toLowerCase();
  const recipientEmail =
    stripWrappingQuotes(process.env.CONTACT_RECIPIENT_EMAIL || DEFAULT_RECIPIENT_EMAIL) ||
    DEFAULT_RECIPIENT_EMAIL;

  const missing: string[] = [];
  if (!host) missing.push('SMTP_HOST');
  if (!user) missing.push('SMTP_USER');
  if (!pass) missing.push('SMTP_PASS');

  if (missing.length > 0) {
    return { config: null, missing };
  }

  const parsedPort = rawPort ? Number(rawPort) : rawSecure === 'false' ? 587 : 465;
  const port = Number.isFinite(parsedPort) && parsedPort > 0 ? parsedPort : 465;
  const secure =
    port === 465 ? true : port === 587 ? false : rawSecure ? rawSecure === 'true' : false;
  const from =
    stripWrappingQuotes(process.env.SMTP_FROM || '') ||
    `"Moses Community Architect" <${user}>`;

  return {
    config: {
      host,
      port,
      secure,
      user,
      pass,
      from,
      recipientEmail,
    },
    missing: [],
  };
}

function createSmtpTransporter(config: SmtpConfig) {
  return nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.secure,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });
}

async function sendInquiryEmail(config: SmtpConfig, inquiry: ContactInquiry): Promise<void> {
  const transporter = createSmtpTransporter(config);

  const safeFullName = sanitizeHeader(inquiry.fullName);
  const safeEmail = sanitizeHeader(inquiry.email);
  const safeService = sanitizeHeader(inquiry.service);

  const textBody = [
    'New Project Inquiry — Moses Community Architect',
    '================================================',
    `Reference ID: ${inquiry.id}`,
    `Submitted At: ${inquiry.submittedAt}`,
    `Form Source:  ${inquiry.source}`,
    '',
    `Full Name:    ${inquiry.fullName}`,
    `Client Email: ${inquiry.email}`,
    `Service:      ${inquiry.service}`,
    '',
    'Project Details:',
    inquiry.projectDetails,
  ].join('\n');

  const htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #071426; color: #FFFFFF; padding: 32px 20px;">
      <div style="max-width: 620px; margin: 0 auto; background-color: #0B1D38; border: 1px solid rgba(101,169,255,0.28); border-radius: 16px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #071426 0%, #102B54 100%); padding: 24px 28px; border-bottom: 1px solid rgba(255,255,255,0.12);">
          <p style="margin: 0; font-size: 12px; font-weight: 700; letter-spacing: 0.14em; text-transform: uppercase; color: #65A9FF;">
            Moses Community Architect
          </p>
          <h1 style="margin: 8px 0 0; font-size: 22px; font-weight: 800; color: #FFFFFF;">
            New Project Inquiry Received
          </h1>
        </div>
        <div style="padding: 28px;">
          <table role="presentation" style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #65A9FF; font-size: 13px; font-weight: 700; width: 150px;">Client Name</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #FFFFFF; font-size: 15px; font-weight: 700;">${escapeHtml(inquiry.fullName)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #65A9FF; font-size: 13px; font-weight: 700;">Client Email</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #FFFFFF; font-size: 15px; font-weight: 700;">
                <a href="mailto:${escapeHtml(inquiry.email)}" style="color: #65A9FF; text-decoration: none;">${escapeHtml(inquiry.email)}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #65A9FF; font-size: 13px; font-weight: 700;">Service Required</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #FFFFFF; font-size: 15px; font-weight: 700;">${escapeHtml(inquiry.service)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #65A9FF; font-size: 13px; font-weight: 700;">Form Source</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #DCE5F0; font-size: 14px; font-weight: 600;">${escapeHtml(inquiry.source)}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #65A9FF; font-size: 13px; font-weight: 700;">Reference ID</td>
              <td style="padding: 10px 0; border-bottom: 1px solid rgba(255,255,255,0.1); color: #DCE5F0; font-size: 14px; font-family: monospace;">${escapeHtml(inquiry.id)}</td>
            </tr>
          </table>

          <div style="background-color: #071426; border: 1px solid rgba(255,255,255,0.1); border-radius: 12px; padding: 18px;">
            <p style="margin: 0 0 8px; font-size: 12px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: #65A9FF;">
              Project Details
            </p>
            <p style="margin: 0; font-size: 15px; line-height: 1.65; color: #DCE5F0; white-space: pre-wrap;">${escapeHtml(inquiry.projectDetails)}</p>
          </div>

          <p style="margin: 20px 0 0; font-size: 13px; color: #DCE5F0;">
            Reply directly to this email to respond to <strong>${escapeHtml(inquiry.fullName)}</strong> (${escapeHtml(inquiry.email)}).
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: config.from,
    to: config.recipientEmail,
    replyTo: `"${safeFullName.replace(/"/g, '')}" <${safeEmail}>`,
    subject: `[Project Inquiry] ${safeService} — ${safeFullName}`,
    text: textBody,
    html: htmlBody,
  });
}

async function persistInquiry(inquiry: ContactInquiry): Promise<void> {
  await fs.mkdir(INQUIRIES_DIR, { recursive: true });
  let existing: ContactInquiry[] = [];
  try {
    const raw = await fs.readFile(INQUIRIES_FILE, 'utf-8');
    const parsed: unknown = JSON.parse(raw);
    if (Array.isArray(parsed)) {
      existing = parsed as ContactInquiry[];
    }
  } catch {
    existing = [];
  }
  existing.push(inquiry);
  await fs.writeFile(INQUIRIES_FILE, JSON.stringify(existing, null, 2), 'utf-8');
}

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '100kb' }));

  app.get('/api/health', async (req, res) => {
    const { config, missing } = getSmtpConfig();
    if (req.query.verify === '1' && config) {
      try {
        await createSmtpTransporter(config).verify();
        res.json({
          status: 'ok',
          service: 'moses-community-architect',
          smtpConfigured: true,
          smtpVerified: true,
          host: config.host,
          port: config.port,
          secure: config.secure,
          passLength: config.pass.length,
        });
        return;
      } catch (err) {
        res.json({
          status: 'ok',
          service: 'moses-community-architect',
          smtpConfigured: true,
          smtpVerified: false,
          host: config.host,
          port: config.port,
          secure: config.secure,
          passLength: config.pass.length,
          smtpError: err instanceof Error ? err.message : 'Verification failed',
        });
        return;
      }
    }
    res.json({
      status: 'ok',
      service: 'moses-community-architect',
      smtpConfigured: Boolean(config),
      missingSmtpVars: missing.length > 0 ? missing : undefined,
    });
  });

  app.post('/api/contact', async (req, res) => {
    try {
      const body = req.body as Record<string, unknown>;
      const fullName = typeof body.fullName === 'string' ? body.fullName.trim() : '';
      const email = typeof body.email === 'string' ? body.email.trim() : '';
      const service = typeof body.service === 'string' ? body.service.trim() : '';
      const projectDetails =
        typeof body.projectDetails === 'string' ? body.projectDetails.trim() : '';
      const source =
        typeof body.source === 'string' && body.source.trim()
          ? body.source.trim()
          : 'Project Inquiry Form';

      if (!fullName || fullName.length < 2) {
        res.status(400).json({ error: 'Please enter your full name.' });
        return;
      }

      if (!email || !isValidEmail(email)) {
        res.status(400).json({ error: 'Please provide a valid email address.' });
        return;
      }

      if (!service) {
        res.status(400).json({ error: 'Please select a service.' });
        return;
      }

      if (!projectDetails || projectDetails.length < 10) {
        res.status(400).json({
          error: 'Please share a few details about your project (at least 10 characters).',
        });
        return;
      }

      const inquiry: ContactInquiry = {
        id: `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
        fullName,
        email,
        service,
        projectDetails,
        source,
        submittedAt: new Date().toISOString(),
      };

      await persistInquiry(inquiry);

      const { config: smtpConfig, missing } = getSmtpConfig();
      let emailSent = false;
      let smtpDeliveryWarning = false;

      if (smtpConfig) {
        try {
          await sendInquiryEmail(smtpConfig, inquiry);
          emailSent = true;
        } catch (smtpError) {
          smtpDeliveryWarning = true;
          const errMessage =
            smtpError instanceof Error ? smtpError.message : 'Unknown SMTP error';
          if (errMessage.includes('535') || errMessage.toLowerCase().includes('invalid login')) {
            console.log(
              `[Contact] Saved inquiry ${inquiry.id} locally (SMTP login pending valid App Password for ${smtpConfig.user}).`
            );
          } else {
            console.log(
              `[Contact] Saved inquiry ${inquiry.id} locally (SMTP delivery skipped: ${errMessage}).`
            );
          }
        }
      } else {
        console.log(
          `[Contact] Saved inquiry ${inquiry.id} locally (awaiting SMTP variables: ${missing.join(', ')}).`
        );
      }

      const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
      if (webhookUrl) {
        try {
          await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(inquiry),
          });
        } catch {
          // Inquiry is already persisted locally.
        }
      }

      res.status(201).json({
        success: true,
        emailSent,
        id: inquiry.id,
        submittedAt: inquiry.submittedAt,
        message: emailSent
          ? `Your project inquiry has been sent directly to ${smtpConfig?.recipientEmail || DEFAULT_RECIPIENT_EMAIL}.`
          : smtpDeliveryWarning
            ? `Your inquiry has been saved, though automated email delivery is currently unavailable. Please click "Open in Email App" below to send a copy directly to ${DEFAULT_RECIPIENT_EMAIL}.`
            : `Your inquiry has been saved. Automated email delivery to ${DEFAULT_RECIPIENT_EMAIL} will activate once SMTP settings are added on the server.`,
      });
    } catch {
      res.status(500).json({
        error: 'Unable to process your inquiry right now. Please email mosesautomations@gmail.com directly.',
      });
    }
  });

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const disableHmr = process.env.DISABLE_HMR === 'true';
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: disableHmr ? false : undefined,
        watch: disableHmr ? null : undefined,
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.join(__dirname, 'dist');
    app.use(express.static(distDir));
    app.use((_req, res) => {
      res.sendFile(path.join(distDir, 'index.html'));
    });
  }

  app.listen(resolvedPort, '0.0.0.0', () => {
    console.log(`Moses Community Architect server running on http://0.0.0.0:${resolvedPort}`);
    const { config: smtpConfig, missing } = getSmtpConfig();
    if (smtpConfig) {
      createSmtpTransporter(smtpConfig)
        .verify()
        .then(() => {
          console.log(
            `SMTP verified (${smtpConfig.host}:${smtpConfig.port}) -> delivering inquiries to ${smtpConfig.recipientEmail}`
          );
        })
        .catch((err) => {
          console.log(
            `[SMTP] Verification paused until credentials are accepted (${err instanceof Error ? err.message : 'auth check failed'}).`
          );
        });
    } else {
      console.log(
        `SMTP delivery inactive until environment variables are configured (${missing.join(', ')}).`
      );
    }
  });
}

startServer();
