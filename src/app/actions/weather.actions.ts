import { createAction, props } from '@ngrx/store';
import { CurrentWeatherData } from '../model/weather';

export enum WeatherActionTypes {
  LoadWeathers = '[Weather] Load Weathers',
  LoadWeathersSuccess = '[Weather] Load Weathers Success',
  LoadWeathersFailure = '[Weather] Load Weathers Failure',
  RemoveWeatherForcast = '[Weather] Remove Weathers Forcast',
}
export const LoadWeathersAction = createAction(WeatherActionTypes.LoadWeathers, props<{cityName:string, units:string}>());
export const LoadWeathersSuccessAction = createAction(WeatherActionTypes.LoadWeathersSuccess,  props< { data: CurrentWeatherData }>());
export const LoadWeathersFailureAction = createAction(WeatherActionTypes.LoadWeathersFailure, props< { error: any }>());
export const RemoveWeatherForcastAction = createAction(WeatherActionTypes.RemoveWeatherForcast, props<{id:number | undefined}>());



// export type WeatherActions = LoadWeathers | LoadWeathersSuccess | LoadWeathersFailure;

