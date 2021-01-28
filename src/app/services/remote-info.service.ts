import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CurrentWeatherData } from '../model/weather';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { city } from '../model/city';

@Injectable({
  providedIn: 'root'
})
export class RemoteInfoService {

  constructor(private http:HttpClient) { }
  getCurrentWheaterFormLocation(locationName:string, typeUnits:string):Observable<CurrentWeatherData>{
    return this.http.get<CurrentWeatherData>
    (`http://api.openweathermap.org/data/2.5/weather?q=${locationName}&units=${typeUnits}&appid=${environment.apiCode}`);
  };
  getCities():Observable<city[]>{
    return this.http.get<city[]>(environment.remoteCities+'?country=IL')
  }
}
