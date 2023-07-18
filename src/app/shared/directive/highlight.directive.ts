import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective {

  constructor(private elementHtml: ElementRef) {}

  @HostListener('mouseenter')
  hoverHighlight(): void {
    this.elementHtml.nativeElement.style.color = '#1957a9';
  }

  @HostListener('mouseleave')
  cancelhighlight(): void {
    this.elementHtml.nativeElement.style.color = 'black';
  }
}
