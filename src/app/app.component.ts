import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

// Set up initial array of customers and tabbing
export class AppComponent {

  customers:Array<any>=[];

  tab:number = 1;

  setTab(num: number) {
    this.tab = num;
  }
  
  isSelected(num: number) {
    return this.tab === num;
  }
  
}
