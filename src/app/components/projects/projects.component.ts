import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

interface Project {
  title: string;
  description: string;
  tags: string[];
  url?: string;
  sourceUrl?: string;
  featured?: boolean;
}

@Component({
  selector: 'app-projects',
  imports: [TranslocoModule],
  template: `
    <section id="projects" class="section" aria-labelledby="projects-title" *transloco="let t">
      <div class="divider" aria-hidden="true"></div>
      <p class="section-label">{{ t('projects.label') }}</p>
      <h2 id="projects-title" class="section-title">{{ t('projects.title') }}</h2>

      <div class="projects-grid" role="list">
        @for (project of projects; track project.title) {
          <article
            class="project-card card"
            [class.featured]="project.featured"
            role="listitem"
            [attr.aria-label]="project.title"
          >
            <!-- Accent line -->
            <div class="card-accent" aria-hidden="true"></div>

            <div class="project-content">
              <h3 class="project-title">{{ project.title }}</h3>
              <p class="project-desc">{{ project.description }}</p>
              <div class="project-tags" role="list" aria-label="Technologies used">
                @for (tag of project.tags; track tag) {
                  <span class="tag" role="listitem">{{ tag }}</span>
                }
              </div>
            </div>

            <div class="project-actions">
              @if (project.url) {
                <a
                  [href]="project.url"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline project-btn"
                  [attr.aria-label]="t('projects.view') + ' ' + project.title"
                >
                  {{ t('projects.view') }}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
                    <polyline points="15 3 21 3 21 9"/>
                    <line x1="10" y1="14" x2="21" y2="3"/>
                  </svg>
                </a>
              }
              @if (project.sourceUrl) {
                <a
                  [href]="project.sourceUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="btn-outline project-btn"
                  [attr.aria-label]="t('projects.source') + ' ' + project.title"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
                    <path d="M9 18c-4.51 2-5-2-7-2"/>
                  </svg>
                  {{ t('projects.source') }}
                </a>
              }
            </div>
          </article>
        }
      </div>
    </section>
  `,
  styles: `
    .divider {
      width: 1px;
      height: 80px;
      background: linear-gradient(to bottom, transparent, rgba(30,187,240,0.4), transparent);
      margin: 0 auto 3rem;
    }

    .projects-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1.5rem;
      margin-top: 2.5rem;
    }

    .project-card {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      gap: 1.25rem;
      position: relative;
      overflow: hidden;
    }
    .project-card.featured {
      grid-column: span 2;
      border-color: rgba(30,187,240,0.25);
      background: rgba(30,187,240,0.03);
    }
    .project-card.featured:hover { border-color: var(--color-cyan); }

    .card-accent {
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, var(--color-cyan), var(--color-violet));
      opacity: 0;
      transition: opacity 0.25s ease;
    }
    .project-card:hover .card-accent { opacity: 1; }

    .project-content { display: flex; flex-direction: column; gap: 0.6rem; flex: 1; }
    .project-title {
      font-family: var(--font-heading);
      font-size: 1.05rem;
      font-weight: 600;
      margin: 0;
      letter-spacing: -0.01em;
    }
    .project-desc {
      font-size: 0.86rem;
      color: var(--color-muted);
      line-height: 1.65;
      margin: 0;
    }
    .project-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.4rem;
      margin-top: 0.25rem;
    }
    .tag {
      font-family: var(--font-mono);
      font-size: 0.68rem;
      background: rgba(30,187,240,0.07);
      border: 1px solid rgba(30,187,240,0.18);
      color: var(--color-cyan);
      padding: 0.2rem 0.55rem;
      border-radius: 100px;
    }

    .project-actions { display: flex; gap: 0.75rem; flex-wrap: wrap; }
    .project-btn {
      font-size: 0.8rem;
      padding: 0.45rem 0.9rem;
      gap: 0.4rem;
    }

    @media (max-width: 900px) {
      .projects-grid { grid-template-columns: repeat(2, 1fr); }
      .project-card.featured { grid-column: span 2; }
    }
    @media (max-width: 560px) {
      .projects-grid { grid-template-columns: 1fr; }
      .project-card.featured { grid-column: span 1; }
    }
  `,
})
export class ProjectsComponent {
  projects: Project[] = [
    {
      title: 'Enterprise Angular Platform',
      description: 'Large-scale B2B SPA with NgRx, micro-frontend architecture, and custom CI/CD pipeline. Serving 10,000+ daily users.',
      tags: ['Angular', 'NgRx', 'TypeScript', 'Docker'],
      featured: true,
    },
    {
      title: 'DevOps Automation Suite',
      description: 'GitHub Actions workflows for automated testing, Docker builds, and zero-downtime Kubernetes deployments.',
      tags: ['GitHub Actions', 'Docker', 'Kubernetes', 'Helm'],
      sourceUrl: '#',
    },
    {
      title: 'webben-2026',
      description: 'This very site — built with Analog.js, Angular 21, Tailwind v4, and fully AI-accelerated workflow.',
      tags: ['Analog.js', 'Angular', 'Tailwind v4', 'AI'],
      sourceUrl: 'https://github.com',
    },
    {
      title: 'Nx Monorepo Template',
      description: 'Production-ready Nx workspace template with shared libs, code gen, lint rules and CD automation.',
      tags: ['Nx', 'Angular', 'TypeScript', 'ESLint'],
      sourceUrl: '#',
    },
    {
      title: 'Real-time Dashboard',
      description: 'Angular + RxJS powered live metrics dashboard with WebSocket integration and D3.js charts.',
      tags: ['Angular', 'RxJS', 'WebSocket', 'D3.js'],
    },
  ];
}
