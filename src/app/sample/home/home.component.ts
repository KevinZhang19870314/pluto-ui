import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  aaa: any;
  activeTheme: string = 'teal-light';
  constructor(private themeService: ThemeService) { }

  ngOnInit() {
    this.aaa = 'aaa';
  }

  setTheme(theme: string, darkness: boolean) {
    this.themeService.setTheme(theme, darkness);
    this.activeTheme = theme + (darkness ? '-dark' : '-light');
  }
}
