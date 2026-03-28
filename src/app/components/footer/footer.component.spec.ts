import { TestBed } from '@angular/core/testing';
import { FooterComponent } from './footer.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoSyncLoader } from '../../../test-helpers';
import { provideRouter } from '@angular/router';

function createComponent() {
  TestBed.configureTestingModule({
    imports: [FooterComponent],
    providers: [
      provideHttpClient(),
      provideRouter([]),
      provideTransloco({
        config: { availableLangs: ['de', 'en'], defaultLang: 'de', reRenderOnLangChange: true },
        loader: TranslocoSyncLoader,
      }),
    ],
  });
  const fixture = TestBed.createComponent(FooterComponent);
  fixture.detectChanges();
  return fixture;
}

describe('FooterComponent', () => {
  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display current year', () => {
    const fixture = createComponent();
    const year = new Date().getFullYear();
    expect(fixture.componentInstance.year).toBe(year);
  });

  it('should render footer element', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    fixture.detectChanges();
    const footer = fixture.nativeElement.querySelector('footer');
    expect(footer).toBeTruthy();
  });

  it('should contain logo text "webben"', async () => {
    const fixture = createComponent();
    await fixture.whenStable();
    fixture.detectChanges();
    const logo = fixture.nativeElement.querySelector('.footer-logo');
    expect(logo.textContent).toContain('webben');
  });
});

