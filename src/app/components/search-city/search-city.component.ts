import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { LoadCitiesAction } from 'src/app/actions/city.actions';
import { LoadWeathersAction } from 'src/app/actions/weather.actions';
import { city } from 'src/app/model/city';
import { errorResponse } from 'src/app/model/error';
import { AppState, selectCities } from './../../reducers';

@Component({
  selector: 'app-search-city',
  templateUrl: './search-city.component.html',
  styleUrls: ['./search-city.component.css']
})
export class SearchCityComponent implements OnInit , OnDestroy{
  cities$:Observable<city[] | null>;
  units = ['standard','metric','imperial'];
  choosenCity = '';
  choosenUnits = '';
  errorMessage = '';
  constructor(private store:Store<AppState>) {
    this.cities$ = new Observable<city[] |null>();
   }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.store.select(ob=>ob.weather.error).subscribe(res=>{
      this.errorMessage = res?.message || '';
    })
    this.cities$ = this.store.pipe(select(selectCities));
    this.store.dispatch(LoadCitiesAction());
  }
  focusCity($event:any){
    this.choosenCity = '';
    
  }
  focusUnits($event:any){
    this.choosenUnits = '';
  }
  showWeather(){
    if(this.choosenCity && this.choosenUnits){
      this.store.dispatch(LoadWeathersAction({cityName:this.choosenCity,units:this.choosenUnits}));
      this.choosenCity = '';
      this.choosenUnits = '';
    }else{
      this.errorMessage = 'few arguments are missing';  
    }
    
  }

}