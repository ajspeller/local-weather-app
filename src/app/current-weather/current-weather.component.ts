import { WeatherService } from './../weather/weather.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { ICurrentWeather } from './../interfaces';
import { Subscription, Observable } from 'rxjs';

import { SubSink } from 'subsink';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit, OnDestroy {
  current$: Observable<ICurrentWeather>;

  constructor(private weatherService: WeatherService) {
    this.current$ = this.weatherService.currentWeather$;
  }

  ngOnInit(): void {}

  getOrdinal(date: number): string {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }

  ngOnDestroy(): void {}
}
