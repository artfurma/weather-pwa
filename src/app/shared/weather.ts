export interface Weather {
    key: string;
    label: string;
    created: string;
    channel: WeatherChannel;
}

export interface WeatherChannel {
    astronomy: Astronomy;
    item: Item;
    atmosphere: Atmosphere;
    wind: Wind;
}

export interface Astronomy {
    sunrise: string;
    sunset: string;
}

export interface Item {
    condition: Condition;
    forecast: Forecast[];
}

export interface Condition {
    text: string;
    date: string;
    temp: number;
    code: number;
}

export interface Forecast {
    code: number;
    high: number;
    low: number;
}

export interface Atmosphere {
    humidity: number;
}

export interface Wind {
    speed: number;
    direction: number;
}
