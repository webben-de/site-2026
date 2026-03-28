import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  imports: [TranslocoModule, RouterLink],
  template: `
    <footer class="footer" role="contentinfo" *transloco="let t">
      <div class="footer-inner">
        <div class="footer-left">
          <a class="footer-logo" href="/" aria-label="webben home">
            <span class="bracket">&lt;</span>webben<span class="bracket">/&gt;</span>
          </a>
          <p class="footer-copy">
            © {{ year }} Benjamin Geißler. {{ t('footer.rights') }}
          </p>
        </div>

        <div class="footer-right">
          <span class="made-with">
            {{ t('footer.made_with') }}
            <a href="https://analogjs.org" target="_blank" rel="noopener noreferrer" aria-label="Analog.js">Analog.js</a>
            {{ t('footer.and') }}
            <a href="https://angular.dev" target="_blank" rel="noopener noreferrer" aria-label="Angular">Angular</a>
          </span>
          <nav aria-label="Footer navigation">
            <a routerLink="/imprint" class="footer-link">{{ t('footer.imprint') }}</a>
            <span class="sep" aria-hidden="true">·</span>
            <a routerLink="/privacy" class="footer-link">{{ t('footer.privacy') }}</a>
          </nav>
        </div>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      border-top: 1px solid rgba(255,255,255,0.06);
      padding: 2rem 1.5rem;
    }
    .footer-inner {
      max-width: 1100px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
    }
    .footer-left { display: flex; flex-direction: column; gap: 0.3rem; }
    .footer-logo {
      font-family: var(--font-mono);
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--color-text);
      text-decoration: none;
      cursor: pointer;
    }
    .footer-logo:hover { text-decoration: none; opacity: 0.8; }
    .bracket { color: var(--color-cyan); }
    .footer-copy {
      font-size: 0.75rem;
      color: var(--color-muted);
      margin: 0;
    }
    .footer-right {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      gap: 0.4rem;
    }
    .made-with {
      font-size: 0.75rem;
      color: var(--color-muted);
    }
    .made-with a {
      color: var(--color-cyan);
      font-weight: 500;
    }
    .made-with a:hover { text-decoration: underline; }
    nav { display: flex; align-items: center; gap: 0.5rem; }
    .footer-link {
      font-size: 0.75rem;
      color: var(--color-muted);
      text-decoration: none;
      transition: color 0.2s ease;
      cursor: pointer;
      min-height: 44px;
      display: inline-flex;
      align-items: center;
    }
    .footer-link:hover { color: var(--color-cyan); text-decoration: none; }
    .sep { color: var(--color-muted); opacity: 0.4; font-size: 0.75rem; }

    @media (max-width: 560px) {
      .footer-inner { flex-direction: column; align-items: flex-start; }
      .footer-right { align-items: flex-start; }
    }
  `,
})
export class FooterComponent {
  year = new Date().getFullYear();
}
