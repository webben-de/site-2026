import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './transloco-loader';

describe('TranslocoHttpLoader', () => {
  it('should be provided', () => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideTransloco({
          config: { availableLangs: ['de', 'en'], defaultLang: 'de' },
          loader: TranslocoHttpLoader,
        }),
      ],
    });
    const loader = TestBed.inject(TranslocoHttpLoader);
    expect(loader).toBeTruthy();
  });
});
