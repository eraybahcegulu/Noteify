import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDividerModule } from 'ng-zorro-antd/divider';

const nzModules = [
    NzInputModule,
    NzIconModule,
    NzEmptyModule,
    NzAlertModule,
    NzCardModule,
    NzCollapseModule,
    NzTableModule,
    NzTagModule,
    NzFormModule,
    NzButtonModule,
    NzBadgeModule,
    NzSelectModule,
    NzDividerModule
  ];

  @NgModule({
    imports: nzModules,
    exports: nzModules,
  })
  export class NzModule { }