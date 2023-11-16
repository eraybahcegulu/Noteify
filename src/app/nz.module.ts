import { NgModule } from '@angular/core';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzIconModule } from 'ng-zorro-antd/icon';

const nzModules = [
    NzInputModule,
    NzIconModule,
    NzEmptyModule,
    NzAlertModule,
    NzCardModule,
    NzTableModule,
  ];

  @NgModule({
    imports: nzModules,
    exports: nzModules,
  })
  export class NzModule { }