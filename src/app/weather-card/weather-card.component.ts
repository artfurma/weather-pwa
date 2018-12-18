import { Component, OnInit, Input } from '@angular/core';
import { Weather, Item } from '../shared/weather';
import { WeatherCodeParserService } from '../shared/weather-code-parser.service';

@Component({
  selector: 'app-weather-card',
  templateUrl: './weather-card.component.html',
  styleUrls: ['./weather-card.component.scss']
})
export class WeatherCardComponent implements OnInit {

  @Input() city: String;
  @Input() weather: Weather;

  lastUpdated: string;
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private codeParser: WeatherCodeParserService) { }

  ngOnInit() {
    // TODO: Parse weather codes to icons
    this.lastUpdated = new Date(this.weather.created).toLocaleString();
  }

  getWeatherClass(code: number): string {
    return `icon ${this.codeParser.parseCode(code)}`;
  }
}
