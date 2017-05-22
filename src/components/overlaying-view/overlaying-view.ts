import { Component, Input, ElementRef, Renderer } from '@angular/core';
import { Platform, DomController } from 'ionic-angular';

@Component({
  selector: 'overlaying-view',
  templateUrl: 'overlaying-view.html'
})
export class OverlayingViewComponent {
  @Input('options') options: any;
  @Input('header')  header: any;

  title: string = '';
  handleHeight: number = 50;
  bounceBack: boolean = true;
  thresholdTop: number = 200;
  thresholdBottom: number = 200;
  hasScrolledUp: boolean = false;
  headerElement: any;

  constructor(public element: ElementRef,
    public renderer: Renderer,
    public domCtrl: DomController,
    public platform: Platform) {
    }

  toggleScroll(){
    if(this.hasScrolledUp){
      this.scrollDown();
    } else {
      this.scrollUp();
    }
  }

  scrollUp(){
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', '0px');
    });

    this.hasScrolledUp = true;
  }

  scrollDown(){
    this.domCtrl.write(() => {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'top 0.5s');
      this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
    });

    this.hasScrolledUp = false;
  }

  initializeOptions() {
    if(this.options.title){
      this.title = this.options.title;
    }

    if(this.options.handleHeight){
      this.handleHeight = this.options.handleHeight;
    }

    if(this.options.bounceBack){
      this.bounceBack = this.options.bounceBack;
    }

    if(this.options.thresholdFromBottom){
      this.thresholdBottom = this.options.thresholdFromBottom;
    }

    if(this.options.thresholdFromTop){
      this.thresholdTop = this.options.thresholdFromTop;
    }
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.headerElement = this.element.nativeElement.children[0];

      this.initializeOptions();

      this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
      this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', this.handleHeight + 'px');

      let hammer = new window['Hammer'](this.headerElement);
      hammer.get('pan').set({ direction: window['Hammer'].DIRECTION_VERTICAL });

      hammer.on('pan', (ev) => {
        this.handlePan(ev);
      });
    }, 200);
  }

  handlePan(ev){
    console.log('called', ev);
    let newTop = ev.center.y;

    let bounceToBottom = false;
    let bounceToTop = false;

    if(this.bounceBack && ev.isFinal){
      let topDiff = newTop - this.thresholdTop;
      let bottomDiff = (this.platform.height() - this.thresholdBottom) - newTop;

      topDiff >= bottomDiff ? bounceToBottom = true : bounceToTop = true;
    }

    if((newTop < this.thresholdTop && ev.additionalEvent === "panup") || bounceToTop){
      this.scrollUp();
    } else if(((this.platform.height() - newTop) < this.thresholdBottom && ev.additionalEvent === "pandown") || bounceToBottom){
        this.scrollDown();
    } else {
      this.renderer.setElementStyle(this.element.nativeElement, 'transition', 'none');

      if(newTop > 0 && newTop < (this.platform.height() - this.handleHeight)) {

        if(ev.additionalEvent === "panup" || ev.additionalEvent === "pandown"){

          this.domCtrl.write(() => {
            this.renderer.setElementStyle(this.element.nativeElement, 'top', newTop + 'px');
          });
        }
      }
    }
  }
}
