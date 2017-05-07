import { Component } from '@angular/core';

@Component({
  selector: 'countdown-timer',
  templateUrl: 'countdown-timer.html'
})
export class CountdownTimerComponent {

  text: string;

  constructor() {
    console.log('Hello CountdownTimerComponent Component');
    this.text = 'Hello World';
  }

}
