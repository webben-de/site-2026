import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface Skill { name: string; icon: string; }
interface SkillGroup { titleKey: string; accentColor: string; skills: Skill[]; }

@Component({
  selector: 'app-skills',
  imports: [TranslocoModule],
  template: `
    <section id="skills" class="section skills-section" aria-labelledby="skills-title" *transloco="let t">
      <!-- Divider line -->
      <div class="divider" aria-hidden="true"></div>

      <p class="section-label">{{ t('skills.label') }}</p>
      <h2 id="skills-title" class="section-title">{{ t('skills.title') }}</h2>

      <div class="skills-grid">
        @for (group of skillGroups; track group.titleKey) {
          <div class="skill-group card" [style.--accent]="group.accentColor">
            <h3 class="group-title">{{ t(group.titleKey) }}</h3>
            <div class="skill-list" role="list">
              @for (skill of group.skills; track skill.name) {
                <div class="skill-item" role="listitem">
                  <span class="skill-icon" [innerHTML]="skill.icon" aria-hidden="true"></span>
                  <span class="skill-name">{{ skill.name }}</span>
                </div>
              }
            </div>
          </div>
        }
      </div>
    </section>
  `,
  styles: `
    .skills-section { position: relative; }
    .divider {
      width: 1px;
      height: 80px;
      background: linear-gradient(to bottom, transparent, rgba(30,187,240,0.4), transparent);
      margin: 0 auto 3rem;
    }

    .skills-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 2.5rem;
    }

    .skill-group {
      --accent: var(--color-cyan);
      border-top: 2px solid var(--accent);
    }
    .skill-group:hover { border-color: var(--accent); }

    .group-title {
      font-family: var(--font-mono);
      font-size: 0.7rem;
      text-transform: uppercase;
      letter-spacing: 0.12em;
      color: var(--accent);
      margin: 0 0 1.25rem;
      font-weight: 600;
    }

    .skill-list {
      display: flex;
      flex-direction: column;
      gap: 0.6rem;
    }
    .skill-item {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .skill-icon {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 20px;
      height: 20px;
      flex-shrink: 0;
      color: var(--accent);
      opacity: 0.8;
    }
    .skill-name {
      font-size: 0.875rem;
      font-weight: 500;
      color: var(--color-text);
    }

    @media (max-width: 900px) { .skills-grid { grid-template-columns: 1fr 1fr; } }
    @media (max-width: 560px) { .skills-grid { grid-template-columns: 1fr; } }
  `,
})
export class SkillsComponent {
  private checkIcon = `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;

  skillGroups: SkillGroup[] = [
    {
      titleKey: 'skills.frontend',
      accentColor: 'var(--color-cyan)',
      skills: [
        { name: 'Angular 19+', icon: this.checkIcon },
        { name: 'TypeScript 5.x', icon: this.checkIcon },
        { name: 'RxJS', icon: this.checkIcon },
        { name: 'NgRx / Signals', icon: this.checkIcon },
        { name: 'Nx Monorepo', icon: this.checkIcon },
        { name: 'Analog.js (SSR/SSG)', icon: this.checkIcon },
        { name: 'Tailwind CSS v4', icon: this.checkIcon },
      ],
    },
    {
      titleKey: 'skills.devops',
      accentColor: 'var(--color-violet)',
      skills: [
        { name: 'Docker / Compose', icon: this.checkIcon },
        { name: 'Kubernetes & Helm', icon: this.checkIcon },
        { name: 'GitHub Actions', icon: this.checkIcon },
        { name: 'Terraform', icon: this.checkIcon },
        { name: 'Linux / Nginx', icon: this.checkIcon },
        { name: 'CI/CD Pipelines', icon: this.checkIcon },
        { name: 'Node.js / Express', icon: this.checkIcon },
      ],
    },
    {
      titleKey: 'skills.ai_tools',
      accentColor: '#10b981',
      skills: [
        { name: 'GitHub Copilot', icon: this.checkIcon },
        { name: 'Claude / Cursor', icon: this.checkIcon },
        { name: 'AI Code Review', icon: this.checkIcon },
        { name: 'Prompt Engineering', icon: this.checkIcon },
        { name: 'AI in CI/CD', icon: this.checkIcon },
        { name: 'LLM API Integration', icon: this.checkIcon },
      ],
    },
  ];
}
