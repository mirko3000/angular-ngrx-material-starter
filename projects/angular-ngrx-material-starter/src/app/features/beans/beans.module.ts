import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { BeansComponent } from './beans/beans.component';
import { BeansRoutingModule } from './beans-routing.module';

@NgModule({
  declarations: [BeansComponent],
  imports: [CommonModule, SharedModule, BeansRoutingModule]
})
export class BeansModule {}
