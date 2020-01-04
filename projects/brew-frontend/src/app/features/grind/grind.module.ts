import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { GrindComponent } from './grind/grind.component';
import { GrindRoutingModule } from './grind-routing.module';

@NgModule({
  declarations: [GrindComponent],
  imports: [CommonModule, SharedModule, GrindRoutingModule]
})
export class GrindModule {}
