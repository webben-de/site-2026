import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-privacy',
  imports: [RouterLink],
  template: `
    <main class="legal-page" id="main-content">
      <div class="section">
        <a routerLink="/" class="back-link" aria-label="Back to home">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path d="M19 12H5M12 5l-7 7 7 7"/>
          </svg>
          Zurück
        </a>
        <h1>Datenschutzerklärung</h1>

        <h2>1. Datenschutz auf einen Blick</h2>
        <p>
          Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen
          Daten passiert, wenn Sie diese Website besuchen.
        </p>

        <h2>2. Verantwortlicher</h2>
        <p>
          Verantwortlicher für die Datenverarbeitung auf dieser Website:<br>
          Benjamin Geißler, Magdeburg<br>
          E-Mail: <a href="mailto:info@web-ben.de">info@web-ben.de</a>
        </p>

        <h2>3. Datenerfassung auf dieser Website</h2>
        <p>
          Diese Website erhebt keine personenbezogenen Daten. Es werden keine Cookies gesetzt und keine
          Tracking-Technologien eingesetzt.
        </p>

        <h2>4. Ihre Rechte</h2>
        <p>
          Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten
          personenbezogenen Daten, deren Herkunft und Empfänger sowie den Zweck der Datenverarbeitung.
          Bitte wenden Sie sich dazu per E-Mail an uns.
        </p>
      </div>
    </main>
  `,
  styles: `
    .legal-page { padding-top: 64px; }
    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      color: var(--color-muted);
      font-size: 0.875rem;
      text-decoration: none;
      margin-bottom: 2rem;
      transition: color 0.2s ease;
      cursor: pointer;
      min-height: 44px;
    }
    .back-link:hover { color: var(--color-cyan); text-decoration: none; }
    h1 {
      font-family: var(--font-heading);
      font-size: 2.5rem;
      letter-spacing: -0.03em;
      margin: 0 0 2rem;
    }
    h2 { font-size: 1.1rem; margin: 1.75rem 0 0.5rem; color: var(--color-muted); }
    p  { line-height: 1.7; color: var(--color-muted); }
    a  { color: var(--color-cyan); }
  `,
})
export default class PrivacyPage implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.set({
      title: 'Datenschutz | webben',
      description: 'Datenschutzerklärung von webben — Benjamin Geißler, Magdeburg.',
      url: 'https://web-ben.de/privacy',
    });
  }
}
