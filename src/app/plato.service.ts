import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Plato, Tpv } from './plato';


@Injectable({
  providedIn: 'root'
})

export class PlatoService {

  //private platosUrl = "https://alergenosapiviva.azurewebsites.net/api/Alergenos/"
  private platosUrl = "https://192.168.93.179:45455/api/Alergenos/"

  httpOptions = {
    headers: new HttpHeaders({
      "content-type": "application/json"
    })
  };

  constructor(private http: HttpClient) { }


  getPlatos(hotel: string): Observable<Plato[]> {
    return this.http.get<Plato[]>(this.platosUrl + hotel)
  }

  getTPVs(hotel: string): Observable<Tpv[]> {
    return this.http.get<Tpv[]>(this.platosUrl + hotel + '/tpvs')
  }

}