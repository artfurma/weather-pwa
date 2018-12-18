import { Component, OnInit, Input } from '@angular/core';
import { Forecast } from '../shared/forecast';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() city: String;
  @Input() forecast: Forecast;

  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  constructor() { }

  ngOnInit() {
  }

}
