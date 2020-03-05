import {Component, OnInit} from '@angular/core';
import {NbWindowRef, NbWindowService} from '@nebular/theme';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {QuestionModel} from '../../models/question.model';

@Component({
  template: `
    <form class="form" [formGroup]="editForm" (ngSubmit)="onSubmit()">
        <div class="form-group">
            <label for="username">Câu hỏi:</label>
            <p>{{question.name}}</p>
        </div>
        <div class="form-group">
            <label for="username">Câu trả lới:</label>
            <ngx-tiny-mce [className]="test-id" [id]="tra-loi" ></ngx-tiny-mce>
        </div>
      <button class="btn btn-success">Trả lời</button>
    </form>
  `,
  styleUrls: ['window-form.component.scss'],
})
export class WindowFormComponent implements OnInit {
  editForm: FormGroup;
  question: QuestionModel = new QuestionModel();
  constructor(public windowRef: NbWindowRef, private formBuilder: FormBuilder) {
    this.question = windowRef.config.context as  QuestionModel;
    console.info(this.question);
  }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({});
  }

  onSubmit() {
    // this.apiService.updateUser(this.editForm.value)
    //   .pipe(first())
    //   .subscribe(
    //     data => {
    //       if(data.status === 200) {
    //         alert('User updated successfully.');
    //         this.router.navigate(['list-user']);
    //       }else {
    //         alert(data.message);
    //       }
    //     },
    //     error => {
    //       alert(error);
    //     });
  }

  close() {
    this.windowRef.close();
  }
}
