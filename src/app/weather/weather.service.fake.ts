import { Observable, of } from 'rxjs';

import { IWeatherService } from './iweather-service';
import { ICurrentWeather } from './../interfaces';

export const fakeWeather: ICurrentWeather = {
  city: 'Chesapeake',
  country: 'US',
  date: new Date().getTime(),
  description: 'virginia weather',
  image: '',
  temperature: 99,
};

export class WeatherServiceFake implements IWeatherService {
  public getCurrentWeather(
    city: string,
    country: string
  ): Observable<ICurrentWeather> {
    return of(fakeWeather);
  }
}
