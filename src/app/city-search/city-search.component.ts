import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { WeatherService } from '../weather/weather.service';
import { debounceTime, filter, tap } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('', [Validators.minLength(2)]);

  constructor(private weatherService: WeatherService) {
    this.search.valueChanges
      .pipe(
        debounceTime(1000),
        filter((searchValue) => searchValue && this.search.valid),
        tap((searchValue: string) => this.doSearch(searchValue))
      )
      .subscribe();
  }

  ngOnInit(): void {}

  doSearch(searchValue: string): void {
    const [search, country] = searchValue.split(',').map((s) => s.trim());
    this.weatherService.updateCurrentWeather(
      search,
      country ? country : undefined
    );
  }

  getErrorMessage(): string {
    return this.search.hasError('minlength')
      ? 'Type more than one character to search'
      : '';
  }
}
