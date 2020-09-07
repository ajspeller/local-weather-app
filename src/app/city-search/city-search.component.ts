import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

import { WeatherService } from '../weather/weather.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-city-search',
  templateUrl: './city-search.component.html',
  styleUrls: ['./city-search.component.scss'],
})
export class CitySearchComponent implements OnInit {
  search = new FormControl('', [Validators.minLength(2)]);

  constructor(private weatherService: WeatherService) {}

  ngOnInit(): void {
    this.search.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((searchValue: string) => {
        if (this.search.valid) {
          const [search, country] = searchValue.split(',').map((s) => s.trim());
          this.weatherService
            .getCurrentWeather(search, country ? country : undefined)
            .subscribe((data) => console.log(data));
        }
      });
  }

  getErrorMessage(): string {
    console.log(this.search);
    return this.search.hasError('minlength')
      ? 'Type more than one character to search'
      : '';
  }
}
