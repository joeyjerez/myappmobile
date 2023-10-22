import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PassChangePage } from './pass-change.page';

const routes: Routes = [
  {
    path: '',
    component: PassChangePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PassChangePageRoutingModule {}
