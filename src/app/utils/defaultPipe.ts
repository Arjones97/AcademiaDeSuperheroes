import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'default'
})
export class DefaultPipe implements PipeTransform {

  // La función transform recibe un valor y un valor por defecto.
  // Si el valor es verdadero (es decir, existe), lo devuelve.
  // Si no, devuelve el valor por defecto.
  transform(value: any, defaultValue: any): any {
    return value ? value : defaultValue;
  }

}
