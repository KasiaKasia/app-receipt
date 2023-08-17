import { Directive, ElementRef, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private elementHtml: ElementRef) {}
  @HostBinding('style.backgroundColor') bgColor: string = 'white';

  @HostListener('mouseenter')
  hoverHighlight(): void {
    this.elementHtml.nativeElement.style.color = '#1957a9';
  }

  @HostListener('mouseleave')
  cancelhighlight(): void {
    this.elementHtml.nativeElement.style.color = 'black';
  }

  @HostListener('mouseover')
  onMouseAction() {
    this.bgColor = '#ebeef2';
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.bgColor = 'white';
  }
}
