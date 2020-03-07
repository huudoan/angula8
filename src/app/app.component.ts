/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import {Component, OnInit} from '@angular/core';
import {AnalyticsService} from './@core/utils/analytics.service';
import {SeoService} from './@core/utils/seo.service';
import {NbMenuService} from '@nebular/theme';
import {NbAuthService} from '@nebular/auth';
import {ActivatedRoute, Router} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from './@core/services/i18n.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private route: ActivatedRoute, private router: Router,
              private analytics: AnalyticsService, private seoService: SeoService,
              private authService: NbAuthService, private menuService: NbMenuService,
              private i18nService: I18nService, private translate: TranslateService,
  ) {
    translate.setDefaultLang('vi');

    this.menuService.onItemClick()
      .subscribe((event) => {
        this.onContextItemSelection(event.item.title);
      });
  }

  onContextItemSelection(title) {
    if (title === 'Log out') {
      this.router.navigate(['/auth/logout']);
    }
    // } else if (title === 'Profile') {
    // Do something on Profile
    // console.log('Profile Clicked ');
    // }
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.translate.use('vi');
  }
}
