/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import { Component, OnDestroy } from '@angular/core';
import { NbAuthOAuth2Token, NbAuthResult, NbAuthService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';

@Component({
    selector: 'ngx-playground-auth',
    template: `
    <nb-layout>
      <nb-layout-column>
        <nb-card>
          <nb-card-body>
            <p>Current User Authenticated: {{ !!token }}</p>
            <p>Current User Token: {{ token|json }}</p>
            <button nbButton status="success" *ngIf="!token" (click)="login()">Sign In with facebook</button>
            <button nbButton status="warning" *ngIf="token" (click)="logout()">Sign Out</button>
          </nb-card-body>
        </nb-card>
      </nb-layout-column>
    </nb-layout>
  `,
})
export class NbOAuth2LogoutComponent implements OnDestroy {

    token: NbAuthOAuth2Token;

    alive = true;

    constructor(private authService: NbAuthService) {
        this.authService.logout('facebook')
            .pipe(takeWhile(() => this.alive))
            .subscribe((authResult: NbAuthResult) => {
            });
    }

    login() {
        this.authService.authenticate('facebook')
            .pipe(takeWhile(() => this.alive))
            .subscribe((authResult: NbAuthResult) => {
            });
    }

    logout() {
        this.authService.logout('facebook')
            .pipe(takeWhile(() => this.alive))
            .subscribe((authResult: NbAuthResult) => {
            });
    }

    ngOnDestroy(): void {
        this.alive = false;
    }
}
