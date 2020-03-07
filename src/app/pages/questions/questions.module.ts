import {NgModule} from '@angular/core';
import {ThemeModule} from '../../@theme/theme.module';
import {QuestionsComponent} from './questions.component';
import {FormsModule} from '@angular/forms';
import {WindowFormComponent} from './window-form/window-form.component';
import {AnswerComponent} from './answer/answer.component';
import {
  NbActionsModule,
  NbButtonModule, NbInputModule,
  NbCardModule, NbIconModule, NbListModule,
  NbRadioModule, NbSelectModule,
  NbTabsetModule,
  NbUserModule,
  NbWindowModule,
} from '@nebular/theme';
import {NgxEchartsModule} from 'ngx-echarts';
import {Ng2SmartTableModule} from 'ng2-smart-table';

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
    NbInputModule,
    NgxEchartsModule,
    Ng2SmartTableModule,
    NbWindowModule.forChild(),
  ],
  declarations: [
    QuestionsComponent,
    WindowFormComponent,
    AnswerComponent,
  ],
  entryComponents: [
    WindowFormComponent,
    AnswerComponent,
  ],
  providers: [],
})

export class QuestionsModule {

}
