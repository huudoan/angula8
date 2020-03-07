import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {NbThemeService} from '@nebular/theme';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {takeUntil, takeWhile, tap} from 'rxjs/operators' ;
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../../@core/services/api.service';
import {QuestionModel} from '../../../model/question.model';
import {AnswerModel} from '../../../model/answer.model';
import {NbAuthService, NbAuthJWTToken} from '@nebular/auth';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-answer',
  styleUrls: ['./answer.component.scss'],
  templateUrl: './answer.component.html',
})
export class AnswerComponent implements OnInit {
  private alive = true;
  commonStatusCardsSet: CardSettings[] = [];
  statusCards: string;
  editForm: FormGroup;
  question: QuestionModel = new QuestionModel();
  answer: AnswerModel = new AnswerModel();
  lsQuestion = [];
  user: any;
  editStatus = true;
  statusCardsByThemes: {
    default: CardSettings[];
    cosmic: CardSettings[];
    corporate: CardSettings[];
    dark: CardSettings[];
  } = {
    default: this.commonStatusCardsSet,
    cosmic: this.commonStatusCardsSet,
    corporate: this.commonStatusCardsSet,
    dark: this.commonStatusCardsSet,
  };

  constructor(private themeService: NbThemeService
    , private formBuilder: FormBuilder
    , private api: ApiService
    , private router: Router
    , @Inject(ActivatedRoute) private routeA: ActivatedRoute
    , private authService: NbAuthService
    , private http: HttpClient) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit(): void {
    this.routeA.params.subscribe(params => {
      this.question.id = params['id'];
    });

    this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if (token.isValid()) {
          this.user = token.getPayload();
        }
      });

    this.editForm = this.formBuilder.group({});
    this.api.get('/api/FcQuestion/byId', {id: this.question.id}).subscribe(
      res => {
        if (res.data !== null) {
          this.question = res.data as QuestionModel;
          if (this.question.answer) {
            this.editStatus = false;
            this.answer = this.question.answer as AnswerModel;
          }

          this.answer.questionId = this.question.id;
          this.api.get('/api/FcQuestion/all', {tags: this.question.tags, skip: 0, take: 10}).subscribe(
            resA => {
              this.lsQuestion = resA.data;
            });
        } else {
          this.router.navigate(['/home/questions']);
        }
      });
  }

  editAnswer(statusE: boolean): void {
    this.editStatus = statusE;
  }

  onSubmit(): void {
    this.answer.userId = this.user.uid;
    this.answer.authorName = this.user.name;
    if (this.answer.answer !== '') {
      this.api.post('/api/FcAnswer', null, this.answer).subscribe(
        res => {
          console.info(res);
        });
    }
  }
}
