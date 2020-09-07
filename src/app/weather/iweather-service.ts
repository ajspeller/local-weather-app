import { Observable, BehaviorSubject } from 'rxjs';

import { ICurrentWeather } from './../interfaces';

export interface IWeatherService {
  readonly currentWeather$: BehaviorSubject<ICurrentWeather>;

  getCurrentWeather(
    search: string,
    country: string
  ): Observable<ICurrentWeather>;

  getCurrentWeatherByCoords(coords: Coordinates): Observable<ICurrentWeather>;

  updateCurrentWeather(search: string, country?: string): void;
}
