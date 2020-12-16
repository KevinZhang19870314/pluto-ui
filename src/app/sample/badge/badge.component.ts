import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-badge',
  templateUrl: './badge.component.html',
  styleUrls: ['./badge.component.scss']
})
export class BadgeComponent implements OnInit {

  sampleCount = 99;

  constructor() { }

  ngOnInit() {
    setTimeout(() => {
      this.sampleCount = 98;
    }, 2000);
  }
}
