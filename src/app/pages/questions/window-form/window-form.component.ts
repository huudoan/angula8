import {Component, OnInit} from '@angular/core';
import {NbWindowRef} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ApiService} from '../../../@core/services/api.service';
import {QuestionModel} from '../../../model/question.model';
import {AnswerModel} from '../../../model/answer.model';

@Component({
  styleUrls: ['window-form.component.scss'],
  selector: 'ngx-form-layouts',
  templateUrl: './window-form.component.html',
})
export class WindowFormComponent implements OnInit {
  editForm: FormGroup;
  question: QuestionModel = new QuestionModel();
  answer: AnswerModel = new AnswerModel();
  lsAnswer = [];

  constructor(public windowRef: NbWindowRef, private formBuilder: FormBuilder, private api: ApiService) {
    this.question = windowRef.config.context as QuestionModel;
    this.api.getNoAuth('http://5e5cdd8597d2ea0014796dcf.mockapi.io/api/users')
      .subscribe(
        (res) => {
          this.lsAnswer = res.data;
          console.info(this.lsAnswer);
        },
      );
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({});
  }

  onSubmit() {
  }

  close() {
    this.windowRef.close();
  }
}
