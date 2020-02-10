import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Place } from 'app/model/Place';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  public listPlaces: Place [] = [
    {
      zipCode: 11000,
      township: 'Stari grad'
    },
    {
      zipCode: 11010,
      township: 'Voždovac'
    },
    {
      zipCode: 11030,
      township: 'Čukarica'
    },
    {
      zipCode: 11050,
      township: 'Zvezdara'
    },
    {
      zipCode: 11070,
      township: ' Novi Beograd'
    }
  ];

  constructor(
    protected http: HttpClient
  ) { }
  public getListPlace(): Observable<any> {
    return this.http.get('https://localhost:44329/place/list-places');
  }
}
