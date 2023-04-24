import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormatVndPipe } from './format-vnd.pipe';
import { FormatDatePipe } from './formatDate.pipe';
import { FormatTimePipe } from './formatTime.pipe';
import { FormatStringPipe } from './formatString.pipe';


@NgModule({
  declarations: [			FormatVndPipe,
      FormatDatePipe,
      FormatTimePipe,
      FormatStringPipe
   ],
  imports: [
    CommonModule,
  ],
  exports: [
    FormatVndPipe,FormatTimePipe,FormatDatePipe,FormatStringPipe
  ]
})
export class SharedPipeModule { }
