import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'iterate'
})
export class IteratePipe implements PipeTransform {
  transform(value: number): number[] {
    const result = [];
    for (let i = 0; i < value; i++) {
      result.push(i + 1);
    }
    return result;
  }

}
