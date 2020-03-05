import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {DashboardComponent} from './dashboard.component';
import {FormsModule} from '@angular/forms';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbIconModule, NbListModule,
  NbRadioModule, NbSelectModule,
  NbTabsetModule,
  NbUserModule,
} from '@nebular/theme';
import {NgxEchartsModule} from 'ngx-echarts';

@NgModule({
  imports: [
    FormsModule,
    ThemeModule,
    NbCardModule,
    NbUserModule,
    NbButtonModule,
    NbTabsetModule,
    NbActionsModule,
    NbRadioModule,
    NbSelectModule,
    NbListModule,
    NbIconModule,
    NbButtonModule,
    NgxEchartsModule,
  ],
  declarations: [
    DashboardComponent,
  ],
  providers: [],
})

export class DashboardModule {
}
