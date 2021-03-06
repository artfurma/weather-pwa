import { Component, Inject, OnInit } from '@angular/core';
import { Weather } from './shared/weather';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddForecastDialogData } from './shared/add-forecast-dialog-data';
import { WeatherService } from './shared/weather.service';
import * as localForage from 'localforage';

/** TODOs:
 * - Improve getForecast to query forecasts by key and label (for better performance)
 * - Guess user's location via IP lookup on startup (onInit)
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'weather-pwa';
  isLoading: Boolean = false;
  selectedCities = [];
  initialForecast: Weather = {
    key: '2459115',
    label: 'New York, NY, US',
    created: '2016-07-22T01:00:00Z',
    channel: {
      astronomy: {
        sunrise: '5:43 am',
        sunset: '8:21 pm'
      },
      item: {
        condition: {
          text: 'Windy',
          date: 'Thu, 21 Jul 2016 09:00 PM EDT',
          temp: 56,
          code: 24
        },
        forecast: [
          { code: 44, high: 86, low: 70 },
          { code: 44, high: 94, low: 73 },
          { code: 4, high: 95, low: 78 },
          { code: 24, high: 75, low: 89 },
          { code: 24, high: 89, low: 77 },
          { code: 44, high: 92, low: 79 },
          { code: 44, high: 89, low: 77 }
        ]
      },
      atmosphere: {
        humidity: 56
      },
      wind: {
        speed: 25,
        direction: 195
      }
    }
  };

  forecasts: Weather[] = [];

  constructor(public dialog: MatDialog, private weatherService: WeatherService) { }

  ngOnInit(): void {
    localForage.getItem('selectedCities').then((cities: string) => {
      console.log(cities);
      if (cities) {
        this.selectedCities = JSON.parse(cities);
        this.selectedCities.forEach(city => this.getForecast(city.label));
      } else {
        this.upsertWeatherCard(this.initialForecast);
        this.selectedCities = [{ /*key: this.initialForecast.key, */label: this.initialForecast.label }];
        this.saveSelectedCities();
      }
    });

  }

  openAddForecastDialog(): void {
    const dialogRef = this.dialog.open(AddForecastDialogComponent, {
      width: '250px',
      data: { city: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addForecast(result);
    });
  }

  getForecast(city: string) {
    // TODO: Add cache logic here

    this.weatherService.getForecastByCityName(city).subscribe((data: any) => {
      if (data) {
        const results = data.query.results;
        const woeidPattern = /\d+/g;
        const woeid = results.channel.link.match(woeidPattern).toString();
        results.key = woeid;
        results.label = results.channel.title.replace('Yahoo! Weather - ', '');
        results.created = data.query.created;
        this.upsertWeatherCard(results);
      }
    });
  }

  addForecast(city: string): void {
    if (!this.selectedCities) {
      this.selectedCities = [];
    }
    this.getForecast(city);
    this.selectedCities.push({ label: city });
    this.saveSelectedCities();
  }

  refreshForecasts(): void {
    this.forecasts.forEach((forecast: Weather) => this.getForecast(forecast.label));
  }

  upsertWeatherCard(data: any): void {
    const weatherIndex = this.forecasts.findIndex(forecast => forecast.key === data.key);
    if (weatherIndex === -1) {
      const newCard = this.prepareWeatherObject(data);
      this.forecasts.push(newCard);
      return;
    }

    const dataLastUpdated = new Date(data.created);
    const cardLastUpdated = new Date(this.forecasts[weatherIndex].created);

    if (dataLastUpdated.getTime() < cardLastUpdated.getTime()) {
      return;
    }

    // Data fetched from the API is newer - update the forecast
    this.forecasts[weatherIndex] = this.prepareWeatherObject(data);
  }

  prepareWeatherObject(data: any): Weather {
    const weather: Weather = {
      key: data.key,
      label: data.label,
      created: data.created,
      channel: {
        astronomy: {
          sunrise: data.channel.astronomy.sunrise,
          sunset: data.channel.astronomy.sunset,
        },
        item: {
          condition: {
            text: data.channel.item.condition.text,
            date: data.channel.item.condition.date,
            temp: data.channel.item.condition.temp,
            code: data.channel.item.condition.code,
          },
          forecast: [
            {
              code: data.channel.item.forecast[0].code,
              high: data.channel.item.forecast[0].high,
              low: data.channel.item.forecast[0].low,
            },
            {
              code: data.channel.item.forecast[1].code,
              high: data.channel.item.forecast[1].high,
              low: data.channel.item.forecast[1].low,
            },
            {
              code: data.channel.item.forecast[2].code,
              high: data.channel.item.forecast[2].high,
              low: data.channel.item.forecast[2].low,
            },
            {
              code: data.channel.item.forecast[3].code,
              high: data.channel.item.forecast[3].high,
              low: data.channel.item.forecast[3].low,
            },
            {
              code: data.channel.item.forecast[4].code,
              high: data.channel.item.forecast[4].high,
              low: data.channel.item.forecast[4].low,
            },
            {
              code: data.channel.item.forecast[5].code,
              high: data.channel.item.forecast[5].high,
              low: data.channel.item.forecast[5].low,
            },
            {
              code: data.channel.item.forecast[6].code,
              high: data.channel.item.forecast[6].high,
              low: data.channel.item.forecast[6].low,
            },
          ]
        },
        atmosphere: {
          humidity: data.channel.atmosphere.humidity
        },
        wind: {
          speed: data.channel.wind.speed,
          direction: data.channel.wind.direction
        }
      }
    };
    return weather;
  }

  saveSelectedCities(): void {
    const selectedCities = JSON.stringify(this.selectedCities);
    localForage.setItem('selectedCities', selectedCities);
  }
}

@Component({
  templateUrl: './add-forecast-dialog.component.html'
})
export class AddForecastDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddForecastDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: AddForecastDialogData) { }

  ngOnInit() {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
