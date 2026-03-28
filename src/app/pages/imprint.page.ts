import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-imprint',
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
        <h1>Impressum</h1>
        <h2>Angaben gemäß § 5 TMG</h2>
        <p>
          Benjamin Geißler<br>
          Magdeburg, Deutschland<br>
          E-Mail: <a href="mailto:info@web-ben.de">info@web-ben.de</a>
        </p>
        <h2>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
        <p>Benjamin Geißler, Magdeburg</p>
        <h2>Haftungsausschluss</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Inhalte
          externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich.
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
export default class ImprintPage implements OnInit {
  private seo = inject(SeoService);
  ngOnInit() {
    this.seo.set({
      title: 'Impressum | webben',
      description: 'Impressum von Benjamin Geißler, Senior Angular & DevOps Engineer, Magdeburg.',
      url: 'https://web-ben.de/imprint',
    });
  }
}
