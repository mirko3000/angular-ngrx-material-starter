import { Component, OnInit, NgModule, ChangeDetectionStrategy } from '@angular/core';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../core/core.module';

import { Feature, features } from '../grind.data';

import { SocketService } from '../../../services/socket.service';
import { WeightService } from '../../../services/weight.service';
import { BrewService } from '../../../services/brew.service';
import { Event } from '../../../shared/models/event';
import { Message } from '../../../shared/models/message';
import { WeightData } from '../../../shared/models/weightdata';
import { Grind } from '../../../shared/models/grind.model';

import { Router } from '@angular/router';

import { ChartsModule } from 'ng2-charts';

@Component({
  selector: 'anms-grind',
  templateUrl: './grind.component.html',
  styleUrls: ['./grind.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class GrindComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  features: Feature[] = features;

  weight;
  weightRaw;
  isLoading = false;
  isEditing = false;
  ioConnection: any;
  ratio = "0";

  timestampStart;
  timestampEnd;
  rampUp = false;
  lastWeigth;
  tolerance = 0.2;
  maxIncrease = 10;
  increase;
  lastIncrease;

  chart;
  timeData = [];
  weightData = [];

  counter: number = 0;
  intervalDuration: number = 0;
  timerRef;
  running: boolean = false;
  seconds: string = '00';
  milliseconds: string = '00';

  weightLock: boolean = false;
  timeLock: boolean = false;

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLabels = ['1', '2', '3', '4', '5', '6', '7'];
  public barChartType = 'line';
  public barChartLegend = false;
  public barChartData = [{ data: [0, 0, 0, 0, 0, 0, 0], label: 'Series A' }];

  constructor(
    private socketService: SocketService,
    private weightService: WeightService,
    private brewService: BrewService,
    private router: Router
  ) {}


  ngOnInit() {
    this.socketService.initSocket();
    this.ioConnection = this.socketService
      .onMessage()
      .subscribe((message: WeightData) => {
        if (message.weigth === 'GrindWeight') {
          if (!this.weightLock) {
            this.weightRaw = parseFloat(message.data);
            this.weight = (
              Math.round(this.weightRaw * 100) / 100
            ).toFixed(1);

            //Only do after second measure
            if (this.lastWeigth) {
              this.increase = this.weight - this.lastWeigth;
              //console.log(this.weight + "g (" + this.increase.toFixed(2) + ") - " + this.rampUp);

              // Check if rampUp is finished (increase is less than average increase)
              if (this.rampUp && this.increase < this.tolerance) {
                this.timestampEnd = new Date();
                this.rampUp = false;
                //console.log("Rampup finished, increase by " + this.increase);
                //console.log("Duration: " + (this.timestampEnd - this.timestampStart));
                this.clearTimer();
              }

              // Check if we have a rampUp
              if (
                !this.rampUp &&
                this.increase >= this.tolerance &&
                this.increase < this.maxIncrease
              ) {
                this.timestampStart = new Date();
                this.rampUp = true;
                //console.log("Rampup identified, increase by " + this.increase);
                this.startTimer();
              }
              this.lastIncrease = this.increase;
            }

            // Store as last weigth
            this.lastWeigth = this.weight;

            // Add to Chart
            this.barChartLabels.push(new Date().getSeconds().toString());
            if (this.barChartLabels.length > 30) this.barChartLabels.shift();
            this.barChartData[0].data.push(this.weight);
            if (this.barChartData[0].data.length > 30)
              this.barChartData[0].data.shift();
          }
        }
      });

    this.socketService.onEvent(Event.CONNECT).subscribe(() => {
      console.log('connected');
    });

    this.socketService.onEvent(Event.DISCONNECT).subscribe(() => {
      console.log('disconnected');
    });
  }

  ngOnDestroy() {
    clearInterval(this.timerRef);
    this.socketService.endSocket();
  }

  startTimer() {
    if (!this.timeLock) {
      this.running = !this.running;
      this.counter = 0;
      this.formatCounter(0);
      if (this.running) {
        const startTime = Date.now() - (this.counter || 0);
        this.timerRef = setInterval(() => {
          this.counter = Date.now() - startTime;
          this.formatCounter(this.counter);
          //Calculate ratio
          this.ratio = (this.weightRaw / (this.counter/1000)).toFixed(2);
          console.log(this.weightRaw + " - " + (this.counter) + " - " + this.ratio);
        }, 20);
      } else {
        clearInterval(this.timerRef);
      }
    }
  }

  clearTimer() {
    this.running = false;
    clearInterval(this.timerRef);
  }

  formatCounter(count: number) {
    if (count > 1000) {
      this.seconds = Math.floor(count / 1000).toFixed(0);
      if (this.seconds.length < 2) {
        this.seconds = '0' + this.seconds;
      }
    } else {
      this.seconds = '00';
    }
    this.milliseconds = (count % 1000).toFixed(0);
    if (this.milliseconds.length < 3) {
      this.milliseconds = '00';
    } else {
      this.milliseconds = this.milliseconds.substring(0, 2);
    }
    //console.log("Format: " + count + " --> " + this.seconds + ":" + this.milliseconds);
  }

  toggleWeightLock() {
    this.weightLock = !this.weightLock;
  }

  toggleTimeLock() {
    this.timeLock = !this.timeLock;
  }

  tare() {
    this.weightService.tareGrind().subscribe(
      data => {
        console.log('Tare successfull');
        //this.toast.setMessage('Tare successfull.', 'success');
        this.lastWeigth = null;
        this.rampUp = false;
        this.barChartData[0].data.forEach(function(part, index, theArray) {
          theArray[index] = 0;
        });
        this.clearTimer();
      },
      error => console.log(error),
      () => (this.isLoading = false)
    );
  }

  calibrate() {
    this.weightService
      .calibrateGrind()
      .subscribe(
        data => console.log('Calibrate successfull'),
        error => console.log(error),
        () => (this.isLoading = false)
      );
  }

  startBrew() {
    var currWeigth = this.weight;
    var currMillis = this.counter;
    var grind = new Grind();
    grind.weigth = currWeigth;
    grind.milliseconds = currMillis;

    this.brewService.setGrind(grind);
    this.router.navigate(['/brew']);
  }
}
