import { PipesModule } from '../pipes/pipes.module';
import { NgModule } from '@angular/core';

@NgModule({
    declarations: [
    ],
    imports: [
        PipesModule,
    ],
    exports: [
        PipesModule,
    ]
})

export class SharedModule { }
