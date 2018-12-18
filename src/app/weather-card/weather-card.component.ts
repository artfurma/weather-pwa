import { Component, OnInit, Input } from '@angular/core';
import { Weather, Item, Condition } from '../shared/weather';
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
  current: Condition;
  currentTemp: number;
  windSpeed: number;
  daysOfWeek: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  constructor(private codeParser: WeatherCodeParserService) { }

  ngOnInit() {
    // TODO: Parse weather codes to icons
    this.lastUpdated = new Date(this.weather.created).toLocaleString();
    this.current = this.weather.channel.item.condition;
    this.currentTemp = this.getCelsiusTemp(this.current.temp);
    this.windSpeed = this.getWindSpeedInKmph(this.weather.channel.wind.speed);
  }

  getWeatherClass(code: number): string {
    return `icon ${this.codeParser.parseCode(code.toString())}`;
  }

  getCelsiusTemp(fTemp: number): number {
    return Math.round((Math.round(fTemp) - 32) / 1.8);
  }

  getWindSpeedInKmph(mphSpeed: number): number {
    return Math.round(mphSpeed * 1.609344);
  }

  getDayOfWeek(index: number) {
    if (this.weather.channel.item.forecast[index]) {
      const dayNumber = new Date(this.current.date).getDay();
      console.log(dayNumber);
      return this.daysOfWeek[(index + dayNumber) % 7];
    }
  }
}
