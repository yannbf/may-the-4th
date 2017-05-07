import { SpeciesPipe } from './species/species';
import { RomanizePipe } from './romanize/romanize';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ RomanizePipe, SpeciesPipe ],
  exports: [ RomanizePipe, SpeciesPipe ]
})
export class PipesModule {}
