import { Injectable } from '@angular/core';
import { Translation, TranslocoLoader } from '@jsverse/transloco';
import { Observable, of } from 'rxjs';
import de from '../public/i18n/de.json';

/** Synchronous loader for unit tests — no HTTP needed */
@Injectable()
export class TranslocoSyncLoader implements TranslocoLoader {
  getTranslation(): Observable<Translation> {
    return of(de as Translation);
  }
}
