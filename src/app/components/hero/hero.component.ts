import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-hero',
  imports: [TranslocoModule],
  template: `
    <section class="hero" aria-label="Hero" *transloco="let t">
      <!-- Background grid -->
      <div class="hero-grid" aria-hidden="true"></div>

      <!-- Cyan glow orb -->
      <div class="glow-orb cyan" aria-hidden="true"></div>
      <div class="glow-orb violet" aria-hidden="true"></div>

      <div class="hero-content animate-fade-up">
        <!-- Location chip -->
        <div class="location-chip">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {{ t('hero.location') }}
        </div>

        <!-- Greeting + Name -->
        <p class="greeting delay-100 animate-fade-up">{{ t('hero.greeting') }}</p>
        <h1 class="hero-name delay-200 animate-fade-up">
          {{ t('hero.name') }}
        </h1>

        <!-- Title with typewriter effect -->
        <div class="hero-title-wrap delay-300 animate-fade-up">
          <span class="hero-title">{{ t('hero.title') }}</span>
        </div>

        <!-- Tagline -->
        <p class="tagline delay-400 animate-fade-up">{{ t('hero.tagline') }}</p>

        <!-- CTAs -->
        <div class="cta-group delay-400 animate-fade-up">
          <a href="#projects" class="btn-primary" aria-label="{{ t('hero.cta_work') }}">
            {{ t('hero.cta_work') }}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
          <a href="#contact" class="btn-outline" aria-label="{{ t('hero.cta_contact') }}">
            {{ t('hero.cta_contact') }}
          </a>
        </div>
      </div>

      <!-- Terminal window -->
      <div class="terminal delay-300 animate-fade-up" aria-label="Code terminal" role="img">
        <div class="terminal-bar" aria-hidden="true">
          <span class="dot red"></span>
          <span class="dot yellow"></span>
          <span class="dot green"></span>
          <span class="terminal-title">~/webben-2026</span>
        </div>
        <div class="terminal-body">
          @for (line of visibleLines(); track $index) {
            <div class="terminal-line">
              <span class="prompt" aria-hidden="true"></span>
              <span>{{ line }}</span>
            </div>
          }
          <div class="terminal-line" aria-hidden="true">
            <span class="prompt"></span>
            <span class="cursor-blink">█</span>
          </div>
        </div>
      </div>

      <!-- Scroll hint -->
      <div class="scroll-hint" aria-hidden="true">
        <div class="scroll-line"></div>
      </div>
    </section>
  `,
  styles: `
    .hero {
      position: relative;
      min-height: 100dvh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;
      gap: 4rem;
      max-width: 1100px;
      margin: 0 auto;
      padding: 6rem 1.5rem 4rem;
      overflow: hidden;
    }

    /* ── Background ─────────────────────── */
    .hero-grid {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(30,187,240,0.04) 1px, transparent 1px),
        linear-gradient(90deg, rgba(30,187,240,0.04) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
      mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black, transparent);
    }
    .glow-orb {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      filter: blur(80px);
      opacity: 0.18;
    }
    .glow-orb.cyan {
      width: 500px; height: 500px;
      background: var(--color-cyan);
      top: -100px; left: -100px;
    }
    .glow-orb.violet {
      width: 400px; height: 400px;
      background: var(--color-violet);
      bottom: -80px; right: -60px;
    }

    /* ── Content side ───────────────────── */
    .hero-content {
      position: relative;
      z-index: 1;
    }

    .location-chip {
      display: inline-flex;
      align-items: center;
      gap: 0.4rem;
      font-family: var(--font-mono);
      font-size: 0.7rem;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--color-cyan);
      background: rgba(30,187,240,0.08);
      border: 1px solid rgba(30,187,240,0.2);
      border-radius: 100px;
      padding: 0.3rem 0.9rem;
      margin-bottom: 1.25rem;
    }

    .greeting {
      font-family: var(--font-sans);
      font-size: 1.1rem;
      color: var(--color-muted);
      margin: 0 0 0.25rem;
      font-weight: 400;
    }

    /* Exaggerated Minimalism: oversized hero name */
    .hero-name {
      font-family: var(--font-heading);
      font-size: clamp(2.5rem, 6vw, 5rem);
      font-weight: 700;
      letter-spacing: -0.04em;
      line-height: 1.05;
      margin: 0 0 0.75rem;
      color: var(--color-text);
      background: linear-gradient(135deg, #f0f0f5 30%, #94a3b8);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .hero-title-wrap {
      margin-bottom: 1.25rem;
    }
    .hero-title {
      font-family: var(--font-heading);
      font-size: clamp(1rem, 2.2vw, 1.35rem);
      font-weight: 500;
      color: var(--color-cyan);
      letter-spacing: -0.01em;
    }

    .tagline {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--color-muted);
      letter-spacing: 0.02em;
      margin: 0 0 2.25rem;
    }

    .cta-group {
      display: flex;
      gap: 1rem;
      flex-wrap: wrap;
      align-items: center;
    }

    /* ── Terminal ───────────────────────── */
    .terminal {
      position: relative;
      z-index: 1;
      background: #0d0d12;
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 24px 64px rgba(0,0,0,0.5), 0 0 0 1px rgba(30,187,240,0.06);
      font-family: var(--font-mono);
    }
    .terminal-bar {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.75rem 1rem;
      background: rgba(255,255,255,0.03);
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .dot {
      width: 12px; height: 12px;
      border-radius: 50%;
    }
    .dot.red    { background: #ff5f57; }
    .dot.yellow { background: #febc2e; }
    .dot.green  { background: #28c840; }
    .terminal-title {
      font-size: 0.75rem;
      color: rgba(255,255,255,0.3);
      margin-left: 0.5rem;
    }
    .terminal-body {
      padding: 1.25rem 1.5rem;
      min-height: 160px;
    }
    .terminal-line {
      display: flex;
      align-items: baseline;
      gap: 0.5rem;
      font-size: 0.82rem;
      line-height: 2;
      color: #e0e0e0;
    }
    .prompt::before {
      content: '›';
      color: var(--color-cyan);
      font-size: 1rem;
    }

    /* ── Scroll hint ────────────────────── */
    .scroll-hint {
      position: absolute;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .scroll-line {
      width: 1px;
      height: 48px;
      background: linear-gradient(to bottom, rgba(30,187,240,0.6), transparent);
      animation: scrollPulse 2s ease-in-out infinite;
    }
    @keyframes scrollPulse {
      0%,100% { opacity: 0.4; transform: scaleY(1); }
      50%      { opacity: 1;   transform: scaleY(1.15); }
    }

    /* ── Responsive ─────────────────────── */
    @media (max-width: 900px) {
      .hero {
        grid-template-columns: 1fr;
        text-align: center;
        gap: 3rem;
        padding-top: 7rem;
      }
      .hero-name { font-size: clamp(2.2rem, 10vw, 3.5rem); }
      .location-chip { margin: 0 auto 1.25rem; }
      .cta-group { justify-content: center; }
      .scroll-hint { display: none; }
    }
    @media (max-width: 480px) {
      .terminal { font-size: 0.78rem; }
      .cta-group { flex-direction: column; align-items: stretch; text-align: center; }
    }
  `,
})
export class HeroComponent implements OnInit, OnDestroy {
  private terminalLines = [
    '$ ng new webben-2026 --standalone --ssr',
    '$ docker compose up -d',
    '$ copilot: suggest improvements...',
    '✓ Deployed to production',
  ];

  visibleLines = signal<string[]>([]);
  private timeouts: ReturnType<typeof setTimeout>[] = [];

  ngOnInit() {
    this.terminalLines.forEach((line, i) => {
      const t = setTimeout(() => {
        this.visibleLines.update(l => [...l, line]);
      }, 600 + i * 900);
      this.timeouts.push(t);
    });
  }

  ngOnDestroy() {
    this.timeouts.forEach(t => clearTimeout(t));
  }
}
