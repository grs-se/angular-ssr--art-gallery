import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'slugify',
  standalone: true,
})
export class SlugPipe implements PipeTransform {
  transform(str: string, ...args: unknown[]): unknown {
    // return value.replace(/\s/g, '-').toLowerCase().trim();
    // return value.replace((?:'s)?[^\p{L}\-\d_]+|\.+$)
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str
      .replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
      .replace(/\s+/g, '-') // replace spaces with hyphens
      .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
  }
}
