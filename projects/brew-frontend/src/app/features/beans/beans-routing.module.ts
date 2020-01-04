import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeansComponent } from './beans/beans.component';

const routes: Routes = [
  {
    path: '',
    component: BeansComponent,
    data: { title: 'anms.menu.about' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BeansRoutingModule {}
