import { Component, Inject, OnInit } from '@angular/core';
import { Forecast } from './shared/forecast';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AddForecastDialogData } from './shared/add-forecast-dialog-data';

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
      summary: 'windy',
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

  constructor(public dialog: MatDialog) { }

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
    // TODO: after adding forecast
    console.log(city);
  }

  refreshForecasts(): void {

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
