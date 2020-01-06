import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';

import { BrewComponent } from './brew/brew.component';
import { BrewRoutingModule } from './brew-routing.module';

import { SocketService } from '../../services/socket.service';
import { WeightService } from '../../services/weight.service';
import { BrewService } from '../../services/brew.service';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [BrewComponent],
  imports: [CommonModule, SharedModule, BrewRoutingModule, ChartsModule]
})
export class BrewModule {}
