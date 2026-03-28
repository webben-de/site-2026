import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoSyncLoader } from '../../../test-helpers';
import { provideRouter } from '@angular/router';
import { By } from '@angular/platform-browser';

function createComponent() {
  TestBed.configureTestingModule({
    imports: [NavbarComponent],
    providers: [
      provideHttpClient(),
      provideRouter([]),
      provideTransloco({
        config: { availableLangs: ['de', 'en'], defaultLang: 'de', reRenderOnLangChange: true },
        loader: TranslocoSyncLoader,
      }),
    ],
  });
  const fixture = TestBed.createComponent(NavbarComponent);
  fixture.detectChanges();
  return fixture;
}

describe('NavbarComponent', () => {
  it('should create', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should default to DE language', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.currentLang()).toBe('de');
  });

  it('should toggle language from DE to EN', () => {
    const fixture = createComponent();
    const comp = fixture.componentInstance;
    comp.toggleLang();
    expect(comp.currentLang()).toBe('en');
  });

  it('should toggle language back to DE from EN', () => {
    const fixture = createComponent();
    const comp = fixture.componentInstance;
    comp.toggleLang(); // → en
    comp.toggleLang(); // → de
    expect(comp.currentLang()).toBe('de');
  });

  it('should open and close mobile menu', () => {
    const fixture = createComponent();
    const comp = fixture.componentInstance;
    expect(comp.menuOpen()).toBe(false);
    comp.toggleMenu();
    expect(comp.menuOpen()).toBe(true);
    comp.closeMenu();
    expect(comp.menuOpen()).toBe(false);
  });

  it('should set scrolled=true when scrollY > 20', () => {
    const fixture = createComponent();
    const comp = fixture.componentInstance;
    Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
    comp.onScroll();
    expect(comp.scrolled()).toBe(true);
  });

  it('should set scrolled=false when scrollY <= 20', () => {
    const fixture = createComponent();
    const comp = fixture.componentInstance;
    Object.defineProperty(window, 'scrollY', { value: 0, writable: true });
    comp.onScroll();
    expect(comp.scrolled()).toBe(false);
  });

  it('should render logo with correct bracket markup', () => {
    const fixture = createComponent();
    fixture.detectChanges();
    const logo = fixture.debugElement.query(By.css('.logo'));
    expect(logo).toBeTruthy();
    expect(logo.nativeElement.textContent).toContain('webben');
  });

  it('should have 5 nav links', () => {
    const fixture = createComponent();
    expect(fixture.componentInstance.navLinks.length).toBe(5);
  });
});
