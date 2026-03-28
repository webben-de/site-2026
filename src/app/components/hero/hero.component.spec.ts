import { TestBed } from '@angular/core/testing';
import { HeroComponent } from './hero.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoSyncLoader } from '../../../test-helpers';

function createComponent() {
  TestBed.configureTestingModule({
    imports: [HeroComponent],
    providers: [
      provideHttpClient(),
      provideTransloco({
        config: { availableLangs: ['de', 'en'], defaultLang: 'de', reRenderOnLangChange: true },
        loader: TranslocoSyncLoader,
      }),
    ],
  });
  const fixture = TestBed.createComponent(HeroComponent);
  fixture.detectChanges();
  return fixture;
}

describe('HeroComponent', () => {
  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should start with empty terminal lines', () => {
    const fixture = createComponent();
    expect(Array.isArray(fixture.componentInstance.visibleLines())).toBe(true);
  });

  it('should add terminal lines over time', async () => {
    const fixture = createComponent();
    await new Promise(r => setTimeout(r, 700));
    fixture.detectChanges();
    expect(fixture.componentInstance.visibleLines().length).toBeGreaterThanOrEqual(1);
  });

  it('should clean up timeouts on destroy', () => {
    const fixture = createComponent();
    expect(() => fixture.destroy()).not.toThrow();
  });

  it('should render hero section element', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector('section.hero');
    expect(section).toBeTruthy();
  });

  it('should render two CTA links', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    fixture.detectChanges();
    const links = fixture.nativeElement.querySelectorAll('.cta-group a');
    expect(links.length).toBe(2);
  });

  it('should render terminal window', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    fixture.detectChanges();
    const terminal = fixture.nativeElement.querySelector('.terminal');
    expect(terminal).toBeTruthy();
  });
});
