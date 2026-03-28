import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-contact',
  imports: [TranslocoModule],
  template: `
    <section id="contact" class="section contact-section" aria-labelledby="contact-title" *transloco="let t">
      <div class="contact-inner">
        <p class="section-label">{{ t('contact.label') }}</p>
        <h2 id="contact-title" class="contact-title">{{ t('contact.title') }}</h2>
        <p class="contact-subtitle">{{ t('contact.subtitle') }}</p>

        <a
          href="mailto:info@web-ben.de"
          class="btn-primary email-btn"
          aria-label="{{ t('contact.email_cta') }}"
        >
          {{ t('contact.email_cta') }}
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>

        <!-- Social links -->
        <div class="social-links" role="list" aria-label="Social media links">
          @for (link of socialLinks; track link.label) {
            <a
              [href]="link.url"
              target="_blank"
              rel="noopener noreferrer"
              class="social-link"
              role="listitem"
              [attr.aria-label]="link.label"
            >
              <span [innerHTML]="link.icon" aria-hidden="true"></span>
              <span>{{ link.label }}</span>
            </a>
          }
        </div>
      </div>

      <!-- Background decoration -->
      <div class="contact-glow" aria-hidden="true"></div>
    </section>
  `,
  styles: `
    .contact-section {
      position: relative;
      text-align: center;
      overflow: hidden;
      padding-bottom: 8rem;
    }
    .contact-inner { position: relative; z-index: 1; }

    .contact-title {
      font-family: var(--font-heading);
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      margin: 0 0 1rem;
      background: linear-gradient(135deg, #f0f0f5 20%, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }
    .contact-subtitle {
      font-size: 1rem;
      color: var(--color-muted);
      max-width: 480px;
      margin: 0 auto 2.5rem;
      line-height: 1.7;
    }

    .email-btn {
      font-size: 1rem;
      padding: 0.85rem 2rem;
    }

    .social-links {
      display: flex;
      gap: 1rem;
      justify-content: center;
      margin-top: 2.5rem;
      flex-wrap: wrap;
    }
    .social-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.6rem 1.1rem;
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 8px;
      color: var(--color-muted);
      font-size: 0.875rem;
      font-weight: 500;
      text-decoration: none;
      transition: border-color 0.2s ease, color 0.2s ease, transform 0.2s ease;
      cursor: pointer;
      min-height: 44px;
      background: rgba(255,255,255,0.02);
    }
    .social-link:hover {
      border-color: var(--color-cyan);
      color: var(--color-text);
      transform: translateY(-2px);
      text-decoration: none;
    }
    .social-link span:first-child {
      display: flex;
      align-items: center;
    }

    .contact-glow {
      position: absolute;
      bottom: -80px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 300px;
      background: radial-gradient(ellipse, rgba(30,187,240,0.08), transparent 70%);
      pointer-events: none;
    }
  `,
})
export class ContactComponent {
  private githubIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>`;
  private linkedinIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>`;
  private xingIcon = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M 17.52 2 L 13.44 9.08 L 19.36 22 L 22 22 L 16.08 9.08 L 20.16 2 Z M 6.48 6 L 2 6 L 5.88 13.04 L 3.2 18 L 6.96 18 L 9.76 13.04 Z"/></svg>`;

  socialLinks = [
    { label: 'GitHub',   url: 'https://github.com',   icon: this.githubIcon   },
    { label: 'LinkedIn', url: 'https://linkedin.com', icon: this.linkedinIcon },
    { label: 'XING',     url: 'https://xing.com',     icon: this.xingIcon     },
  ];
}
