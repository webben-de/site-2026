import { Component } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-about',
  imports: [TranslocoModule],
  template: `
    <section id="about" class="section" aria-labelledby="about-title" *transloco="let t">
      <p class="section-label">{{ t('about.label') }}</p>
      <div class="about-grid">
        <!-- Text column -->
        <div class="about-text">
          <h2 id="about-title" class="section-title">{{ t('about.title') }}</h2>
          <p class="body-text">{{ t('about.body1') }}</p>
          <p class="body-text">{{ t('about.body2') }}</p>

          <!-- Tech tags -->
          <div class="tech-tags" role="list" aria-label="Technologies">
            @for (tag of techTags; track tag) {
              <span class="tag" role="listitem">{{ tag }}</span>
            }
          </div>
        </div>

        <!-- Stats column -->
        <div class="about-stats" aria-label="Key statistics">
          @for (stat of stats; track stat.value) {
            <div class="stat-card card">
              <span class="stat-value">{{ stat.value }}</span>
              <span class="stat-label">{{ t(stat.labelKey) }}</span>
            </div>
          }

          <!-- Avatar placeholder -->
          <div class="avatar-card card" aria-label="Profile photo placeholder">
            <div class="avatar-circle" aria-hidden="true">BG</div>
            <div class="avatar-info">
              <strong>Benjamin Geißler</strong>
              <span>Magdeburg, DE</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: `
    .about-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr;
      gap: 4rem;
      align-items: start;
    }
    .about-text { }
    .body-text {
      color: var(--color-muted);
      line-height: 1.75;
      margin: 0 0 1.25rem;
      font-size: 1rem;
    }
    .tech-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      margin-top: 1.75rem;
    }
    .tag {
      font-family: var(--font-mono);
      font-size: 0.72rem;
      background: rgba(30,187,240,0.08);
      border: 1px solid rgba(30,187,240,0.2);
      color: var(--color-cyan);
      padding: 0.3rem 0.7rem;
      border-radius: 100px;
      letter-spacing: 0.03em;
    }

    .about-stats {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    .stat-card {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }
    .stat-value {
      font-family: var(--font-heading);
      font-size: 2.5rem;
      font-weight: 700;
      letter-spacing: -0.04em;
      color: var(--color-cyan);
      line-height: 1;
    }
    .stat-label {
      font-size: 0.8rem;
      color: var(--color-muted);
      font-weight: 500;
      text-transform: uppercase;
      letter-spacing: 0.06em;
    }

    .avatar-card {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .avatar-circle {
      width: 52px; height: 52px;
      border-radius: 50%;
      background: linear-gradient(135deg, var(--color-cyan), var(--color-violet));
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-heading);
      font-weight: 700;
      font-size: 1rem;
      color: #fff;
      flex-shrink: 0;
    }
    .avatar-info {
      display: flex;
      flex-direction: column;
      gap: 0.15rem;
    }
    .avatar-info strong { font-size: 0.9rem; font-weight: 600; }
    .avatar-info span   { font-size: 0.78rem; color: var(--color-muted); }

    @media (max-width: 768px) {
      .about-grid { grid-template-columns: 1fr; gap: 2.5rem; }
      .about-stats { flex-direction: row; flex-wrap: wrap; }
      .stat-card { flex: 1; min-width: 120px; }
      .avatar-card { flex: 100%; }
    }
  `,
})
export class AboutComponent {
  techTags = ['Angular', 'TypeScript', 'RxJS', 'NgRx', 'Nx', 'Node.js', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'];

  stats = [
    { value: '10+',  labelKey: 'about.years_label' },
    { value: '30+',  labelKey: 'about.projects_label' },
    { value: '5+',   labelKey: 'about.companies_label' },
  ];
}
