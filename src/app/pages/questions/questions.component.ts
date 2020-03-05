import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService, NbWindowService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators' ;
import {HttpClient} from '@angular/common/http';
import {ApiService} from '../../@core/services/api.service';
import { WindowFormComponent } from './window-form.component';

interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
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
    actions: { add: false, edit: true, delete: false, position: 'right'},
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
      name: {
        title: 'Full name',
        type: 'string',
      },
      avatar: {
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
              , private http: HttpClient) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit(): void {
    this.api.getNoAuth('http://5e5cdd8597d2ea0014796dcf.mockapi.io/api/users')
      .subscribe(
        (res: Array<Object>) => {
          this.source = res;
        },
      );
  }

  openWindowForm ($event) {
    this.windowService.open(WindowFormComponent, { title: `Hỏi đáp chuyên gia`, context: $event.data});
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
