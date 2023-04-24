import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatString'
})
export class FormatStringPipe implements PipeTransform {

  transform(value: string, maxLength: number = 12): string {
    if (value.length > maxLength) {
      return value.substring(0, maxLength) + '...';
    } else {
      return value;
    }
  }

}
