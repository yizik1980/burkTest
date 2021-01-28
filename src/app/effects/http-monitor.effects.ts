import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import {
  CityActionTypes, LoadCitiesAction, LoadCitiesFailureAction, LoadCitiesSuccessAction
} from '../actions/city.actions';
import { AppState, Citiestate } from '../reducers';
import { map, mergeMap, catchError, switchMap } from 'rxjs/operators';
import { RemoteInfoService } from '../services/remote-info.service';
import { of } from 'rxjs';
import {  LoadWeathersAction, LoadWeathersFailureAction, LoadWeathersSuccessAction, WeatherActionTypes } from '../actions/weather.actions';

@Injectable()
export class HttpMonitorEffects {
  constructor(
    private citiesActions$: Actions,
    private weatherActions$: Actions,
    private store: Store<AppState>,
    private http: RemoteInfoService
  ) {}
  @Effect()
  LoadCities$ = this.citiesActions$.pipe(
    ofType(LoadCitiesAction),
    switchMap(() => {
      return this.http.getCities().pipe(
        map((citiesRes) => {
        return  LoadCitiesSuccessAction({ data: citiesRes });
        }),
        catchError((err) => {
          return of(LoadCitiesFailureAction(err));
        })
      );
    })
  );

  @Effect()
  weatherEffect$ = this.weatherActions$.pipe(ofType(LoadWeathersAction)
  ,switchMap((loc:any)=>{
    return this.http.getCurrentWheaterFormLocation(loc.cityName,loc.units)
    .pipe(map(weatherOb=>{
     // weatherOb.initIcon();
      return LoadWeathersSuccessAction({data:weatherOb});
    }),
    catchError((err) => {
      return of(LoadWeathersFailureAction(err));
    }))
  }))
}
