import {Component, OnInit} from '@angular/core';

import {MENU_ITEMS} from './pages-menu';
import {ApiService} from '../@core/services/api.service';
import {HttpClient} from '@angular/common/http';
import {LangChangeEvent, TranslateService} from '@ngx-translate/core';
import {MenuItem} from '../@theme/components/menu-item';
import {I18nService} from '../@core/services/i18n.service';
import {environment} from '../../environments/environment';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent implements OnInit {

  menu = MENU_ITEMS;

  constructor(private translate: TranslateService,
              private api: ApiService,
              private i18nService: I18nService,
              private http: HttpClient) {
    // this.getTranslation();
    // this.translate.onLangChange.subscribe((event: LangChangeEvent) => {
    //   this.getTranslation();
    // });
  }


  ngOnInit() {
    this.initData();
    this.i18nService.init(environment.defaultLanguage, environment.supportedLanguages);
    this.translate.use('vi');
  }

  initData() {
  }
}
