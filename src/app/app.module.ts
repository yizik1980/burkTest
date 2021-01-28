import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';
import {  } from './reducers';
import { environment } from 'src/environments/environment';
import {  StoreDevtoolsModule } from '@ngrx/store-devtools';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { SearchCityComponent } from './components/search-city/search-city.component'
import { EffectsModule } from '@ngrx/effects';
import { HttpMonitorEffects } from './effects/http-monitor.effects';
import {metaReducers,reducers} from './reducers';
import { WeaterViewComponent } from './components/weater-view/weater-view.component';
import { WeatherItemComponent } from './components/weather-item/weather-item.component';
import { HttpLoadingInterceptor } from './services/http-loading.interceptor';
import { GlobalLoaderComponent } from './components/global-loader/global-loader.component';

@NgModule({
  declarations: [
    AppComponent,
    SearchCityComponent,
    WeaterViewComponent,
    WeatherItemComponent,
    GlobalLoaderComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    StoreModule.forRoot(reducers,{metaReducers}),
    EffectsModule.forRoot([HttpMonitorEffects]),
    !environment.production? StoreDevtoolsModule.instrument():[],
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpLoadingInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
