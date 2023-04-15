import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'FormatDatePipe',
})
export class FormatDatePipe implements PipeTransform {
  transform(value: any, args?: any): any {
    const date = new Date(value);

    const year = date.getFullYear();

    const month = date.getMonth() + 1;

    const day = date.getDate();

    const formattedDate = `${day}/${month}/${year}`;

    return formattedDate;
  }
}
