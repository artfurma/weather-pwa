import { Component } from '@angular/core';
import { Forecast } from './shared/forecast';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-pwa';

  forecasts: Forecast[] = [
    {
      city: 'Gdansk',
      temperature: 68,
      summary: 'pizga',
      lastUpdated: '2day',
      date: 'Mon',
      humidity: 100,
      windValue: 99,
      windDirection: 360,
      sunrise: 'nigdy',
      sunset: 'xD',
      futureDays: [
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        },
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        },
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        },
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        },
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        },
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        },
        {
          name: 'Tue',
          highTemp: 99,
          lowTemp: 11
        }
      ]
    }
  ];
}
