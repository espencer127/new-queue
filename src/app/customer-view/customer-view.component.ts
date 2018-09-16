import { Component, OnInit,Output, Input, EventEmitter } from '@angular/core';
import { Cust } from '../cust';
import { FormsModule }   from '@angular/forms';

import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
  inputs: ['customers'],
outputs: ['customers'],
})

export class CustomerViewComponent implements OnInit {

  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage: string;

  customers:Array<any>;
  dataChange: EventEmitter<Array<any>> = new EventEmitter();
  //customers:Array<any>=this.data;


  constructor() { }

  ngOnInit() {
    
    this.dataChange.emit(this.customers);

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  }

  @Output() eventClicked = new EventEmitter<Event>();

  repairs=["Front flat", "Rear flat", "Front brake issues", "Rear brake issues", "Front shifting issues",
   "Rear shifting issues", "Not sure", "Other"];

  ind=0;


  onClick(custForm) {
    let newGuy = new Cust(this.ind, custForm.name, custForm.pnumber, custForm.repair, custForm.addl);
    this.customers.push(newGuy);
    console.log("customers: " + JSON.stringify(this.customers));
    this._success.next("Thank you! We'll call you as soon as a mechanic is available.");
  }
}
