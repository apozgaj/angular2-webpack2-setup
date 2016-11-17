import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit() {
    console.log('function ngInit');
    let a = 'test';
    let result = this.functionA();
  }

  ngOnDestroy() {

  }

  private functionA() {
    console.log('function a');
    let result = 3;
    return result;
  }

}
