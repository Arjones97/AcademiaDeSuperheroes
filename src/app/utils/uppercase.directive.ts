import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appUppercase]'
})
export class UppercaseDirective {

  constructor(private el: ElementRef) {}

  // Este método se ejecuta cada vez que se dispara el evento 'input' en el elemento.
  // Convierte el primer carácter del valor del elemento a mayúsculas.
  @HostListener('input', ['$event']) onInputChange(event: InputEvent) {
    const target = event.target as HTMLInputElement;
    const start = target.selectionStart;
    const end = target.selectionEnd;
    if (target.value.length > 0) {
        this.el.nativeElement.value = target.value.charAt(0).toUpperCase() + target.value.slice(1);
    } else {
        this.el.nativeElement.value = target.value;
    }
    target.setSelectionRange(start, end);
  }
}
