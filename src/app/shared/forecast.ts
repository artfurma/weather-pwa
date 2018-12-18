export interface Forecast {
    key?: Number;
    city: String;
    lastUpdated: String;
    summary: String;
    temperature: Number;
    date: String;
    humidity: Number;
    windValue: Number;
    windDirection: Number;
    sunrise: String;
    sunset: String;
    futureDays: DayOfWeek[];
}

export interface DayOfWeek {
    name: String;
    highTemp: Number;
    lowTemp: Number;
}
