import { ApplicationConfig, ENVIRONMENT_INITIALIZER, importProvidersFrom, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

import { routes } from './app.routes';
import { DialogService } from './services/dialog.service';

export function initializeDialogService() {
  return () => {
    inject(DialogService)
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes), 
    provideAnimationsAsync('noop'), 
    provideAnimationsAsync(), 
    provideHttpClient(),
    importProvidersFrom(MatDialogModule),
    {
      provide: ENVIRONMENT_INITIALIZER,
      useFactory: initializeDialogService,
      deps: [MatDialog],
      multi: true
    }
  ]
};
