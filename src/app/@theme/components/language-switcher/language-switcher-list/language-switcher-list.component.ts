import {Component, Input} from '@angular/core';
import {NbPopoverDirective, NbLayoutDirection, NbLayoutDirectionService} from '@nebular/theme';
import {TranslateService} from '@ngx-translate/core';
import {I18nService} from '../../../../@core/services/i18n.service';

@Component({
  selector: 'ngx-lang-switcher-list',
  templateUrl: './language-switcher-list.component.html',
  styleUrls: ['./language-switcher-list.component.scss'],
})

export class LangSwitcherListComponent {

  @Input() popover: NbPopoverDirective;

  languages = [];

  constructor(
    private translate: TranslateService,
    private i18nService: I18nService,
  ) {

    this.translate.get(['English', 'Vietnamese']).subscribe(translations => {
      this.languages = [
        {
          title: translations.English,
          imgUrl: 'assets/flags/united-states-of-america.png',
          key: 'en',
        },
        {
          title: translations.Vietnamese,
          imgUrl: 'assets/flags/vietnam.png',
          key: 'vi',
        },
      ];
    });
  }

  onToggleLang(langKey: string) {
    this.i18nService.language = langKey;
    this.popover.hide();
  }
}
