import { NgModule }      from '@angular/core';
import { Sex } from './sex.pipe';


@NgModule({
    imports:        [],
    declarations:   [Sex],
    exports:        [Sex],
})

export class PipeModule {

  static forRoot() {
     return {
         ngModule: PipeModule,
         providers: [],
     };
  }
} 