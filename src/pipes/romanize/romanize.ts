import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'romanize',
})
export class RomanizePipe implements PipeTransform {

  lookup = { M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1 };

  transform(num, ...args) {
    let roman = '';
    for (let i in this.lookup ) {
      while ( num >= this.lookup[i] ) {
        roman += i;
        num -= this.lookup[i];
      }
    }
    return roman;
  }
}
