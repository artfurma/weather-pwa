export interface Forecast {
    city: String;
    temperature: Number;
    summary: String;
    lastUpdated: String;
    date: String;
    humidity: Number;
    windValue: Number;
    windDirection: Number;
    sunrise: String;
    sunset: String;
    futureDays: DayOfWeek[];
}

export interface DayOfWeek {
    dayTemperature: Number;
    nightTemperature: Number;
}
