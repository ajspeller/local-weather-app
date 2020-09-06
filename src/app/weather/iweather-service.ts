import { Observable } from 'rxjs';

import { ICurrentWeather } from './../interfaces';

export interface IWeatherService {
  getCurrentWeather(city: string, country: string): Observable<ICurrentWeather>;
}
