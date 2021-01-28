export interface Coord {
    lon: number;
    lat: number;
}

export interface Weather {
    id: number;
    main: string;
    description: string;
    icon: string;
}

export interface Main {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
}

export interface Wind {
    speed: number;
    deg: number;
}

export interface Rain {
    h: number;
}

export interface Clouds {
    all: number;
}

export interface Sys {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
}

export class CurrentWeatherData {
    constructor(){
    }
    initIcon(){
        if(this.weather)
        this.weather.forEach(item=>{
            if(item.icon){
                item.icon = `http://openweathermap.org/img/wn/${item.icon}@2x.png`;
            }
        })
    }
    coord: Coord | undefined;
    weather: Weather[]| undefined;;
    base: string | undefined;;
    main: Main | undefined;;
    visibility: number | undefined;;
    wind: Wind | undefined;;
    rain: Rain | undefined;;
    clouds: Clouds | undefined;;
    dt: number | undefined;;
    sys: Sys | undefined;;
    timezone: number | undefined;;
    id: number | undefined;;
    name: string | undefined;;
    cod: number | undefined;;
}