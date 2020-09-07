import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { flatMap, defaultIfEmpty } from 'rxjs/operators';

export interface IPostalCode {
  countryCode: string;
  postalCode: string;
  placeName: string;
  lng: number;
  lat: number;
}

export interface IPostalCodeData {
  postalCodes: [IPostalCode];
}

export interface IPostalCodeService {
  resolvePostalCode(postalCode: string): Observable<IPostalCode>;
}

@Injectable({
  providedIn: 'root',
})
export class PostalCodeService implements IPostalCodeService {
  constructor(private http: HttpClient) {}

  resolvePostalCode(postalCode: string): Observable<IPostalCode> {
    const uriParams = new HttpParams()
      .set('maxRows', '1')
      .set('username', environment.username)
      .set('postalcode', postalCode);
    return this.http
      .get<IPostalCodeData>(
        `${environment.baseUrl}${environment.geonamesApi}.geonames.org/postalCodeSearchJSON`,
        { params: uriParams }
      )
      .pipe(
        flatMap((data) => data.postalCodes),
        defaultIfEmpty(null)
      );
  }
}
