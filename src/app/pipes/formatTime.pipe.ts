import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatTimePipe',
})
export class FormatTimePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const date = new Date(value);

    const hours = date.getHours();

    const minutes = date.getMinutes();

    const formattedTime = `${hours}:${minutes}`;

    return formattedTime;
  }
}
