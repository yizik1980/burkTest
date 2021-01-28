
import {  Action, ActionReducerMap, createReducer, MetaReducer, on, State} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { WeatherActionTypes, LoadWeathersAction, LoadWeathersSuccessAction, LoadWeathersFailureAction, RemoveWeatherForcastAction } from '../actions/weather.actions';
import { CityActionTypes, LoadCitiesAction, LoadCitiesSuccessAction, LoadCitiesFailureAction } from '../actions/city.actions';
import { city } from '../model/city';
import { CurrentWeatherData } from '../model/weather';
import { errorResponse } from '../model/error';

export interface WeatherState {
  weatherData: Array<CurrentWeatherData>;
  error:errorResponse| null;
}

const initialWeatherState: WeatherState = {
  weatherData: new Array<CurrentWeatherData>(),
  error: null,
};

export interface Citiestate {
  cities: city[] | null;
  error: any | null;
}

const initialCitiestate: Citiestate  = {
  cities: null,
  error: null
};

export interface AppState {
  weather: WeatherState;
  cities: Citiestate;
}

// export function weatherReducer(state: WeatherState = initialWeatherState, action: WeatherActions): WeatherState {
//   switch (action.type) {
//     case WeatherActionTypes.LoadWeathers:
//       return {
//         ...state
//       };
//     case WeatherActionTypes.LoadWeathersSuccess:
//       return{
//         ...state,
//         weatherData:action.payload.data
//       }
//       case WeatherActionTypes.LoadWeathersFailure:
//         return{
//           ...state,
//           error:action.payload.error
//         }
//     default:
//       return state;
//   }
// }
const weatherReducer = createReducer(
  initialWeatherState,
  on(LoadWeathersAction , state => ({ ...state })),
  on(LoadWeathersSuccessAction, (state, payload) => ({ ...state, weatherData:[...state.weatherData,payload.data]  })),
  on(LoadWeathersFailureAction, (state,payload) => ({ ...state, error:payload.error })),
  on(RemoveWeatherForcastAction, (state, payload)=>( {
      ...state,
      weatherData:state.weatherData.filter(data=> data.id !== payload.id)
    })
));

const CityReducer = createReducer(
  initialCitiestate,
  on(LoadCitiesAction , state => ({ ...state })),
  on(LoadCitiesSuccessAction, (state, payload) => ({ ...state, cities: payload.data })),
  on(LoadCitiesFailureAction, (state,payload) => ({ ...state, error:payload.error }))
);

//export const reducers = combineReducers(weatherReducer, CityReducer)
// export const reducers: ActionReducer<AppState> = combineReducers(CityReducer,weatherReducer)

export const reducers: ActionReducerMap<AppState> = {
  cities: CityReducer,
  weather:weatherReducer
};

export const metaReducers: MetaReducer<any>[] = !environment.production ? [] : [];

export const selectCities = (state: AppState) => state.cities.cities; 