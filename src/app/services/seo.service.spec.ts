import { TestBed } from '@angular/core/testing';
import { SeoService } from './seo.service';
import { Meta, Title } from '@angular/platform-browser';

describe('SeoService', () => {
  let service: SeoService;
  let title: Title;
  let meta: Meta;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeoService);
    title   = TestBed.inject(Title);
    meta    = TestBed.inject(Meta);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should set page title', () => {
    service.set({ title: 'Test Page', description: 'Test desc' });
    expect(title.getTitle()).toBe('Test Page | webben');
  });

  it('should not duplicate "| webben" if title already contains "webben"', () => {
    service.set({ title: 'webben — Home', description: 'desc' });
    expect(title.getTitle()).toBe('webben — Home');
  });

  it('should set og:title meta tag', () => {
    service.set({ title: 'My Title', description: 'My desc' });
    const tag = meta.getTag('property="og:title"');
    expect(tag?.content).toBe('My Title | webben');
  });

  it('should set description meta tag', () => {
    service.set({ title: 'T', description: 'Custom description here' });
    const tag = meta.getTag('name="description"');
    expect(tag?.content).toBe('Custom description here');
  });

  it('should set og:url when url provided', () => {
    service.set({ title: 'T', description: 'D', url: 'https://web-ben.de/' });
    const tag = meta.getTag('property="og:url"');
    expect(tag?.content).toBe('https://web-ben.de/');
  });

  it('should set og:image and twitter:image when image provided', () => {
    service.set({ title: 'T', description: 'D', image: 'https://web-ben.de/og.png' });
    expect(meta.getTag('property="og:image"')?.content).toBe('https://web-ben.de/og.png');
    expect(meta.getTag('name="twitter:image"')?.content).toBe('https://web-ben.de/og.png');
  });
});
