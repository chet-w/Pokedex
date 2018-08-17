import { Component, ViewChild, OnInit } from '@angular/core';
import { CardContent } from 'ionic-angular';

/**
 * Generated class for the AccordianComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'accordian',
  templateUrl: 'accordian.html'
})
export class AccordianComponent implements OnInit {

  private open = false;
  

  constructor() {
    console.log('Hello AccordianComponent Component');
  }

  ngOnInit(){

  }

  toggleAccordian(){
    this.open = !this.open;
  }

}
