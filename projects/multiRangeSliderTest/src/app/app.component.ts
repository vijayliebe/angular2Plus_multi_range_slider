import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'multiRangeSliderTest';
  count = 5;
  variants = [];
  public colors: any = ['#d8d8d8', '#83db8e', '#30d6c5', '#81bbe4',
                        '#869bcc', '#d69dce', '#bd78a2', '#c66561',
                        '#c66561', '#f2ad47', '#ffd54f'];

  ngOnInit() {
    for(let i = 0; i < this.count; i++){
        this.variants.push({value : 100/this.count});
    }
  }
}
