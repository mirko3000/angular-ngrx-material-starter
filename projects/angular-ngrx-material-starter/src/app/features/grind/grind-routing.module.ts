import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GrindComponent } from './grind/grind.component';

const routes: Routes = [
  {
    path: '',
    component: GrindComponent,
    data: { title: 'anms.menu.features' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GrindRoutingModule {}
