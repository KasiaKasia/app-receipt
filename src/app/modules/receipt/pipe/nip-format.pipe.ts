import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nipFormat',
  standalone: true
})
export class NipFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
 
    let modifiedValue = value.replace(/-/g, '').replace(/\D/g, ''); 
    modifiedValue = modifiedValue.slice(0, 10);

    if (modifiedValue.length <= 3) 
      return modifiedValue;
    if (modifiedValue.length <= 6) 
      return `${modifiedValue.slice(0, 3)}-${modifiedValue.slice(3)}`;
    if (modifiedValue.length <= 8) 
      return `${modifiedValue.slice(0, 3)}-${modifiedValue.slice(3, 6)}-${modifiedValue.slice(6)}`;
    return `${modifiedValue.slice(0, 3)}-${modifiedValue.slice(3, 6)}-${modifiedValue.slice(6, 8)}-${modifiedValue.slice(8, 10)}`;
  
  }
}
