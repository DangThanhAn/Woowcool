import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatVndPipe } from './format-vnd.pipe';


@NgModule({
  declarations: [FormatVndPipe],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatVndPipe
  ]
})
export class SharedPipeModule { }
