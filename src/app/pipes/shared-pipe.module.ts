import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatVndPipe } from './format-vnd.pipe';
import { FormatDatePipe } from './formatDate.pipe';
import { FormatTimePipe } from './formatTime.pipe';


@NgModule({
  declarations: [		FormatVndPipe,
      FormatDatePipe,
      FormatTimePipe
   ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatVndPipe,FormatTimePipe,FormatDatePipe
  ]
})
export class SharedPipeModule { }
