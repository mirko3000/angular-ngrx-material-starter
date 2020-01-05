import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { GrindComponent } from './grind/grind.component';
import { GrindRoutingModule } from './grind-routing.module';

import { SocketService } from '../../services/socket.service';
import { WeightService } from '../../services/weight.service';
import { BrewService } from '../../services/brew.service';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GrindComponent],
  imports: [CommonModule, SharedModule, GrindRoutingModule, ChartsModule]
})
export class GrindModule {}
