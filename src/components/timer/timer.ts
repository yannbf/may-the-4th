import { Component } from '@angular/core';

@Component({
    selector: 'timer',
    templateUrl: 'timer.html'
})
export class TimerComponent {

    public date: any;
    public displayTime: any;
    public diffSeconds: any;
    public isOver: boolean;

    constructor() {
      this.date = new Date('2017/12/15');
    }

    ngOnInit() {
        let tzoffset = ((new Date()).getTimezoneOffset() * 60000) //offset in milliseconds
        let now = (new Date(Date.now() - tzoffset - 60000)).toISOString().slice(0, -1);
        this.diffSeconds = (Date.parse(this.date) - Date.parse(now)) / 1000;

        if (this.diffSeconds > 0) {
            this.displayTime = this.getRemainingTime(this.diffSeconds);
            this.startTimer();
        }
    }

    startTimer() {
        let intervalId = setInterval(() => {
            let tzoffset = ((new Date()).getTimezoneOffset() * 60000) //offset in milliseconds
            let now = (new Date(Date.now() - tzoffset - 60000)).toISOString().slice(0, -1);
            this.diffSeconds = (Date.parse(this.date) - Date.parse(now)) / 1000;
            //this.diffSeconds = (Date.parse(this.event.date) - Date.now()) / 1000;
            if (this.diffSeconds > 0) {
                this.displayTime = this.getRemainingTime(this.diffSeconds);
            } else {
                clearInterval(intervalId);
            }
        }, 1000);
    }

    remainingDays;
    remainingHours;
    remainingMinutes;
    remainingSeconds;

    getRemainingTime(t) {
        this.remainingDays = Math.floor(t / 86400);
        t -= this.remainingDays * 86400;

        this.remainingHours = Math.floor(t / 3600) % 24;
        t -= this.remainingHours * 3600;

        this.remainingMinutes = Math.floor(t / 60) % 60;
        t -= this.remainingMinutes * 60

        this.remainingSeconds = Math.floor(t % 60);
    }

    format(number){
      return Array(Math.max(2 - String(number).length + 1, 0)).join('0') + number;
    }
}