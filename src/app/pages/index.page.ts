import { Component, inject, OnInit } from '@angular/core';
import { TranslocoModule } from '@jsverse/transloco';
import { HeroComponent } from '../components/hero/hero.component';
import { AboutComponent } from '../components/about/about.component';
import { SkillsComponent } from '../components/skills/skills.component';
import { AiWorkflowComponent } from '../components/ai-workflow/ai-workflow.component';
import { ProjectsComponent } from '../components/projects/projects.component';
import { ContactComponent } from '../components/contact/contact.component';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-home',
  imports: [
    TranslocoModule,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    AiWorkflowComponent,
    ProjectsComponent,
    ContactComponent,
  ],
  template: `
    <!-- Skip to main content (accessibility) -->
    <a href="#main-content" class="skip-link">Skip to main content</a>

    <app-hero />
    <app-about />
    <app-skills />
    <app-ai-workflow />
    <app-projects />
    <app-contact />
  `,
  styles: `
    .skip-link {
      position: absolute;
      top: -100px;
      left: 1rem;
      background: var(--color-cyan);
      color: #000;
      font-weight: 600;
      padding: 0.5rem 1rem;
      border-radius: 0 0 8px 8px;
      z-index: 200;
      transition: top 0.2s ease;
    }
    .skip-link:focus { top: 0; }
  `,
})
export default class HomePageComponent implements OnInit {
  private seo = inject(SeoService);

  ngOnInit() {
    this.seo.set({
      title: 'webben — Senior Angular & DevOps Engineer, Magdeburg',
      description: 'Benjamin Geißler — Senior Angular & DevOps Engineer aus Magdeburg. 10 Jahre Erfahrung in Angular, TypeScript, DevOps und AI-beschleunigter Entwicklung.',
      url: 'https://web-ben.de/',
    });
  }
}
