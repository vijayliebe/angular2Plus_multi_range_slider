import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MultiRangeSliderModule } from '@vijayliebe/multi-range-slider';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MultiRangeSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
