import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

// Services
import { BeansService } from './services/beans.service';
import { BrewService } from './services/brew.service';
import { WeightService } from './services/weight.service';
import { SocketService } from './services/socket.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app/app.component';

import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // core & shared
    CoreModule,
    SharedModule,

    // app
    AppRoutingModule,

    // charts
    ChartsModule
  ],
  providers: [BeansService, BrewService, WeightService, SocketService],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
