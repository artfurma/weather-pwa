import { Component, Inject, OnInit } from '@angular/core';
import { Weather } from './shared/weather';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddForecastDialogData } from './shared/add-forecast-dialog-data';
import { WeatherService } from './shared/weather.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'weather-pwa';
  isLoading: Boolean = false;
  weatherForecasts: Weather[];

  forecasts: Weather[] = [
    {
      key: '2459115',
      label: 'New York, NY',
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
    }
  ];

  constructor(public dialog: MatDialog, private weatherService: WeatherService) { }

  openAddForecastDialog(): void {
    const dialogRef = this.dialog.open(AddForecastDialogComponent, {
      width: '250px',
      data: { city: '' }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.addForecast(result);
    });
  }

  addForecast(city: string): void {
    this.getForecast(city);
  }

  refreshForecasts(): void {
    this.forecasts.forEach((forecast: Weather) => this.updateForecast(forecast));
  }

  updateForecast(forecast: Weather): void {
    // this.weatherService.getForecast(forecast.key)
  }

  getForecast(city: string) {
    // TODO: Add cache logic here

    let weather: Weather;
    this.weatherService.getForecastByCityName(city).subscribe(data => {
      // weather = {
      //   key = 
      // }
      console.log(data);
    });
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
