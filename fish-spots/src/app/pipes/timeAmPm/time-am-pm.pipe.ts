import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'timeAmPm'
})
export class TimeAmPmPipe implements PipeTransform {
  transform(value: string): string {
    // Example: convert "13:45" to "1:45 PM"
    if (!value) return '';
    const [hourStr, minute] = value.split(':');
    let hour = parseInt(hourStr, 10);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12;
    return `${hour}:${minute} ${ampm}`;
  }
}