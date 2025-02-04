import { Directive, Input, EventEmitter, Inject, Output, ElementRef, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Directive({
  selector: '[appScrollspy]',
  standalone:true
})
export class ScrollspyDirective {

  @Input() public spiedTags : string[] = [];;
  @Output() public sectionChange = new EventEmitter<string>();
  private currentSection: string | undefined;

  // tslint:disable-next-line: variable-name
  constructor(private _el: ElementRef, @Inject(DOCUMENT) private document: Document,) { }

  @HostListener('scroll', ['$event'])
  /**
   * Window scroll method
   */
  onScroll(event: any) {
    let currentSection!: string;
    const children = this._el.nativeElement.children;
    const scrollTop = event.target.scrollTop;
    const parentOffset = event.target.offsetTop;

    for (let i = 0; i < children.length; i++) {
      const element = children[i];
      if (this.spiedTags.some(spiedTag => spiedTag === element.tagName)) {
        if ((element.offsetTop - parentOffset) <= scrollTop) {
          currentSection = element.id;
        }
      }
    }
    if (currentSection !== this.currentSection) {
      this.currentSection = currentSection;
      this.sectionChange.emit(this.currentSection);
    }
  }
}
