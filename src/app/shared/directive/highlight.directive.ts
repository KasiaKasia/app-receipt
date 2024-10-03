import { Directive, ElementRef, HostBinding, HostListener, NgZone } from '@angular/core';

@Directive({
  selector: '[highlight]',
  standalone: true,
})
export class HighlightDirective {

  constructor(private elementHtml: ElementRef, private ngZone: NgZone) {}
  @HostBinding('style.backgroundColor') bgColor: string = 'initial';
 

  @HostListener('mouseleave')
  cancelhighlight(): void {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => { 
        this.elementHtml.nativeElement.style.color = 'black';
      })
    })
  }

  @HostListener('mouseover')
  onMouseAction() {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => { 
        this.bgColor = '#ebeef2';   
        this.elementHtml.nativeElement.style.color = '#1957a9'; 
      })
    })
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.ngZone.runOutsideAngular(() => {
      this.ngZone.run(() => { 
        this.bgColor = 'initial';
        this.elementHtml.nativeElement.style.color = 'initial'; 
      })
    })
  }
}
