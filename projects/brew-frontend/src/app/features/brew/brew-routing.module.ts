import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrewComponent } from './brew/brew.component';

const routes: Routes = [
  {
    path: '',
    component: BrewComponent,
    data: { title: 'bm.menu.brew' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrewRoutingModule {}
