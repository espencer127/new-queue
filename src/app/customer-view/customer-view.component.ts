import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { Cust } from '../cust';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';


@Component({
  selector: 'app-customer-view',
  templateUrl: './customer-view.component.html',
  styleUrls: ['./customer-view.component.css'],
  inputs: ['customers'],
  outputs: ['customers'],
})

export class CustomerViewComponent implements OnInit {

  // Set-up data-binding for "customers" array and Success alert

  customers:Array<any>;
  dataChange: EventEmitter<Array<any>> = new EventEmitter();
  
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;

  private _danger = new Subject<string>();
  staticAlertCloud2 = false;
  dangerMessage: string;

  constructor() { }

  // Set-up data-binding for "customers" array and time-out for Success alert
  ngOnInit() {
    
    this.dataChange.emit(this.customers);

    setTimeout(() => this.staticAlertClosed = true, 20000);
    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => this.successMessage = null);

    setTimeout(()=> this.staticAlertCloud2= true, 20000);
    this._danger.subscribe((message) => this.dangerMessage = message);
    this._danger.pipe(debounceTime(5000)).subscribe(() => this.dangerMessage = null);
  }

  @Output() eventClicked = new EventEmitter<Event>();

  // Make sure customer has included important information; if so, add it to the array and display
  // a Success alert

  onClick(custForm,event) {
    if ((custForm.name == null) || (custForm.pnumber == null) || (custForm.repair == null)) {
      this._danger.next("Please enter a valid name, phone number, and repair.");
    }  else {
      let newGuy = new Cust(custForm.name, custForm.pnumber, custForm.repair, custForm.addl);
      this.customers.push(newGuy);
      console.log("customers: " + JSON.stringify(this.customers));
      this._success.next("Thank you! We'll notify you as soon as a mechanic is available.");
      custForm.name = null; 
      custForm.pnumber = null; 
      custForm.repair = null;
      custForm.addl = null;
    }
      
  }
}
