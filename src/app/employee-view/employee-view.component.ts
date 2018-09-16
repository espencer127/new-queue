import { Component, OnInit, Input,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-employee-view',
  templateUrl: './employee-view.component.html',
  styleUrls: ['./employee-view.component.css'],
  inputs: ['customers'],
outputs: ['customers'],
})
export class EmployeeViewComponent implements OnInit {
  customers: Array<any>;
  dataChange: EventEmitter<Array<any>> = new EventEmitter();

  constructor() { }

  ngOnInit() {
    console.log("For the employees: " + JSON.stringify(this.customers));
    this.dataChange.emit(this.customers);
  }

  removeIt(){
    this.customers.splice(0,1);
  }

}
