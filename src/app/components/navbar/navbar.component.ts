import { Component, HostListener, inject, signal } from '@angular/core';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
  selector: 'app-navbar',
  imports: [TranslocoModule],
  template: `
    <nav
      class="navbar"
      [class.scrolled]="scrolled()"
      [class.menu-open]="menuOpen()"
      role="navigation"
      aria-label="Main navigation"
    >
      <div class="navbar-inner">
        <!-- Logo -->
        <a class="logo" href="/" aria-label="webben home">
          <span class="logo-bracket">&lt;</span>webben<span class="logo-bracket">/&gt;</span>
        </a>

        <!-- Desktop nav links -->
        <ul class="nav-links" role="list">
          @for (link of navLinks; track link.key) {
            <li>
              <a
                [href]="link.href"
                class="nav-link"
                [class.active]="activeSection() === link.key"
                (click)="closeMenu()"
              >
                {{ link.label | transloco }}
              </a>
            </li>
          }
        </ul>

        <!-- Right controls -->
        <div class="nav-actions">
          <!-- Language switcher -->
          <button
            class="lang-btn"
            (click)="toggleLang()"
            [attr.aria-label]="'Switch to ' + (currentLang() === 'de' ? 'English' : 'German')"
            aria-live="polite"
          >
            <span [class.active]="currentLang() === 'de'">DE</span>
            <span class="lang-sep">/</span>
            <span [class.active]="currentLang() === 'en'">EN</span>
          </button>

          <!-- Mobile hamburger -->
          <button
            class="hamburger"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <span [class.top-open]="menuOpen()"></span>
            <span [class.mid-open]="menuOpen()"></span>
            <span [class.bot-open]="menuOpen()"></span>
          </button>
        </div>
      </div>

      <!-- Mobile menu -->
      @if (menuOpen()) {
        <div class="mobile-menu" id="mobile-menu" role="dialog" aria-label="Mobile navigation">
          @for (link of navLinks; track link.key) {
            <a [href]="link.href" class="mobile-link" (click)="closeMenu()">
              {{ link.label | transloco }}
            </a>
          }
          <button class="lang-btn mobile-lang" (click)="toggleLang()">
            <span [class.active]="currentLang() === 'de'">DE</span>
            <span class="lang-sep">/</span>
            <span [class.active]="currentLang() === 'en'">EN</span>
          </button>
        </div>
      }
    </nav>
  `,
  styles: `
    .navbar {
      position: fixed;
      top: 0; left: 0; right: 0;
      z-index: 100;
      padding: 0 1.5rem;
      transition: background 0.3s ease, box-shadow 0.3s ease;
    }
    .navbar.scrolled {
      background: rgba(10,10,15,0.88);
      backdrop-filter: blur(14px);
      -webkit-backdrop-filter: blur(14px);
      box-shadow: 0 1px 0 rgba(255,255,255,0.07);
    }
    .navbar-inner {
      max-width: 1100px;
      margin: 0 auto;
      height: 64px;
      display: flex;
      align-items: center;
      gap: 2rem;
    }
    .logo {
      font-family: var(--font-mono);
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--color-text);
      text-decoration: none;
      white-space: nowrap;
      cursor: pointer;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
    .logo:hover { text-decoration: none; opacity: 0.85; }
    .logo-bracket { color: var(--color-cyan); }

    .nav-links {
      display: flex;
      list-style: none;
      margin: 0; padding: 0;
      gap: 0.1rem;
      flex: 1;
    }
    .nav-link {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-muted);
      padding: 0.5rem 0.75rem;
      border-radius: 6px;
      text-decoration: none;
      transition: color 0.2s ease, background 0.2s ease;
      cursor: pointer;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
    .nav-link:hover { color: var(--color-text); background: rgba(255,255,255,0.05); text-decoration: none; }
    .nav-link.active { color: var(--color-cyan); }

    .nav-actions { display: flex; align-items: center; gap: 0.75rem; margin-left: auto; }

    .lang-btn {
      background: rgba(255,255,255,0.04);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 6px;
      color: var(--color-muted);
      font-family: var(--font-mono);
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      padding: 0.35rem 0.65rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      gap: 0.25rem;
      transition: border-color 0.2s ease, color 0.2s ease;
      min-height: 44px;
      min-width: 44px;
      justify-content: center;
    }
    .lang-btn:hover { border-color: var(--color-cyan); color: var(--color-text); }
    .lang-btn .active { color: var(--color-cyan); }
    .lang-sep { opacity: 0.35; }

    .hamburger {
      display: none;
      flex-direction: column;
      justify-content: center;
      gap: 5px;
      background: none;
      border: none;
      cursor: pointer;
      padding: 0.5rem;
      min-height: 44px;
      min-width: 44px;
      align-items: center;
    }
    .hamburger span {
      display: block;
      width: 22px;
      height: 2px;
      background: var(--color-text);
      border-radius: 2px;
      transition: transform 0.25s ease, opacity 0.25s ease;
    }
    .hamburger .top-open  { transform: translateY(7px) rotate(45deg); }
    .hamburger .mid-open  { opacity: 0; }
    .hamburger .bot-open  { transform: translateY(-7px) rotate(-45deg); }

    .mobile-menu {
      display: flex;
      flex-direction: column;
      padding: 0.5rem 0 1.5rem;
      background: rgba(10,10,15,0.97);
      backdrop-filter: blur(14px);
      border-top: 1px solid rgba(255,255,255,0.07);
      animation: slideDown 0.2s ease;
    }
    @keyframes slideDown {
      from { opacity: 0; transform: translateY(-8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    .mobile-link {
      padding: 0.85rem 1.5rem;
      color: var(--color-text);
      font-weight: 500;
      font-size: 0.95rem;
      text-decoration: none;
      transition: color 0.2s ease, background 0.2s ease;
      cursor: pointer;
      min-height: 44px;
      display: flex;
      align-items: center;
    }
    .mobile-link:hover { color: var(--color-cyan); background: rgba(30,187,240,0.05); text-decoration: none; }
    .mobile-lang { margin: 0.5rem 1rem 0; align-self: flex-start; }

    @media (max-width: 768px) {
      .nav-links { display: none; }
      .hamburger { display: flex; }
      .lang-btn:not(.mobile-lang) { display: none; }
    }
  `,
})
export class NavbarComponent {
  private transloco = inject(TranslocoService);
  scrolled = signal(false);
  menuOpen = signal(false);
  activeSection = signal('');
  currentLang = signal(this.transloco.getActiveLang());

  navLinks = [
    { key: 'about',    label: 'nav.about',    href: '#about' },
    { key: 'skills',   label: 'nav.skills',   href: '#skills' },
    { key: 'ai',       label: 'nav.ai',       href: '#ai' },
    { key: 'projects', label: 'nav.projects', href: '#projects' },
    { key: 'contact',  label: 'nav.contact',  href: '#contact' },
  ];

  @HostListener('window:scroll')
  onScroll() {
    this.scrolled.set(window.scrollY > 20);
    this.updateActiveSection();
  }

  private updateActiveSection() {
    const sections = ['contact', 'projects', 'ai', 'skills', 'about'];
    for (const id of sections) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 80) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('');
  }

  toggleMenu() { this.menuOpen.update(v => !v); }
  closeMenu()  { this.menuOpen.set(false); }

  toggleLang() {
    const next = this.currentLang() === 'de' ? 'en' : 'de';
    this.transloco.setActiveLang(next);
    this.currentLang.set(next);
  }
}
