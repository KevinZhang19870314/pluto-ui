import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress-bar',
  templateUrl: './progress-bar.component.html',
  styleUrls: ['./progress-bar.component.scss']
})
export class ProgressBarComponent implements OnInit {

  colors = ['#2CC5C6', '#A3E1D4'];

  manyColors = ['red', 'blue', 'white', 'green', 'black'];

  constructor() { }

  ngOnInit() {

  }
}
