import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { injectSpy } from 'angular-unit-test-helper';

import { CurrentWeatherComponent } from './current-weather.component';
import {
  WeatherServiceFake,
  fakeWeather,
} from './../weather/weather.service.fake';
import { WeatherService } from '../weather/weather.service';
import { of } from 'rxjs';
import { By } from '@angular/platform-browser';

describe('CurrentWeatherComponent', () => {
  let component: CurrentWeatherComponent;
  let fixture: ComponentFixture<CurrentWeatherComponent>;

  let weatherServiceMock: jasmine.SpyObj<WeatherService>;

  beforeEach(async(() => {
    const weatherServiceSpy = jasmine.createSpyObj('WeatherService', [
      'getCurrentWeather',
    ]);

    TestBed.configureTestingModule({
      declarations: [CurrentWeatherComponent],
      providers: [
        {
          provide: WeatherService,
          useValue: weatherServiceSpy,
        },
      ],
    }).compileComponents();
    weatherServiceMock = injectSpy(WeatherService);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentWeatherComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    // arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());
    // act
    fixture.detectChanges(); // triggers ngOnInit()
    // assert
    expect(component).toBeTruthy();
  });

  it('should get current weather from the weather service', () => {
    // arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of());
    // act
    fixture.detectChanges();
    // assert
    expect(weatherServiceMock.getCurrentWeather).toHaveBeenCalledTimes(1);
  });

  it('should eagerly load current weather in Chesapeake from the weather service', () => {
    // arrange
    weatherServiceMock.getCurrentWeather.and.returnValue(of(fakeWeather));
    // act
    fixture.detectChanges();
    // assert
    expect(component.current).toBeDefined();
    expect(component.current.city).toEqual('Chesapeake');
    expect(component.current.temperature).toEqual(99);
    // assert on DOM
    const debugEl = fixture.debugElement;
    const titleEl: HTMLElement = debugEl.query(By.css('span')).nativeElement;
    expect(titleEl.textContent).toContain('Chesapeake');
  });
});
