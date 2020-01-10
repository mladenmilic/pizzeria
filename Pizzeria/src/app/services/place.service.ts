import { Injectable } from '@angular/core';
import { Place } from 'app/model/Place';

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

  constructor() { }
  public getListPlace(): Place [] {
    return this.listPlaces;
  }
}
