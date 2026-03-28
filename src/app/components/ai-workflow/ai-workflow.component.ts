import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface AiCard { titleKey: string; descKey: string; icon: string; accentColor: string; }

@Component({
  selector: 'app-ai-workflow',
  imports: [TranslocoModule],
  template: `
    <section id="ai" class="section ai-section" aria-labelledby="ai-title" *transloco="let t">
      <div class="ai-header">
        <p class="section-label">{{ t('ai.label') }}</p>
        <h2 id="ai-title" class="section-title">{{ t('ai.title') }}</h2>
        <p class="ai-subtitle">{{ t('ai.subtitle') }}</p>
      </div>

      <!-- Feature grid — bento-style -->
      <div class="ai-grid" role="list">
        @for (card of cards; track card.titleKey) {
          <div class="ai-card card" [style.--card-accent]="card.accentColor" role="listitem">
            <div class="ai-card-icon" aria-hidden="true">
              <span [innerHTML]="card.icon"></span>
            </div>
            <h3 class="ai-card-title">{{ t(card.titleKey) }}</h3>
            <p class="ai-card-desc">{{ t(card.descKey) }}</p>
          </div>
        }

        <!-- Wide "workflow" card -->
        <div class="ai-card ai-card--wide card" aria-label="AI workflow pipeline">
          <div class="pipeline" aria-label="AI-accelerated workflow steps">
            @for (step of pipeline; track step.label) {
              <div class="pipeline-step">
                <div class="step-dot" aria-hidden="true" [innerHTML]="step.icon"></div>
                <span class="step-label">{{ step.label }}</span>
              </div>
              @if (!$last) {
                <div class="pipeline-arrow" aria-hidden="true">→</div>
              }
            }
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .ai-section {
      background: linear-gradient(180deg, transparent, rgba(124,58,237,0.04), transparent);
    }
    .ai-header { max-width: 620px; margin-bottom: 2.5rem; }
    .ai-subtitle {
      font-family: var(--font-mono);
      font-size: 0.85rem;
      color: var(--color-muted);
      margin: 0.75rem 0 0;
      letter-spacing: 0.02em;
    }

    .ai-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 1.25rem;
    }
    .ai-card {
      --card-accent: var(--color-violet);
      border-top: 2px solid var(--card-accent);
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }
    .ai-card:hover { border-color: var(--card-accent); }
    .ai-card--wide {
      grid-column: span 4;
      border-top: 1px solid rgba(255,255,255,0.07);
      border-top: none;
      border: 1px solid rgba(124,58,237,0.25);
      background: rgba(124,58,237,0.05);
    }

    .ai-card-icon {
      width: 40px; height: 40px;
      border-radius: 10px;
      background: rgba(124,58,237,0.12);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--card-accent);
      flex-shrink: 0;
    }
    .ai-card-title {
      font-family: var(--font-heading);
      font-size: 1rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.01em;
    }
    .ai-card-desc {
      font-size: 0.855rem;
      color: var(--color-muted);
      line-height: 1.65;
      margin: 0;
    }

    /* Pipeline */
    .pipeline {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.5rem;
    }
    .pipeline-step {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.4rem;
    }
    .step-dot {
      width: 44px; height: 44px;
      border-radius: 12px;
      background: rgba(124,58,237,0.15);
      border: 1px solid rgba(124,58,237,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: var(--color-violet);
    }
    .step-label {
      font-family: var(--font-mono);
      font-size: 0.65rem;
      color: var(--color-muted);
      letter-spacing: 0.05em;
      text-align: center;
      text-transform: uppercase;
    }
    .pipeline-arrow {
      color: rgba(124,58,237,0.4);
      font-size: 1.25rem;
      line-height: 1;
      margin-bottom: 1.2rem;
    }

    @media (max-width: 900px) {
      .ai-grid { grid-template-columns: repeat(2, 1fr); }
      .ai-card--wide { grid-column: span 2; }
      .pipeline { gap: 0.75rem; }
    }
    @media (max-width: 560px) {
      .ai-grid { grid-template-columns: 1fr; }
      .ai-card--wide { grid-column: span 1; }
    }
  `,
})
export class AiWorkflowComponent {
  private botIcon  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="12" cy="5" r="2"/><path d="M12 7v4M8 15h.01M12 15h.01M16 15h.01"/></svg>`;
  private codeIcon = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`;
  private ciIcon   = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>`;
  private eyeIcon  = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>`;

  cards: AiCard[] = [
    { titleKey: 'ai.copilot_title', descKey: 'ai.copilot_desc', icon: this.botIcon,  accentColor: '#1ebbf0' },
    { titleKey: 'ai.claude_title',  descKey: 'ai.claude_desc',  icon: this.codeIcon, accentColor: '#7c3aed' },
    { titleKey: 'ai.cicd_title',    descKey: 'ai.cicd_desc',    icon: this.ciIcon,   accentColor: '#10b981' },
    { titleKey: 'ai.review_title',  descKey: 'ai.review_desc',  icon: this.eyeIcon,  accentColor: '#f59e0b' },
  ];

  private prIcon     = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>`;
  private sparkIcon  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3l1.5 4.5h4.5l-3.75 2.75 1.5 4.75-3.75-2.75-3.75 2.75 1.5-4.75L6 7.5h4.5z"/></svg>`;
  private checkIcon  = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
  private rocketIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/></svg>`;

  pipeline = [
    { label: 'PR Created',   icon: this.prIcon },
    { label: 'AI Suggests',  icon: this.sparkIcon },
    { label: 'Tests Auto',   icon: this.checkIcon },
    { label: 'Deploy',       icon: this.rocketIcon },
  ];
}
