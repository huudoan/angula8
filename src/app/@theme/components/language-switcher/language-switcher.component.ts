import {Component, Input, ViewChild} from '@angular/core';
import {
  NbPopoverModule,
  NbPopoverDirective,
  NbButtonModule,
} from '@nebular/theme';

import {LangSwitcherListComponent} from './language-switcher-list/language-switcher-list.component';

@Component({
  selector: 'ngx-lang-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.scss'],
})
export class LangSwitcherComponent {
  @ViewChild(NbPopoverDirective, {static: true}) popover: NbPopoverDirective;
  @Input() showTitle: boolean = true;

  switcherListComponent = LangSwitcherListComponent;
}
