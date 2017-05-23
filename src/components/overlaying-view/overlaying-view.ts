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

  ngAfterViewInit() {
    this.title = this.options.title || '';

    this.renderer.setElementStyle(this.element.nativeElement, 'top', this.platform.height() - this.handleHeight + 'px');
    this.renderer.setElementStyle(this.element.nativeElement, 'padding-top', this.handleHeight + 'px');
  }
}
