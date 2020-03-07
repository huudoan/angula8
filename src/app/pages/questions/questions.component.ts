import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {NbThemeService, NbWindowService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators' ;
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../@core/services/api.service';
import {WindowFormComponent} from './window-form/window-form.component';
import {NotiService} from '../../@core/services/noti.service';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-questions',
  styleUrls: ['./questions.component.scss'],
  templateUrl: './questions.component.html',
})
export class QuestionsComponent implements OnInit, OnDestroy {
  private alive = true;
  private source: Array<object>;
  commonStatusCardsSet: CardSettings[] = [];
  statusCards: string;
  settings = {
    mode: 'external',
    actions: {add: false, edit: true, delete: false, position: 'right'},
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
      },
      customerName: {
        title: 'Full name',
        type: 'string',
      },
      question: {
        title: 'Avatar',
        type: 'string',
      },
      date: {
        title: 'Ngày tạo',
        type: 'string',
      },
    },
  };

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
    , private api: ApiService
    , private windowService: NbWindowService
    , private router: Router
    , private http: HttpClient
    , private noti: NotiService) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit(): void {
    this.api.get('/api/FcQuestion/all', {
      registered: true,
      skip: 0,
      take: 15,
    })
      .subscribe(
        (res: any) => {
          if (res.statusCode === 200) {
            this.noti.success(res.message);
            this.noti.info(res.message);
            this.noti.error(res.message);
          }
          this.source = res.data;
        },
      );
  }

  showEdit($event) {
    this.router.navigate(['/home/answer/' + $event.data.id]);
  }

  openWindowForm($event) {
    this.windowService.open(WindowFormComponent, {title: `Hỏi đáp chuyên gia`, context: $event.data});
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
