import {Component, OnDestroy, OnInit} from '@angular/core';
import {NbThemeService} from '@nebular/theme';
import {takeWhile} from 'rxjs/operators' ;
import {HttpClient} from '@angular/common/http';
import {SolarData} from '../../@core/data/solar';
import {ApiService} from '../../@core/services/api.service';


interface CardSettings {
  title: string;
  iconClass: string;
  type: string;
}

@Component({
  selector: 'ngx-dashboard',
  styleUrls: ['./dashboard.component.scss'],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit, OnDestroy {

  private alive = true;

  commonStatusCardsSet: CardSettings[] = [];
  statusCards: string;

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

  constructor(private themeService: NbThemeService,
              private api: ApiService,
              private http: HttpClient) {
    this.themeService.getJsTheme()
      .pipe(takeWhile(() => this.alive))
      .subscribe(theme => {
        this.statusCards = this.statusCardsByThemes[theme.name];
      });
  }

  ngOnInit(): void {
    this.api.getNoAuth('http://5e5cdd8597d2ea0014796dcf.mockapi.io/api/users')
      .subscribe(
        (res) => {
          console.info(res);
        },
        err => {
        },
      );
  }

  ngOnDestroy() {
    this.alive = false;
  }
}
