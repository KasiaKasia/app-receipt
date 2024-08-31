import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nipFormat' 
})
export class NipFormatPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    let resultValue = value;
      switch(value.length) { 
        case 3: { 
          resultValue = value +'-'; 
          break; 
        } 
        case 7: { 
          resultValue = value +'-'; 
          break; 
        } 
        default: { 
            break; 
        } 
      }
    return resultValue;
  }
}
