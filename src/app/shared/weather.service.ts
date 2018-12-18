import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  getForecastByCityName(city: string) {
    const query = `select * from weather.forecast where woeid in (select woeid from geo.places(1) where text="${city}")`;
    const url = `https://query.yahooapis.com/v1/public/yql?format=json&q=${query}`;

    return this.http.get(url);
  }
}
