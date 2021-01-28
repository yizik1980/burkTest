import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, throwError } from 'rxjs';
import { CurrentWeatherData } from 'src/app/model/weather';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-weater-view',
  templateUrl: './weater-view.component.html',
  styleUrls: ['./weater-view.component.css']
})
export class WeaterViewComponent implements OnInit {
  weathers$:Observable<CurrentWeatherData[] | null> | undefined;
  constructor(private store:Store<AppState>) {
    this.weathers$ = new Observable<CurrentWeatherData[]>();
   }

  ngOnInit(): void {
    this.weathers$ =this.store.select(state=>state.weather.weatherData)
  }

}
