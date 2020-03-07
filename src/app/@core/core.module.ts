import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule} from '@angular/common';
import {NbAuthJWTToken, NbAuthModule, NbPasswordAuthStrategy} from '@nebular/auth';
import {NbRoleProvider, NbSecurityModule} from '@nebular/security';
import {of as observableOf} from 'rxjs';

import {throwIfAlreadyLoaded} from './module-import-guard';
import {AnalyticsService, LayoutService, PlayerService, SeoService, StateService} from './utils';
import {UserData} from './data/users';
import {UserService} from './mock/users.service';
import {HttpErrorResponse} from '@angular/common/http';

const socialLinks = [];

const DATA_SERVICES = [
  {provide: UserData, useClass: UserService},
];

export class NbSimpleRoleProvider extends NbRoleProvider {
  getRole() {
    // here you could provide any role based on any auth flow
    return observableOf('guest');
  }
}

export const NB_CORE_PROVIDERS = [
  ...DATA_SERVICES,
  ...NbAuthModule.forRoot({

    strategies: [
      NbPasswordAuthStrategy.setup({
        // baseEndpoint: 'https://test-backend.code.net.vn:8080/api/',
        name: 'email',
        token: {
          class: NbAuthJWTToken,
          key: 'data.token',
        },
        messages: {
          key: 'message',
          getter: (module, res, options) => {
            if (res.body.responseCode !== '00') {
              return res.body.message ? res.body.message : options[module].defaultErrors;
            }
          },
        },
        errors: {
          getter: (module: string, res: HttpErrorResponse) => {
            return [res.message];
          },
        },
        login: {
          endpoint: 'login',
          method: 'post',
          redirect: {
            success: 'pages',
          },
          requireValidToken: true,
        },
        logout: {
          endpoint: 'sign-out',
          method: 'get',
          redirect: {
            success: '/auth/login',
            failure: '/',
          },
        },
      }),
    ],
    forms: {
      logout: {
        redirectDelay: 0,
      },
    },
  }).providers,

  NbSecurityModule.forRoot({
    accessControl: {
      guest: {
        view: '*',
      },
      user: {
        parent: 'guest',
        create: '*',
        edit: '*',
        remove: '*',
      },
    },
  }).providers,

  {
    provide: NbRoleProvider, useClass: NbSimpleRoleProvider,
  },
  AnalyticsService,
  LayoutService,
  PlayerService,
  SeoService,
  StateService,
];

@NgModule({
  imports: [
    CommonModule,
  ],
  exports: [
    NbAuthModule,
  ],
  declarations: [],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    throwIfAlreadyLoaded(parentModule, 'CoreModule');
  }

  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CoreModule,
      providers: [
        ...NB_CORE_PROVIDERS,
      ],
    };
  }
}
