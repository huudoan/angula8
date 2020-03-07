import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import {
  NbAuthComponent,
  NbLoginComponent,
  NbLogoutComponent,
  NbRegisterComponent,
  NbRequestPasswordComponent,
  NbResetPasswordComponent,
} from '@nebular/auth';
import {AuthGuard} from './auth-guard.service';
import {NbOAuth2PlaygroundModule} from './original-demos/auth/oauth2.module';

const routes: Routes = [
  {
    path: 'home',
    canActivate: [AuthGuard],
    loadChildren: () => import('app/pages/pages.module')
      .then(m => m.PagesModule),
  },
  {
    path: 'auth',
    component: NbAuthComponent,
    children: [
      {
        path: '',
        component: NbOAuth2PlaygroundModule,
      },
      {
        path: 'login',
        component: NbLoginComponent,
      },
      {
          path: 'register',
          component: NbRegisterComponent,
      },
      {
        path: 'logout',
        component: NbLogoutComponent,
      },
      {
          path: 'request-password',
          component: NbRequestPasswordComponent,
      },
      {
          path: 'reset-password',
          component: NbResetPasswordComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'home' },
];

const config: ExtraOptions = {
  useHash: false,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule],
})
export class AppRoutingModule {
}
