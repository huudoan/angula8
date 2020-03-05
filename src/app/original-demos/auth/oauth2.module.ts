/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {HttpClientModule} from '@angular/common/http';

import {
  NbCardModule,
  NbLayoutModule,
} from '@nebular/theme';

import {
  NbAuthJWTToken,
  NbAuthModule,
  NbOAuth2AuthStrategy,
  NbOAuth2ResponseType, NbPasswordAuthStrategy,
} from '@nebular/auth';

import {NbOAuth2LoginComponent} from './oauth2-login.component';
import {NbOAuth2CallbackComponent} from './oauth2-callback.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    RouterModule.forChild([
      {
        path: '',
        component: NbOAuth2LoginComponent,
      },
      {
        path: 'logout',
        component: NbOAuth2LoginComponent,
      },
      {
        path: 'callback',
        component: NbOAuth2CallbackComponent,
      },
    ]),

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          login: {
            redirect: {
              success: '/dashboard/',
              failure: null, // stay on the same page
            },
          },
          register: {
            redirect: {
              success: '/welcome/',
              failure: null, // stay on the same page
            },
          },
        }),
        NbOAuth2AuthStrategy.setup({
          name: 'facebook',
          clientId: '1792175914150439',
          clientSecret: 'd456550b3dfac053fdb0ca5e8163c76b',
          authorize: {
            endpoint: 'https://www.facebook.com/v3.2/dialog/oauth',
            responseType: NbOAuth2ResponseType.TOKEN,
            scope: 'public_profile',
            redirectUri: 'https://local.tsunaminori.com:80/oauth/callback',
          },

          redirect: {
            success: 'https://local.tsunaminori.com:80/oauth',
          },
        }),
      ],
    }),

    NbCardModule,
    NbLayoutModule,
  ],
  declarations: [
    NbOAuth2LoginComponent,
    NbOAuth2CallbackComponent,
  ],
})
export class NbOAuth2PlaygroundModule {
}
