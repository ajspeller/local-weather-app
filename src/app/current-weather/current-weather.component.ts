import { WeatherService } from './../weather/weather.service';
import { Component, OnInit } from '@angular/core';

import { ICurrentWeather } from './../interfaces';

@Component({
  selector: 'app-current-weather',
  templateUrl: './current-weather.component.html',
  styleUrls: ['./current-weather.component.scss'],
})
export class CurrentWeatherComponent implements OnInit {
  current: ICurrentWeather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.weatherService
      .getCurrentWeather('norfolk', 'us')
      .subscribe((data) => (this.current = data));
  }

  getOrdinal(date: number): string {
    const n = new Date(date).getDate();
    return n > 0
      ? ['th', 'st', 'nd', 'rd'][(n > 3 && n < 21) || n % 10 > 3 ? 0 : n % 10]
      : '';
  }
}
