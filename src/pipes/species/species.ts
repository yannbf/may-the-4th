import { SwapiProvider } from '../../providers/swapi/swapi';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'species',
})
export class SpeciesPipe implements PipeTransform {
  constructor(public swapi: SwapiProvider){}
  transform(url, ...args) {
    return this.swapi.getSpecie(url).subscribe( data => {
      return data.name;
    });
  }
}
